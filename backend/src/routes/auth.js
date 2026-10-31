const router = require('express').Router(); const { body } = require('express-validator'); const c = require('../controllers/auth'); const protect = require('../middleware/auth'); const validate = require('../middleware/validate');
router.post('/register', [body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 })], validate, c.register);
router.post('/login', [body('email').isEmail(), body('password').notEmpty()], validate, c.login); router.get('/me', protect, c.me); router.put('/profile', protect, c.profile); router.post('/address', protect, c.address);
router.get('/wishlist', protect, c.getWishlist); router.post('/wishlist/:productId', protect, c.wishlist); router.delete('/wishlist/:productId', protect, c.wishlist); module.exports = router;
