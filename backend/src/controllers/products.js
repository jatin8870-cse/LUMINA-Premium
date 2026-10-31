const Product = require('../models/Product');
const slugify = value => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
exports.list = async (req, res, next) => { try {
  const { search, category, minPrice, maxPrice, sort, bestseller, page = 1, limit = 24 } = req.query;
  const filter = { isActive: true }; if (category) filter.category = category; if (bestseller === 'true') filter.isBestseller = true;
  if (search) filter.$text = { $search: search }; if (minPrice || maxPrice) filter.price = { ...(minPrice ? { $gte: Number(minPrice) } : {}), ...(maxPrice ? { $lte: Number(maxPrice) } : {}) };
  const sortMap = { low: { price: 1 }, high: { price: -1 }, newest: { createdAt: -1 }, rating: { rating: -1 } };
  const rows = await Product.find(filter).sort(sortMap[sort] || { isBestseller: -1, createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
  res.json({ success: true, data: { products: rows, page: Number(page), total: await Product.countDocuments(filter) } });
} catch (e) { next(e); } };
exports.one = async (req, res, next) => { try { const p = await Product.findOne({ $or: [{ _id: req.params.idOrSlug }, { slug: req.params.idOrSlug }] }); if (!p) return res.status(404).json({ success: false, message: 'Product not found' }); res.json({ success: true, data: p }); } catch (e) { next(e); } };
exports.bestsellers = async (req, res, next) => { try { res.json({ success: true, data: await Product.find({ isActive: true, isBestseller: true }) }); } catch (e) { next(e); } };
exports.create = async (req, res, next) => { try { const data = { ...req.body, slug: req.body.slug || slugify(req.body.name), images: req.files?.length ? req.files.map(f => `/uploads/${f.filename}`) : (req.body.images || []) }; res.status(201).json({ success: true, data: await Product.create(data) }); } catch (e) { next(e); } };
exports.update = async (req, res, next) => { try { const data = { ...req.body }; if (req.files?.length) data.images = req.files.map(f => `/uploads/${f.filename}`); res.json({ success: true, data: await Product.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true }) }); } catch (e) { next(e); } };
exports.remove = async (req, res, next) => { try { await Product.findByIdAndUpdate(req.params.id, { isActive: false }); res.json({ success: true, message: 'Product archived' }); } catch (e) { next(e); } };
