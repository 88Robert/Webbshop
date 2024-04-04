const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const usersFilePath = path.resolve(__dirname, "./context/users.json");
const productsFilePath = path.resolve(__dirname, "./context/product.json");
const orderFilePath = path.resolve(__dirname, "./context/orders.json");

let users = [];
if (fs.existsSync(usersFilePath)) {
  users = JSON.parse(fs.readFileSync(usersFilePath));
}

app.get("/orders", (req, res) => {
  if (fs.existsSync(orderFilePath)) {
    const orders = fs.readFileSync(orderFilePath);
    const parsedOrders = JSON.parse(orders);
    res.json(parsedOrders);
  } else {
    res.json([]);
  }
});

app.post("/orders", (req, res) => {
  const orderData = req.body;
  let orders = [];
  if (fs.existsSync(orderFilePath)) {
    orders = JSON.parse(fs.readFileSync(orderFilePath));
  }
  orders.push(orderData);
  fs.writeFileSync(orderFilePath, JSON.stringify(orders, null, 2));
  res.json({ message: "Order added successfully" });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({ message: "Login successful" });
});

app.post("/register", (req, res) => {
  const { email, password, username } = req.body;

  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    id: (users.length + 1).toString(),
    email,
    password,
    username,
  };

  users.push(newUser);

  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  res.status(201).json({ message: "User created successfully" });
});

app.get("/", (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath));
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
