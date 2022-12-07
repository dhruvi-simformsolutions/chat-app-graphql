const gql = require("graphql-tag");

module.exports = gql`
    type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  type Message {
    id: ID!
    content: String!
    sender: ID!
    receiver: ID!
    createdAt: String!
  }
  type Query {
    getUsers: [User]
    getMessages(sender: ID!, receiver:ID!): [Message]
  }
  type Mutation {
    register(username: String!,password: String!,email: String!): User!
    login(username: String!, password: String!): User!
    addMessage(sender: ID!, content: String!,receiver: ID!): Message!
  }
  type Subscription {
      newMessages: [Message!]
    }
`;