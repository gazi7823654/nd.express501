// const registerUser = (req, res, next) => {
//   const { name, email, password } = req.body;

//   // ইনপুট validation
//   if (!name || !email || !password) {
//     res.status(400);
//     return next(new Error('All fields are required'));
//   }

//   res.status(201).json({ message: 'User registered' });
// };

// module.exports = { registerUser };
// ৩ এর ভিতরে হুদাই এইটা ☝☝ দিয়া টেষ্ট করছি। ৪ এ যাইয়া আবার কাইটা দিতে হয়
// ঝামেলা আছে এই বাল টা রে না দিলে আবার চলবো না। প্রথমে দিতে হইবো
// পরে কাটতে হুইবো


const User = require('../models/User'); // ইউজার মডেল নিয়ে আসা
const bcrypt = require('bcryptjs'); // পাসওয়ার্ড হ্যাশ করার লাইব্রেরি
const jwt = require('jsonwebtoken'); // JWT টোকেন তৈরির লাইব্রেরি

// রেজিস্ট্রেশন ফাংশন: try-catch দিয়ে async error হ্যান্ডেল করা হয়েছে
const registerUser = async (req, res, next) => {
  try { // try শুরু

    const { name, email, password } = req.body; // রিকোয়েস্ট থেকে ডাটা নেওয়া

    if (!name || !email || !password) { // ইনপুট ভ্যালিডেশন
      res.status(400);
      return next(new Error('All fields are required')); // ফাঁকা থাকলে এরর রিটার্ন
    }

    const existingUser = await User.findOne({ email }); // ইমেইল আগেই আছে কিনা চেক
    if (existingUser) {
      res.status(400);
      return next(new Error('User already exists')); // আগে থাকলে এরর রিটার্ন
    }

    const hashedPassword = await bcrypt.hash(password, 10); // পাসওয়ার্ড হ্যাশিং

    const user = await User.create({ // নতুন ইউজার তৈরি
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { // JWT টোকেন তৈরি
      expiresIn: '7d',
    });

    res.status(201).json({ // সফল রেসপন্স
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });

  } catch (error) { // error ধরা
    next(error); // global error middleware কে error পাঠানো
  }
};

// লগইন ফাংশন: try-catch দিয়ে async error হ্যান্ডেল করা হয়েছে
const loginUser = async (req, res, next) => {
  try { // try শুরু

    const { email, password } = req.body; // রিকোয়েস্ট থেকে ডাটা নেওয়া

    if (!email || !password) { // ইনপুট ভ্যালিডেশন
      res.status(400);
      return next(new Error('Email & password required')); // ফাঁকা থাকলে এরর রিটার্ন
    }

    const user = await User.findOne({ email }); // ইউজার আছে কিনা চেক
    if (!user) {
      res.status(401);
      return next(new Error('Invalid credentials')); // না থাকলে এরর রিটার্ন
    }

    const isMatch = await bcrypt.compare(password, user.password); // পাসওয়ার্ড মিল আছে কি না
    if (!isMatch) {
      res.status(401);
      return next(new Error('Invalid credentials')); // না মিলে এরর রিটার্ন
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { // JWT টোকেন তৈরি
      expiresIn: '7d',
    });

    res.json({ // সফল লগইন রেসপন্স
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });

  } catch (error) { // error ধরা
    next(error); // global error middleware কে error পাঠানো
  }
};

module.exports = { registerUser, loginUser }; // ফাংশন এক্সপোর্ট
