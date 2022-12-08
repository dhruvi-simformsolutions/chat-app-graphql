import gql from "graphql-tag";

export const LOGIN_USER = gql`
mutation login(
  $username: String!
  $password: String!
) {
  login(
      username: $username
      password: $password
  ) {
    id
    email
    username
    createdAt
    token
  }
}
`; 

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const FETCH_USERS = gql`
    query getUsers($id: ID!){
        getUsers(id: $id){
            createdAt
    email
    username
    id
        }
    }
`;

export const GET_MESSAGES_SUBSCRIPTION = gql`
subscription {
  newMessages {
    id
    content
    sender
    receiver
  }
}
`;

export const GET_MESSAGES= gql`
  query getMessages($sender: ID!, $receiver: ID!){
    getMessages(sender: $sender, receiver: $receiver) {
    id
    content
    sender
    receiver
  }
  }
`;

export const POST_MESSAGE = gql`
  mutation addMessage($sender: ID!, $content: String!, $receiver: ID!){
    addMessage(sender: $sender, content: $content, receiver: $receiver){
    id
    content
  }
  }
`;