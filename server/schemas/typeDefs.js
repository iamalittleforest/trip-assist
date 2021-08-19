// import dependency
const { gql } = require('apollo-server-express');

// define object types
const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    savePOI(POIToSave: POIInput): User
    removePOI(placeId: ID!): User
  }

  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    POICount: Int
    savedPOIs: [POI]
  }

  type POI {
    placeId: String!
    name: String!
    img: String
    business_status: String
    rating: Number
    vicinity: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input POIInput {
    placeId: String!
    name: String!
    img: String
    business_status: String
    rating: Number
    vicinity: String
  }
`;

module.exports = typeDefs;