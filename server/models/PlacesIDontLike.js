const { Schema, model } = require('mongoose');


const placesIDontLikeSchema = new Schema ({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    restaurants: [
      {
        restaurant: {
          type: Schema.Types.ObjectId,
          ref: 'Restaurant',
        },
        comment: {
          type: String,
          default: '',
        },
      }
    ],
});

const PlacesIDontLike = model ('PlacesIDontLike', placesIDontLikeSchema);
module.exports = PlacesIDontLike;
