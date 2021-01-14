const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String!
    users: User!
  }
  type User {
    id: ID!
    username: String!
  }
  type Error {
    field: String!
    message: String!
  }
  type RegisterResponse {
    errors: [Error]
    user: User
  }
  input UserInfo {
    username: String!
    password: String!
    age: Int
  }
  type Mutation {
    register(userInfo: UserInfo!): RegisterResponse
  }
`;
const resolvers = {
  Query: {
    hello: () => 'Hello World!',
    users: () => ({ id: 1, username: 'OG' }),
  },
  Mutation: {
    register: () => ({
      errors: [
        {
          field: 'username',
          message: 'bad response',
        },
      ],
      user: {
        id: 1,
        username: 'OG',
      },
    }),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(`server started at ${url}`));
