const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../../middleware/authMiddleware');

// Public route
router.post('/login', authController.login);
router.post('/validate', authController.validate);
// Protected route
router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'You accessed protected route' });
});
module.exports = router;