require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');
const Banner = require('../models/Banner');
const products = [
  ['The Daily Dew Serum', 'Serums', 1299, 1599, 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85'],
  ['Cloud Nine Moisturiser', 'Moisturisers', 999, 1299, 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=85'],
  ['Golden Hour Face Oil', 'Face oils', 1499, 1899, 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85'],
  ['Soft Focus Cleanser', 'Cleansers', 799, 999, 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85'],
  ['Sunday Reset Clay Mask', 'Masks', 1099, 1399, 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=85'],
  ['Petal Kiss Lip Treatment', 'Lip care', 599, 749, 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=85'],
  ['Calm Cloud Eye Cream', 'Eye care', 899, 1099, 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85'],
  ['Morning Veil SPF', 'Sunscreen', 1199, 1499, 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85'],
  ['Silk Skin Toner', 'Toners', 699, 899, 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85'],
  ['Night Bloom Sleeping Mask', 'Masks', 1299, 1599, 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=85'],
  ['Barely There Body Lotion', 'Body care', 899, 1199, 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=85'],
  ['Glow Ritual Set', 'Sets', 1999, 2399, 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85']
];
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
(async () => { await connectDB(); await Promise.all([Product.deleteMany({}), Coupon.deleteMany({}), Banner.deleteMany({}), User.deleteMany({ role: 'admin' })]);
  await Product.insertMany(products.map((p, i) => ({ name: p[0], slug: slug(p[0]), category: p[1], price: p[2], mrp: p[3], images: [p[4]], stock: 12 + i * 2, rating: 4.8, description: `A considered ${p[1].toLowerCase()} ritual made for everyday skin.`, ingredients: 'Thoughtful botanical ingredients', isBestseller: i < 6 })));
  await User.create({ name: 'LUMINA Admin', email: 'admin@lumina.local', password: 'Admin@123', role: 'admin' });
  await Coupon.insertMany([{ code: 'WELCOME10', type: 'percent', value: 10, minOrder: 500, maxDiscount: 300, isActive: true }, { code: 'LUMINA200', type: 'flat', value: 200, minOrder: 1500, isActive: true }]);
  await Banner.insertMany([{ image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1300&q=90', title: 'Your everyday glow', link: '/shop', order: 1 }, { image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1300&q=90', title: 'Thoughtful rituals', link: '/shop', order: 2 }, { image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1300&q=90', title: 'Less, but lovelier', link: '/shop', order: 3 }]);
  console.log('Seed complete. Admin: admin@lumina.local / Admin@123'); await mongoose.disconnect();
})().catch(err => { console.error(err); process.exit(1); });
