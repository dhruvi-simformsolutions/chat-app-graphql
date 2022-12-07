const {ApolloServer} = require('@apollo/server')
const {expressMiddleware} = require('@apollo/server/express4')
const {ApolloServerPluginDrainHttpServer} = require('@apollo/server/plugin/drainHttpServer') // using this plugin to ensure your server shuts down gracefully
const express = require('express')
const {createServer} = require('http')
const {makeExecutableSchema} = require('@graphql-tools/schema') // it is use to create schema with typeDef and Resolvers and return the data
const {WebSocketServer} = require('ws')
const {useServer} = require('graphql-ws/lib/use/ws') // it is use to create the server.
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

// Manually Create File Import
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');


const port = process.env.PORT;

async function setUpServer() {
    const schema = makeExecutableSchema({ typeDefs, resolvers }); // creating schema which will seperate apollo and websocket server
const app = express();
const httpServer = createServer(app);

// Set up WebSocket server.
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});
const serverCleanup = useServer({ schema }, wsServer);

// Set up ApolloServer.
const server = new ApolloServer({
    schema,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
  
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ]
});
  
 await server.start();
  app.use('/graphql',  bodyParser.json(), expressMiddleware(server));

  mongoose
  .connect(process.env.MONGO_DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongo DB Connected");
    return  httpServer.listen(port, () => { // Now that our HTTP server is fully set up, actually listen.
      console.log(`Query endpoint ready at http://localhost:${port}/graphql`);
      console.log(`Subscription endpoint ready at ws://localhost:${port}/graphql`);
    });
  })
  .then((res) => {})
  .catch((error) => {
    console.log("error while connecting db", error);
  });
  
  
  
}

setUpServer()