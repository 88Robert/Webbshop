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

let users = [];
if (fs.existsSync(usersFilePath)) {
  users = JSON.parse(fs.readFileSync(usersFilePath));
}

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email && user.password === password);

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

const products = JSON.parse(fs.readFileSync(productsFilePath));

app.get("/", (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});