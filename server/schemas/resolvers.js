const { AuthenticationError } = require('apollo-server-express');
const { User, Restaurant, PlacesToGo, PlacesILike, PlacesIDontLike } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    getPlacesToGo: async (parent, args, context) => {
      if (context.user) {
        return PlacesToGo.findOne({ user: context.user._id }).populate('restaurants');
      }
      throw new AuthenticationError('You need to be logged in!'); 
    }, 
    getPlacesILike: async (parent, args, context) => {
      if (context.user) {
        return PlacesILike.findOne({ user: context.user._id }).populate('restaurants');
      }
      throw new AuthenticationError('You need to be logged in!'); 
    },
    getPlacesIDontLike: async (parent, args, context) => {
      if (context.user) {
        return PlacesIDontLike.findOne({ user: context.user._id }).populate('restaurants');
      }
      throw new AuthenticationError('You need to be logged in!'); 
    }, 
  }, 

  Mutation: { 
    // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    // user comes from `req.user` created in the auth middleware function
    addToPlacesToGo: async (parent, { name, address, comment }, context) => {
      if (context.user) {
        const restaurant = {
          name,
          address,
          comment,
        };

        const updatedPlacesToGo = await PlacesToGo.findOneAndUpdate(
          { user: context.user._id },
          { $addToSet: { restaurants: restaurant } },
          { new: true }
        );

        return updatedPlacesToGo; 
      } 
      throw new AuthenticationError('You need to be logged in!'); 
    }, 
    removeFromPlacesToGo: async (parent, { restaurantId }, context) => { 
      if (context.user) { 
        const updatedPlacesToGo = await PlacesToGo.findOneAndUpdate( 
          { user: context.user._id }, 
          { $pull: { restaurants: { _id: restaurantId } } }, 
          { new: true } 
        ); 

        if (!updatedPlacesToGo) { 
          throw new Error("Couldn't find user with this id!"); 
        } 

        return updatedPlacesToGo; 
      } 
      
      throw new AuthenticationError('You need to be logged in!'); 
    }, 

    addToPlacesILike: async (parent, { name, address, comment }, context) => {
      if (context.user) {
        const restaurant = {
          name,
          address,
          comment,
        };

        const updatedPlacesILike = await PlacesILike.findOneAndUpdate(
          { user: context.user._id },
          { $addToSet: { restaurant: restaurant } },
          { new: true }
        );

        return updatedPlacesILike; 
      } 
      throw new AuthenticationError('You need to be logged in!'); 
    }, 
    removeFromPlacesILike: async (parent, { restaurantId }, context) => { 
      if (context.user) { 
        const updatedPlacesILike = await PlacesILike.findOneAndUpdate( 
          { user: context.user._id }, 
          { $pull: { restaurant: { _id: restaurantId } } }, 
          { new: true } 
        ); 

        if (!updatedPlacesILike) { 
          throw new Error("Couldn't find user with this id!"); 
        } 

        return updatedPlacesILike; 
      } 
      
      throw new AuthenticationError('You need to be logged in!'); 
    }, 
  }, 
}; 

module.exports = resolvers;