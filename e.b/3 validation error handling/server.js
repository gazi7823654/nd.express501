
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
})); // এই জাগায় ই হবে  অন্য origin (যেমন React) থেকে call করার অনুমতি
app.use(express.json());
app.use('/api/users', userRoutes); // রাউট যুক্ত
app.use(notFound);           // 404 handler
app.use(errorHandler);       // global error handler

app.get('/', (req, res) => {
  res.send('API is running...');
});
app.get('/api/message', (req, res) => {
  res.json({ message: '✅ API connected from Express to React!' });
});


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
