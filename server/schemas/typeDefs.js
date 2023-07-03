const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  } 

  type Restaurant {
    _id: ID!
    name: String!
    address: String!
    comment: String 
  }

  type PlacesToGo {
    _id: ID!
    user: User!
    restaurants: [Restaurant]
  }

  type PlacesILike {
    _id: ID!
    user: User!
    restaurants: [Restaurant]
  }

  type PlacesIDontLike {
    _id: ID!
    user: User!
    restaurants: [Restaurant]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getPlacesToGo: [Restaurant]
    getPlacesILike: [Restaurant]
    getPlacesIDontLike: [Restaurant]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addToPlacesToGo(name: String!, address: String!, comment: String): PlacesToGo
    removeFromPlacesToGo(restaurantId: ID!): PlacesToGo

    addToPlacesILike(name: String!, address: String!, comment: String): PlacesILike
    removeFromPlacesILike(restaurantId: ID!): PlacesILike
    updateCommentInPlacesILike(restaurantId: ID!, comment: String!): PlacesILike

    addToPlacesIDontLike(name: String!, address: String!, comment: String): PlacesIDontLike
    removeFromPlacesIDontLike(restaurantId: ID!): PlacesIDontLike
    updateCommentInPlacesIDontLike(restaurantId: ID!, comment: String!): PlacesIDontLike

    moveRestaurantToPlacesILike(restaurantId: ID!): PlacesToGo
    moveRestaurantToPlacesIDontLike(restaurantId: ID!): PlacesToGo
  }
`;

module.exports = typeDefs;
