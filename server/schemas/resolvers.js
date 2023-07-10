const { AuthenticationError } = require("apollo-server-express");
const {
  User,
  Restaurant,
  PlacesToGo,
  PlacesILike,
  PlacesIDontLike,
} = require("../models");
// import sign token function from auth
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getPlacesToGo: async (parent, args, context) => {
      //console.log(context.user._id);
      if (context.user) {
        return PlacesToGo.findOne({
          user: context.user._id,
        })
          .populate("restaurants")
          .populate("user");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    getPlacesILike: async (parent, args, context) => {
      if (context.user) {
        const placesILike = await PlacesILike.findOne({
          user: context.user._id,
        })
          .populate({
            path: "restaurants",
            populate: {
              path: "restaurant",
            },
          })
          .populate({
            path: "restaurants.comment",
          })
          .populate("user");
        console.log(placesILike);
        return placesILike;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    getPlacesIDontLike: async (parent, args, context) => {
      if (context.user) {
        return PlacesIDontLike.findOne({
          user: context.user._id,
        })
          .populate("restaurants")
          .populate("user");
      }
      throw new AuthenticationError("You need to be logged in!");
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
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    // user comes from `req.user` created in the auth middleware function
    addToPlacesToGo: async (parent, { name, address }, context) => {
      if (context.user) {
        const restaurant = {
          name,
          address,
        };
        const existingRestaurant = await Restaurant.findOne({ address });

        if (!existingRestaurant) {
          const newRestaurant = await Restaurant.create(restaurant);
          const existingPlacesToGo = await PlacesToGo.findOne({
            user: context.user._id,
          });
          if (!existingPlacesToGo) {
            const newPlacesTogo = await PlacesToGo.create({
              user: context.user._id,
              restaurants: newRestaurant._id,
            });
            //console.log(newPlacesTogo);
            return newPlacesTogo;
          } else {
            existingPlacesToGo.restaurants.push(newRestaurant._id);
            existingPlacesToGo.save();
            return existingPlacesToGo;
          }
        } else {
          const existingPlacesToGo = await PlacesToGo.findOne({
            user: context.user._id,
          });
          if (!existingPlacesToGo) {
            const newPlacesTogo = await PlacesToGo.create({
              user: context_user._id,
              restaurants: existingRestaurant._id,
            });
            return newPlacesTogo;
          } else {
            existingPlacesToGo.restaurants.push(existingRestaurant._id);
            existingPlacesToGo.save();
            return existingPlacesToGo;
          }
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeFromPlacesToGo: async (parent, { restaurantId }, context) => {
      if (context.user) {
        const updatedPlacesToGo = await PlacesToGo.findOneAndUpdate(
          { user: context.user._id },
          { $pull: { restaurants: restaurantId } },
          { new: true }
        )
          .populate("restaurants")
          .populate("user");
        console.log(updatedPlacesToGo);

        if (!updatedPlacesToGo) {
          throw new Error("Couldn't find user with this id!");
        }

        return updatedPlacesToGo;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    addToPlacesILike: async (parent, { name, address }, context) => {
      if (context.user) {
        const restaurant = {
          name,
          address,
        };

        const existingRestaurant = await Restaurant.findOne({ address });

        if (!existingRestaurant) {
          const newRestaurant = await Restaurant.create(restaurant);
          const existingPlacesILike = await PlacesILike.findOne({
            user: context.user._id,
          });
          if (!existingPlacesILike) {
            const newPlacesILike = await PlacesILike.create({
              user: context.user._id,
              restaurants: { restaurant: newRestaurant._id, comment: "" },
            });
            return newPlacesILike;
          } else {
            existingPlacesILike.restaurants.push({
              restaurant: newRestaurant._id,
              comment: "",
            });
            existingPlacesILike.save();
            console.log(existingPlacesILike);
            return existingPlacesILike;
          }
        } else {
          const existingPlacesILike = await PlacesILike.findOne({
            user: context.user._id,
          });
          if (!existingPlacesILike) {
            const newPlacesILike = await PlacesILike.create({
              user: context_user._id,
              restaurants: { restaurant: existingRestaurant._id, comment: "" },
            });
            return newPlacesILike;
          } else {
            existingPlacesILike.restaurants.push({
              restaurant: existingRestaurant._id,
              comment: "",
            });
            existingPlacesILike.save();
            return existingPlacesILike;
          }
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeFromPlacesILike: async (parent, { restaurantId }, context) => {
      if (context.user) {
        const updatedPlacesILike = await PlacesILike.findOneAndUpdate(
          { user: { _id: context.user._id } },
          { $pull: { restaurants: { _id: restaurantId } } },
          { new: true }
        );

        if (!updatedPlacesILike) {
          throw new Error("Couldn't find user with this id!");
        }

        return updatedPlacesILike;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    updateCommentInPlacesILike: async (
      parent,
      { restaurantId, comment },
      context
    ) => {
      if (context.user) {
        const updatedPlacesILike = await PlacesILike.findOneAndUpdate(
          {
            user: { _id: context.user._id },
            "restaurants.restaurant._id": restaurantId,
          },
          { $set: { "restaurants.$.comment": comment } },
          { new: true }
        );

        if (!updatedPlacesILike) {
          throw new Error("Couldn't find user with this id!");
        }

        return updatedPlacesILike;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    addToPlacesIDontLike: async (parent, { name, address }, context) => {
      if (context.user) {
        const restaurant = {
          name,
          address,
        };
        const restaurantWithComment = {
          restaurant: restaurant,
          comment: "",
        };

        const updatedPlacesIDontLike = await PlacesIDontLike.findOneAndUpdate(
          { user: { _id: context.user._id } },
          { $addToSet: { restaurants: restaurantWithComment } },
          { new: true }
        );

        return updatedPlacesIDontLike;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeFromPlacesIDontLike: async (parent, { restaurantId }, context) => {
      if (context.user) {
        const updatedPlacesIDontLike = await PlacesIDontLike.findOneAndUpdate(
          { user: { _id: context.user._id } },
          { $pull: { restaurants: { _id: restaurantId } } },
          { new: true }
        );

        if (!updatedPlacesIDontLike) {
          throw new Error("Couldn't find user with this id!");
        }

        return updatedPlacesIDontLike;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    updateCommentInPlacesIDontLike: async (
      parent,
      { restaurantId, comment },
      context
    ) => {
      if (context.user) {
        const updatedPlacesIDontLike = await PlacesIDontLike.findOneAndUpdate(
          {
            user: { _id: context.user._id },
            "restaurants.restaurant._id": restaurantId,
          },
          { $set: { "restaurants.$.comment": comment } },
          { new: true }
        );

        if (!updatedPlacesIDontLike) {
          throw new Error("Couldn't find user with this id!");
        }

        return updatedPlacesIDontLike;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    moveRestaurantToPlacesILike: async (parent, { restaurantId }, context) => {
      if (context.user) {
        // Find the restaurant in PlacesToGo
        const restaurant = await Restaurant.findOne({ _id: restaurantId });
        if (!restaurant) {
          throw new Error("Restaurant not found.");
        }

        // Create a new RestaurantWithComment object with an initial empty comment
        const restaurantWithComment = {
          restaurant: restaurant,
          comment: "",
        };

        // Add the restaurant to PlacesILike
        const updatedPlacesILike = await PlacesILike.findOneAndUpdate(
          { user: { _id: context.user._id } },
          { $addToSet: { restaurants: restaurantWithComment } },
          { new: true }
        );

        if (!updatedPlacesILike) {
          throw new Error("Couldn't find user with this id!");
        }

        // Remove the restaurant from PlacesToGo
        const updatedPlacesToGo = await PlacesToGo.findOneAndUpdate(
          { user: { _id: context.user._id } },
          { $pull: { restaurants: restaurant } }
        );

        return {
          placesToGo: updatedPlacesToGo,
          placesILike: updatedPlacesILike,
        };
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    moveRestaurantToPlacesIDontLike: async (
      parent,
      { restaurantId },
      context
    ) => {
      if (context.user) {
        // Find the restaurant in PlacesToGo
        const restaurant = await Restaurant.findOne({ _id: restaurantId });
        if (!restaurant) {
          throw new Error("Restaurant not found.");
        }

        // Create a new RestaurantWithComment object
        const restaurantWithComment = {
          restaurant: restaurant,
          comment: "",
        };

        // Add the restaurant to PlacesIDontLike
        const updatedPlacesIDontLike = await PlacesIDontLike.findOneAndUpdate(
          { user: { _id: context.user._id } },
          { $addToSet: { restaurants: restaurantWithComment } },
          { new: true }
        );

        if (!updatedPlacesIDontLike) {
          throw new Error("Couldn't find user with this id!");
        }

        // Remove the restaurant from PlacesToGo
        const updatedPlacesToGo = await PlacesToGo.findOneAndUpdate(
          { user: { _id: context.user._id } },
          { $pull: { restaurants: restaurant } }
        );

        return {
          placesToGo: updatedPlacesToGo,
          placesILike: updatedPlacesIDontLike,
        };
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
