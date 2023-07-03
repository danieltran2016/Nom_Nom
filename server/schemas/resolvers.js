const { AuthenticationError } = require('apollo-server-express');
const { User, Restaurant, PlacesToGo, PlacesILike, PlacesIDontLike } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    getPlacesToGo: async (parent, args, context) => {
      if (context.user) {
        return PlacesToGo.findOne({ user: context.user._id }).populate('restaurant');
      }
      throw new AuthenticationError('You need to be logged in!'); 
    }, 
    getPlacesILike: async (parent, args, context) => {
      if (context.user) {
        return PlacesILike.findOne({ user: context.user._id }).populate('restaurant');
      }
      throw new AuthenticationError('You need to be logged in!'); 
    },
    getPlacesIDontLike: async (parent, args, context) => {
      if (context.user) {
        return PlacesIDontLike.findOne({ user: context.user._id }).populate('restaurant');
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
  // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
  // user comes from `req.user` created in the auth middleware function
    saveBook: async (parent, { bookId, authors, description, title, image, link }, context) => {
      if (context.user) {
        const book = {
          bookId,
          authors,
          description,
          title,
          image,
          link
        };

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: book } },
          { new: true }
        );

        return updatedUser; 
      } 
      throw new AuthenticationError('You need to be logged in!'); 
    }, 
    removeBook: async (parent, { bookId }, context) => { 
      if (context.user) { 
        const updatedUser = await User.findOneAndUpdate( 
          { _id: context.user._id }, 
          { $pull: { savedBooks: { bookId: bookId } } }, 
          { new: true } 
        ); 

        if (!updatedUser) { 
          throw new Error("Couldn't find user with this id!"); 
        } 

        return updatedUser; 
      } 
      
      throw new AuthenticationError('You need to be logged in!'); 
    }, 
  }, 
}; 

module.exports = resolvers;