const { Schema, model } = require('mongoose');


const placesIDontLikeSchema = new Schema ({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    restaurants: [{
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
    }],
});

const PlacesIDontLike = model ('PlacesIDontLike', placesIDontLikeSchema);
module.exports = PlacesIDontLike;
