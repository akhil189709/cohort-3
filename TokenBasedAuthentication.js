const express = require("express");
const { tuple } = require("zod");
const app = express();
app.use(express.json());

const users = [];
//[{
//username: "Akhilkumar",
// password: "ilovekutkut"
//}]

///should return the randon long string
function generateTokens() {
  let options = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9",
  ];
  let token = "";
  for (let i = 0; i < 35; i++) {
    token += options[Math.floor(Math.random() * options.length)];
  }
  return token;
}

app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username: username,
    password: password
  });
  res.json({
    msg: `you are signed In`,
  });
  console.log("users array after the signup");
  console.log(users);
})

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  //this logic is to find the user
  let foundUser = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      foundUser = users[i];
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
  if (foundUser) {
    const token = generateTokens();
    foundUser.token = token;
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      msg:"Invalid username and password!"
    })
  }
  console.log("users array after the signin");
  console.log(users);

});

app.get("/me", (req, res) => {
  const token = req.headers.authorization; ///authorization can be modified according to ourselves!
  let foundUser = null;
  for (let i = 0; i < users.length; i++){
    if (users[i].token === token) {
      foundUser = users[i]
    }
  }
  if (foundUser) {
    res.json({
      username: foundUser.username,
      password:foundUser.password
    })
  } else {
    res.json({
      msg:"sorry the token in invalid"
    })
  }
})

app.listen(3000, () => {
  console.log("the server is running on the port 3000");
});
