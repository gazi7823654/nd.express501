const jwt = require("jsonwebtoken");
const User = require("../models/Users");

// টোকেন ভেরিফাই ও ইউজার ভ্যালিডেশন মিডলওয়্যার
exports.protect = async (req, res, next) => {
  let token;

  // হেডার থেকে টোকেন চেক করা
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];   // "Bearer token" থেকে টোকেন বের করা

      // টোকেন যাচাই করা
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ইউজার ডাটা req.user এ রাখা (পাসওয়ার্ড ছাড়া)
      req.user = await User.findById(decoded.id).select("-password");

      next();  // পরবর্তী মিডলওয়্যার বা কন্ট্রোলারে যাওয়া
    } catch (error) {
      return res.status(401).json({ message: "অবৈধ টোকেন, লগইন করুন" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "টোকেন পাওয়া যায়নি, লগইন করুন" });
  }
};
