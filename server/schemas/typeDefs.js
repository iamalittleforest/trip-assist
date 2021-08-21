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
    removePOI(POI_id: ID!): User
  }

  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedPOIs: [POI]
  }

  type POI {
    POI_id: String!
    name: String!
    img: String
    business_status: String
    rating: Float
    vicinity: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input POIInput {
    POI_id: String!
    name: String!
    img: String
    business_status: String
    rating: Float
    vicinity: String
  }
`;

module.exports = typeDefs;