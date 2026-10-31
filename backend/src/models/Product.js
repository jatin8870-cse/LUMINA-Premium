const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: { type: String, required: true }, slug: { type: String, unique: true, index: true }, price: { type: Number, required: true, min: 0 },
  mrp: { type: Number, min: 0 }, images: [String], category: String, stock: { type: Number, default: 0, min: 0 },
  rating: { type: Number, default: 4.8 }, numReviews: { type: Number, default: 0 }, description: String, ingredients: String,
  isBestseller: Boolean, isActive: { type: Boolean, default: true }
}, { timestamps: true });
schema.index({ name: 'text', description: 'text' });
module.exports = mongoose.model('Product', schema);
