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
  }

  type PlacesToGo {
    _id: ID!
    user: User!
    restaurants: [Restaurant]
  }

  type PlacesILike {
    _id: ID!
    user: User!
    restaurants: [RestaurantWithComment]
  }

  type PlacesIDontLike {
    _id: ID!
    user: User!
    restaurants: [RestaurantWithComment]
  }

  type RestaurantWithComment {
    restaurant: Restaurant
    comment: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getPlacesToGo: PlacesToGo
    getPlacesILike: PlacesILike
    getPlacesIDontLike: PlacesIDontLike
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addToPlacesToGo(name: String!, address: String!): PlacesToGo
    removeFromPlacesToGo(restaurantId: ID!): PlacesToGo

    addToPlacesILike(name: String!, address: String!): PlacesILike
    removeFromPlacesILike(restaurantId: ID!): PlacesILike
    updateCommentInPlacesILike(restaurantId: ID!, comment: String): PlacesILike

    addToPlacesIDontLike(name: String!, address: String!): PlacesIDontLike
    removeFromPlacesIDontLike(restaurantId: ID!): PlacesIDontLike
    updateCommentInPlacesIDontLike(restaurantId: ID!, comment: String): PlacesIDontLike

    moveRestaurantToPlacesILike(restaurantId: ID!): PlacesToGo
    moveRestaurantToPlacesIDontLike(restaurantId: ID!): PlacesToGo
  }
`;

module.exports = typeDefs;
