const mongoose = require('mongoose');
const item = new mongoose.Schema({ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, name: String, image: String, qty: Number, price: Number }, { _id: false });
const history = new mongoose.Schema({ status: String, at: { type: Date, default: Date.now } }, { _id: false });
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, items: [item], subtotal: Number, discount: Number, shippingFee: Number, total: Number, coupon: String,
  status: { type: String, enum: ['Placed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Refunded'], default: 'Placed' },
  statusHistory: [history], payment: { method: { type: String, enum: ['COD', 'Online-Demo'] }, status: { type: String, enum: ['Pending', 'Paid', 'Refunded'], default: 'Pending' }, transactionId: String },
  address: { name: String, phone: String, line1: String, city: String, state: String, pincode: String }, trackingId: String,
  invoiceNumber: { type: String, unique: true }
}, { timestamps: true });
schema.index({ user: 1, createdAt: -1 });
module.exports = mongoose.model('Order', schema);
