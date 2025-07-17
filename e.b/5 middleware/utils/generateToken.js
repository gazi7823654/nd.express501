const jwt = require("jsonwebtoken");

// ইউজার আইডি নিয়ে JWT টোকেন তৈরি করা হয়, টোকেন ১ দিন মেয়াদি
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "1d",  // .env থেকে মেয়াদ নেবে, না থাকলে ১ দিন
  });
};

module.exports = generateToken;
