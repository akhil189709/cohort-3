

const express = require("express");
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");

const users = [];
const JWT_SECRET = "Akhil@189709"



// Signup route
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (users.find((u) => u.username === username)) {
    res.status(400).json({ msg: "The user already exists!" });
    return;
  }

  users.push({ username, password });
  res.status(201).json({
    msg: "You have signed up successfully!"
  });
  console.log("Users array after signup:", users);
});

// Signin route
app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  const foundUser = users.find(
    (u) => u.username === username && u.password === password
  );

  if (foundUser) {
    const token = jwt.sign({
      username:username
    }, JWT_SECRET);

    res.json({ token });
  } else {
    res.status(403).json({ msg: "Invalid username or password!" });
  }
  console.log("Users array after signin:", users);
});

// Get user details
app.get("/me", (req, res) => {
  const token = req.headers.authorization; // Token sent in the Authorization header
  const decodedInformation = jwt.verify(token,JWT_SECRET)
  const recievdToken = decodedInformation.token;
  const foundUser = users.find((u) => u.token === recievdToken);
  
  if(foundUser) {
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
