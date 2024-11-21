const express = require("express");
const app = express();
app.use(express.json());

const users = [];

// Generate a random 35-character token
function generateTokens() {
  const options =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token = "";
  for (let i = 0; i < 35; i++) {
    token += options[Math.floor(Math.random() * options.length)];
  }
  return token;
}

// Signup route
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (users.find((u) => u.username === username)) {
    res.status(400).json({ msg: "The user already exists!" });
    return;
  }

  users.push({ username, password });
  res.status(201).json({ msg: "You have signed up successfully!" });
  console.log("Users array after signup:", users);
});

// Signin route
app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  const foundUser = users.find(
    (u) => u.username === username && u.password === password
  );

  if (foundUser) {
    const token = generateTokens();
    foundUser.token = token;
    res.json({ token });
  } else {
    res.status(403).json({ msg: "Invalid username or password!" });
  }

  console.log("Users array after signin:", users);
});

// Get user details
app.get("/me", (req, res) => {
  const token = req.headers.authorization; // Token sent in the Authorization header

  const foundUser = users.find((u) => u.token === token);

  if (foundUser) {
    res.json({
      username: foundUser.username,
      password: foundUser.password,
    });
  } else {
    res.status(401).json({ msg: "Invalid or missing token!" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
