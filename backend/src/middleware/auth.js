const jwt = require('jsonwebtoken');
const User = require('../models/User');
async function protect(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    if (!header.startsWith('Bearer ')) return res.status(401).json({ success: false, message: 'Authentication required' });
    const decoded = jwt.verify(header.slice(7), process.env.JWT_SECRET || 'lumina-local-development-secret');
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(401).json({ success: false, message: 'User no longer exists' });
    next();
  } catch (err) { res.status(401).json({ success: false, message: 'Invalid or expired token' }); }
}
module.exports = protect;
