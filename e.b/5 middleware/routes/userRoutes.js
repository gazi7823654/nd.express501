//authMiddleware ছাড়া userRoutes কাজ করবে না
//authmiddleware হলো হনুমান। আর userRoutes হলো রাম
//utils এর বানান ঠিক করতে হয়, s আছে কিনা
const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController");

const { protect } = require("../middlewares/authMiddleware");

// ইউজার রেজিস্টার রুট
router.post("/register", registerUser);

// ইউজার লগইন রুট
router.post("/login", loginUser);

// প্রোটেক্টেড ইউজার প্রোফাইল রুট
router.get("/profile", protect, getUserProfile);

module.exports = router;
