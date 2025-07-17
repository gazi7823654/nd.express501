const User = require("../models/Users");               // ইউজার মডেল ইম্পোর্ট
const bcrypt = require("bcryptjs");                   // পাসওয়ার্ড হ্যাশ লাইব্রেরি
const generateToken = require("../utils/generateToken");  // JWT টোকেন জেনারেটর

// রেজিস্টার ইউজার
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;        // ইনপুট নেওয়া

    // ইমেইল ইউজার আগে থেকে আছে কিনা চেক
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "ইমেইল ইতিমধ্যে ব্যবহৃত হয়েছে" });
    }

    // পাসওয়ার্ড হ্যাশ করা
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // নতুন ইউজার তৈরি
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // রেসপন্সে ইউজার ডাটা ও টোকেন দেওয়া
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "সার্ভার এরর" });
  }
};

// ইউজার লগইন
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ইউজার খোঁজা
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "ভুল ইমেইল বা পাসওয়ার্ড" });
    }

    // পাসওয়ার্ড মিলিয়ে দেখা
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "ভুল ইমেইল বা পাসওয়ার্ড" });
    }

    // সফল হলে টোকেনসহ রেসপন্স
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "সার্ভার এরর" });
  }
};

// প্রোটেক্টেড ইউজার প্রোফাইল পাওয়া
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "ইউজার পাওয়া যায়নি" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "সার্ভার এরর" });
  }
};
