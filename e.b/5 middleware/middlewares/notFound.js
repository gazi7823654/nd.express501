// 5 এর কিছু জিনিস ৩ এ আবার ৪ এ শেষ


const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = notFound;
