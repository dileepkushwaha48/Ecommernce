const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// -------------------- MongoDB --------------------
mongoose.connect(
  "mongodb+srv://mrdileepkushwaha11_db_user:qizLTTW4ZdK4hq4o@cluster0.0vn7noh.mongodb.net/footwear"
).then(() => {
  console.log("MongoDB connected");
}).catch((err) => {
  console.log(err);
});

// -------------------- Image Upload --------------------
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
});

app.use("/images", express.static("upload/images"));

// -------------------- Auth Middleware --------------------
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ errors: "No token provided" });
  }

  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch {
    res.status(401).json({ errors: "Invalid token" });
  }
};

// -------------------- Models --------------------
const Users = mongoose.model("Users", {
  name: String,
  email: { type: String, unique: true },
  password: String,
  cartData: Object,
  date: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: Number,
  old_price: Number,
  date: { type: Date, default: Date.now },
  avilable: { type: Boolean, default: true },
});

// -------------------- Root --------------------
app.get("/", (req, res) => {
  res.send("API is running");
});

// -------------------- Auth --------------------
app.post("/login", async (req, res) => {
  let success = false;
  const user = await Users.findOne({ email: req.body.email });

  if (!user || user.password !== req.body.password) {
    return res.status(400).json({ success, errors: "Invalid credentials" });
  }

  const token = jwt.sign({ user: { id: user._id } }, "secret_ecom");
  success = true;

  res.json({ success, token });
});

app.post("/signup", async (req, res) => {
  let success = false;
  const check = await Users.findOne({ email: req.body.email });

  if (check) {
    return res.status(400).json({ success, errors: "User already exists" });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) cart[i] = 0;

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();

  const token = jwt.sign({ user: { id: user._id } }, "secret_ecom");
  success = true;

  res.json({ success, token });
});

// -------------------- Products --------------------
app.get("/allproducts", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

app.get("/newcollections", async (req, res) => {
  const products = await Product.find({});
  res.json(products.slice(-8));
});

app.get("/popularinwomen", async (req, res) => {
  const products = await Product.find({});
  res.json(products.slice(0, 4));
});

app.post("/addproduct", async (req, res) => {
  const products = await Product.find({});
  const id = products.length ? products[products.length - 1].id + 1 : 1;

  const product = new Product({ ...req.body, id });
  await product.save();

  res.json({ success: true });
});

app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true });
});

// -------------------- Cart --------------------
app.post("/addtocart", fetchuser, async (req, res) => {
  const user = await Users.findById(req.user.id);
  user.cartData[req.body.itemId] += 1;
  await user.save();
  res.send("Added");
});

app.post("/removefromcart", fetchuser, async (req, res) => {
  const user = await Users.findById(req.user.id);
  if (user.cartData[req.body.itemId] > 0) {
    user.cartData[req.body.itemId] -= 1;
  }
  await user.save();
  res.send("Removed");
});

app.post("/getcart", fetchuser, async (req, res) => {
  const user = await Users.findById(req.user.id);
  res.json(user.cartData);
});

// -------------------- Server --------------------
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
