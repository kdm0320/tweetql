import { ApolloServer, gql } from "apollo-server";

let tweets = [
  {
    id: "1",
    text: "first",
    userId: "2",
  },
  {
    id: "2",
    text: "secind",
    userId: "1",
  },
];
let users = [
  { id: "1", firstName: "Nico", lastName: "las" },
  { id: "2", firstName: "MAst", lastName: "lass" },
];

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String!
  }
  type Tweet {
    id: ID!
    text: String!
    author: User
  }
  type Query {
    allUsers: [User!]!
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet
    deleteTweet(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    },
    tweet(root, { id }) {
      return tweets.find((tweet) => tweet.id == id);
    },
    allUsers() {
      return users;
    },
  },
  Mutation: {
    postTweet(_, { text, userId }) {
      const newTweets = {
        id: tweets.length + 1,
        text,
        userId,
      };
      tweets.push(newTweets);
      return newTweets;
    },
    deleteTweet(_, { id }) {
      const tweet = tweets.find((tweet) => tweet.id === id);
      if (!tweet) return false;
      tweets = tweets.filter((tweet) => tweet.id !== id);
      return true;
    },
  },
  User: {
    fullName({ firstName, lastName }) {
      return `${firstName} ${lastName}`;
    },
  },
  Tweet: {
    author({ userId }) {
      return users.find((user) => user.id === userId);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {});
// npm run dev
