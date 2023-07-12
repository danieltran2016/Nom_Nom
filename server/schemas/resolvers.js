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
        return PlacesILike.findOne({
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
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    getPlacesIDontLike: async (parent, args, context) => {
      if (context.user) {
        return PlacesIDontLike.findOne({
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
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // searchGeolocationResolver: async (parent, args) => {
    //   const { zip } = args; // Assuming 'zip' is passed as an argument to the resolver
    
    //   try {
    //     const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=AIzaSyDhTdmCx9-UZnUegQ3CynW5eP68S3SFSkQ`);
    
    //     if (!response.ok) {
    //       throw new Error('Failed to retrieve geolocation data.');
    //     }
    
    //     const data = await response.json();
    //     const { lat, lng } = data.results[0].geometry.location;
    //     const location = `${lat},${lng}`;
    
    //     // Pass the location to the searchPlaces resolver
    //     return searchPlaces(null, { location, ...args });
    //   } catch (error) {
    //     throw new Error('Failed to retrieve geolocation data.');
    //   }
    // },
    
    //  searchPlaces: async (parent, args) => {
    //   const { location, search } = args; // Assuming 'location' and 'search' are passed as arguments to the resolver
    
    //   try {
    //     const encodedLocation = encodeURIComponent(location);
    //     const encodedSearch = encodeURIComponent(search);
    
    //     const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?location=${encodedLocation}&query=${encodedSearch}&radius=1610&key=AIzaSyDhTdmCx9-UZnUegQ3CynW5eP68S3SFSkQ`);
    
    //     if (!response.ok) {
    //       throw new Error('Failed to retrieve places data.');
    //     }
    
    //     const data = await response.json(); 
    //     const restName = data.results[0].name; 
    //     const restAddress = data.results[0].formatted_address; 
    //     const restRating = data.results[0].rating; 

    //     console.log("Name:",restName)
    //     console.log("Address:",restAddress)
    //     console.log("Rating:",restRating)

    //     return restName, restAddress, restRating; 
    //   } catch (error) { 
    //     throw new Error('Failed to retrieve places data.'); 
    //   } 
    // }, 
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
        const existingPlacesToGo = await PlacesToGo.findOne({
          user: context.user._id,
        });

        if (!existingRestaurant) {
          const newRestaurant = await Restaurant.create(restaurant);
          if (!existingPlacesToGo) {
            await PlacesToGo.create({
              user: context.user._id,
              restaurants: newRestaurant._id,
            });
          } else {
            existingPlacesToGo.restaurants.push(newRestaurant._id);
            existingPlacesToGo.save();
          }
        } else {
          if (!existingPlacesToGo) {
            await PlacesToGo.create({
              user: context.user._id,
              restaurants: existingRestaurant._id,
            });
          } else {
            existingPlacesToGo.restaurants.push(existingRestaurant._id);
            existingPlacesToGo.save();
          }
        }
        return PlacesToGo.findOne({
          user: context.user._id,
        })
          .populate("restaurants")
          .populate("user");
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
        const existingPlacesILike = await PlacesILike.findOne({
          user: context.user._id,
        });

        if (!existingRestaurant) {
          const newRestaurant = await Restaurant.create(restaurant);
          if (!existingPlacesILike) {
            await PlacesILike.create({
              user: context.user._id,
              restaurants: { restaurant: newRestaurant._id, comment: "" },
            });
          } else {
            existingPlacesILike.restaurants.push({
              restaurant: newRestaurant._id,
              comment: "",
            });
            existingPlacesILike.save();
          }
        } else {
          const existingPlacesILike = await PlacesILike.findOne({
            user: context.user._id,
          });
          if (!existingPlacesILike) {
            await PlacesILike.create({
              user: context.user._id,
              restaurants: { restaurant: existingRestaurant._id, comment: "" },
            });
          } else {
            existingPlacesILike.restaurants.push({
              restaurant: existingRestaurant._id,
              comment: "",
            });
            existingPlacesILike.save();
          }
        }
        return PlacesILike.findOne({
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
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeFromPlacesILike: async (parent, { restaurantId }, context) => {
      if (context.user) {
        const updatedPlacesILike = await PlacesILike.findOneAndUpdate(
          { user: context.user._id },
          { $pull: { restaurants: { restaurant: restaurantId } } },
          { new: true }
        )
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
            user: context.user._id,
            "restaurants.restaurant": restaurantId,
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

        const existingRestaurant = await Restaurant.findOne({ address });
        const existingPlacesIDontLike = await PlacesIDontLike.findOne({
          user: context.user._id,
        });

        if (!existingRestaurant) {
          const newRestaurant = await Restaurant.create(restaurant);
          if (!existingPlacesIDontLike) {
            await PlacesIDontLike.create({
              user: context.user._id,
              restaurants: { restaurant: newRestaurant._id, comment: "" },
            });
          } else {
            existingPlacesIDontLike.restaurants.push({
              restaurant: newRestaurant._id,
              comment: "",
            });
            existingPlacesIDontLike.save();
          }
        } else {
          const existingPlacesIDontLike = await PlacesIDontLike.findOne({
            user: context.user._id,
          });
          if (!existingPlacesIDontLike) {
            await PlacesIDontLike.create({
              user: context.user._id,
              restaurants: { restaurant: existingRestaurant._id, comment: "" },
            });
          } else {
            existingPlacesIDontLike.restaurants.push({
              restaurant: existingRestaurant._id,
              comment: "",
            });
            existingPlacesIDontLike.save();
          }
        }
        return PlacesIDontLike.findOne({
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
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeFromPlacesIDontLike: async (parent, { restaurantId }, context) => {
      if (context.user) {
        const updatedPlacesIDontLike = await PlacesIDontLike.findOneAndUpdate(
          { user: context.user._id },
          { $pull: { restaurants: { restaurant: restaurantId } } },
          { new: true }
        )
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
            user: context.user._id,
            "restaurants.restaurant": restaurantId,
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
        // Find the restaurant in Restaurant
        const restaurant = await Restaurant.findOne({ _id: restaurantId });
        if (!restaurant) {
          throw new Error("Restaurant not found.");
        }

        const existingPlacesILike = await PlacesILike.findOne({
          user: context.user._id,
        });

        if (!existingPlacesILike) {
          // Add the restaurant to PlacesILike
          await PlacesILike.create({
            user: context.user._id,
            restaurants: { restaurant: restaurantId, comment: "" },
          });
        } else {
          // Add the restaurant to PlacesILike
          existingPlacesILike.restaurants.push({
            restaurant: restaurantId,
            comment: "",
          });
          existingPlacesILike.save();
        }
        // Remove the restaurant from PlacesToGo
        await PlacesToGo.findOneAndUpdate(
          { user: context.user._id },
          { $pull: { restaurants: restaurantId } }
        );
  
        const updatedPlacesToGo = await PlacesToGo.findOne({
          user: context.user._id,
        })
        .populate("restaurants")
        .populate("user");

        const updatedPlacesILike = await PlacesILike.findOne({
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

        return {
          placesToGo: updatedPlacesToGo,
          placesILike: updatedPlacesILike
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
        // Find the restaurant in Restaurant
        const restaurant = await Restaurant.findOne({ _id: restaurantId });
        if (!restaurant) {
          throw new Error("Restaurant not found.");
        }

        const existingPlacesIDontLike = await PlacesIDontLike.findOne({
          user: context.user._id,
        });
        if (!existingPlacesIDontLike) {
          // Add the restaurant to PlacesIDontLike
          await PlacesIDontLike.create({
            user: context.user._id,
            restaurants: { restaurant: restaurantId, comment: "" },
          });
        } else {
          // Add the restaurant to PlacesILike
          existingPlacesIDontLike.restaurants.push({
            restaurant: restaurantId,
            comment: "",
          });
          existingPlacesIDontLike.save();
        }
        // Remove the restaurant from PlacesToGo
        await PlacesToGo.findOneAndUpdate(
          { user: context.user._id },
          { $pull: { restaurants: restaurantId } }
        );

        const updatedPlacesToGo = await PlacesToGo.findOne({
          user: context.user._id,
        })
        .populate("restaurants")
        .populate("user");

        const updatedPlacesIDontLike = await PlacesIDontLike.findOne({
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

        return {
          placesToGo: updatedPlacesToGo,
          placesIDontLike: updatedPlacesIDontLike,
        };
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
