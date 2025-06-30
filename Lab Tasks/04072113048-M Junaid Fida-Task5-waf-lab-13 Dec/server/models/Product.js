const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  ProductName: { type: String, required: true },
  FirmName: { type: String, required: true },
  Price: { type: Number, required: true },
  Quantity: { type: Number, required: true },
  ExpiryDate: { type: Date, required: true }
});

module.exports = mongoose.model('Product', ProductSchema);