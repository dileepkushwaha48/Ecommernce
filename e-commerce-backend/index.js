const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
// const Razorpay = require('razorpay');
const axios = require('axios'); // new
const crypto = require('crypto');

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect('mongodb://localhost:27017/e-commerce', { useNewUrlParser: true, useUnifiedTopology: true });

// // Initialize Razorpay
// const razorpay = new Razorpay({
//   key_id: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay Key ID
//   key_secret: 'YOUR_RAZORPAY_KEY_SECRET' // Replace with your Razorpay Key Secret
// });

// // Create Order Endpoint
// app.post('/create-order', async (req, res) => {
//   const { amount, currency, receipt } = req.body;
//   try {
//     const order = await razorpay.orders.create({ amount, currency, receipt });
//     res.json(order);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // Verify Payment Endpoint
// app.post('/verify-payment', (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
//   const hmac = crypto.createHmac('sha256', 'YOUR_RAZORPAY_KEY_SECRET');
//   hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
//   const generatedSignature = hmac.digest('hex');

//   if (generatedSignature === razorpay_signature) {
//     res.json({ status: 'success' });
//   } else {
//     res.status(400).json({ status: 'failure' });
//   }
// });


// payment with esewa
app.post('/create-esewa-payment', async (req, res) => {
  const { amount, orderId } = req.body;
  const esewaUrl = 'https://www.esewa.com.np/epay/main';
  const esewaMerchantId = 'YOUR_MERCHANT_ID';
  const esewaMerchantSecret = 'YOUR_MERCHANT_SECRET';

  // Generate token (you may need to adjust this based on eSewa documentation)
  const token = crypto.createHash('sha256').update(`${orderId}|${amount}|${esewaMerchantSecret}`).digest('hex');

  res.json({
      success: true,
      url: esewaUrl,
      token: token,
      amount: amount,
      orderId: orderId,
      merchantId: esewaMerchantId
  });
});


// end

// Image Storage Engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });
app.post('/upload', upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:4000/images/${req.file.filename}`
  });
});
app.use('/images', express.static('upload/images'));

// Middleware to fetch user from database
const fetchuser = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ errors: 'Please authenticate using a valid token' });
  }
  try {
    const data = jwt.verify(token, 'secret_ecom');
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).send({ errors: 'Please authenticate using a valid token' });
  }
};

// User Schema
const Users = mongoose.model('Users', {
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  cartData: { type: Object },
  date: { type: Date, default: Date.now }
});

// Product Schema
const Product = mongoose.model('Product', {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number },
  old_price: { type: Number },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true }
});

app.listen(port, (error) => {
  if (!error) console.log(`Server Running on port ${port}`);
  else console.log(`Error: ${error}`);
});
