const registerUser = (req, res, next) => {
  const { name, email, password } = req.body;

  // ইনপুট validation
  if (!name || !email || !password) {
    res.status(400);
    return next(new Error('All fields are required'));
  }

  res.status(201).json({ message: 'User registered' });
};

module.exports = { registerUser };
