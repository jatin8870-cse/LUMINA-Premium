const mongoose = require('mongoose');
module.exports = mongoose.model('Coupon', new mongoose.Schema({
  code: { type: String, unique: true, uppercase: true, trim: true }, type: { type: String, enum: ['percent', 'flat'] }, value: Number,
  minOrder: { type: Number, default: 0 }, maxDiscount: Number, expiresAt: Date, isActive: { type: Boolean, default: true },
  usageLimit: Number, usedCount: { type: Number, default: 0 }
}, { timestamps: true }));
