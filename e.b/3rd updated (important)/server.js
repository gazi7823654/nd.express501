
require('dotenv').config();// এই হালায় উপরে থাকে 
const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorMiddleware');
const notFound = require('./middlewares/notFound');


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
})); //যুদিষ্ঠির এই জাগায় ই হবে  অন্য origin (যেমন React) থেকে call করার অনুমতি
app.use(express.json());
app.use('/api/users', userRoutes); // রাউট যুক্ত  // 404 handler
app.use(errorHandler); // global error handler
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.get('/api/message', (req, res) => {
  res.json({ message: '✅ API connected from Express to React!' });
});
app.use(notFound); //এই মাদারচোদ রে get এর আগে দেয়া যাবে না হালায় অর্জুন



const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};
startServer();


//৩ এ রাউট বানাইছি । ভালো । এই জাগায় আনছি তাও ভালো কথা। কিন্তু 
//আগের গুলা কাটতে হইবো
// নায়লে ব্রাউজারে বাল ও আইবো না
//সিরিয়াল মেইন্টেইন করতে হয়। নায়লে বিপদ
//app.use(notFound);    //এই মাদারচোদ রে get এর আগে দেয়া যাবে না
//
//app.use(cors({
 // origin: 'http://localhost:5173',
 // credentials: true,
//}));
//☝☝const এর পর app.use এর প্রথম টা হইলো এটা। এই হালায় যুদিষ্ঠির(বড় টা) 