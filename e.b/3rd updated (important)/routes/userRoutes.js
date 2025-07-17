// const express = require('express');
// const router = express.Router();
// const { registerUser } = require('../controllers/userController');

// router.post('/register', registerUser);

// module.exports = router;
// ☝☝ ৩ এ এইডা দিয়া তেঁলে টেষ্ট করবো। ৪ এ যাইয়া আবার কাইটা দিতে হয়

const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// প্রোটেক্টেড রুট
router.get('/profile', protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;



