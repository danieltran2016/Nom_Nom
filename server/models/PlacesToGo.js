const { Schema, model } = require('mongoose');


const placesToGoSchema = new Schema ({
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

const PlacesToGo = model ('PlacesToGo', placesToGoSchema);
module.exports = PlacesToGo;
