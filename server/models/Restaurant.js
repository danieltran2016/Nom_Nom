const { Schema, model } = require('mongoose');


const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    default: '',
  },
});

const Restaurant = model('Restaurant', restaurantSchema);

module.exports = Restaurant;
