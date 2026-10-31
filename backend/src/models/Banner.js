const mongoose = require('mongoose');
module.exports = mongoose.model('Banner', new mongoose.Schema({ image: String, title: String, link: String, isActive: { type: Boolean, default: true }, order: { type: Number, default: 0 } }, { timestamps: true }));
