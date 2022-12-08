import React from "react"
import App from "./App"
import { ApolloClient , InMemoryCache,split, HttpLink,ApolloProvider} from '@apollo/client';
// import { ApolloProvider}  from "@apollo/react-hooks"
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const httpLink = new HttpLink({
    uri : 'http://localhost:4000/graphql'
})
const wsLink = new GraphQLWsLink(
    createClient({
      url: "ws://localhost:4000/graphql",
    })
  );
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

const client = new ApolloClient({
    link : splitLink,
    uri: "http://localhost:4000/graphql",
    cache : new InMemoryCache()
})



export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)