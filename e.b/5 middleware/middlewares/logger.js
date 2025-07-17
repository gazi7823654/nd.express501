// Custom logger middleware: প্রতিটি request এর method এবং url লগ করবে
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`); // GET /api/users/login এরকম লগ
  next(); // পরবর্তী middleware এ যাবে
};

module.exports = logger;
