const { Schema, model } = require('mongoose');


const placesILikeSchema = new Schema ({
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

const PlacesILike = model ('PlacesILike', placesILikeSchema);
module.exports = PlacesILike;
