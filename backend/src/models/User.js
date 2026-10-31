const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const address = new mongoose.Schema({ name: String, phone: String, line1: String, city: String, state: String, pincode: String }, { _id: false });
const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true }, email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false }, phone: String, role: { type: String, enum: ['user', 'admin'], default: 'user' },
  addresses: [address], wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  cart: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, qty: { type: Number, min: 1 } }]
}, { timestamps: true });
schema.pre('save', async function (next) { if (!this.isModified('password')) return next(); this.password = await bcrypt.hash(this.password, 12); next(); });
schema.methods.comparePassword = function (password) { return bcrypt.compare(password, this.password); };
module.exports = mongoose.model('User', schema);
