const { Schema, model } = require('mongoose');


const placesIDontLikeSchema = new Schema ({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    restaurant: [{
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
    }],
});

const PlacesIDontLike = model ('PlacesIDontLike', placesIDontLikeSchema);
module.exports = PlacesIDontLike;
