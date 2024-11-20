const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
const JWT_SECRET = "Akhil@189709";
const users = [];

app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username: username,
    password: password,
  });
  res.json({
    msg: `you are signed In`,
  });
  console.log("users array after the signup");
  console.log(users);
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  //this logic is to find the user
  let isUser = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      isUser = users[i];
    }
  }
  // //the above logic is same as below!
  //   const foundUser = users.find(function (u) {
  //     if (u.username === username && u.password === password) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  // });
  if (isUser) {
    const token = jwt.sign(
      ///creating the jwt using the username! and the secret key given here!
      {
        username: username,
      },
      JWT_SECRET
    );
    res.json({
      token: token,
    }); 
  } else {
    res.status(403).json({
      msg: "Invalid username and password!",
    });
  }
  console.log("users array after the signin");
  console.log(users);
});

app.get("/me", (req, res) => {
  const token = req.headers.authorization; ///authorization can be modified according to ourselves!
  const decodedInformation = jwt.verify(token, JWT_SECRET); //this is converting the jwt to the username
  const username = decodedInformation.username;

  let isUser = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      isUser = users[i];
    }
  }
  if (isUser) {
    res.json({
      username: isUser.username,
      password: isUser.password,
    });
  } else {
    res.json({
      msg: "sorry the token in invalid",
    });
  }
});

app.listen(3000, () => {
  console.log("the sever is running on the port 3000");
});
