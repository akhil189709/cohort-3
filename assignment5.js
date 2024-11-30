let user = {
  firstName: "Akhil",
  age: 23,
  gender: "male",
};
function greet(user) {
  console.log(`hello ${user.firstName} your age is ${user.age}`);
  if (user.age >= 18) {
    console.log(`${user.firstName} can vote`);
  } else {
    console.log(`${user.firstName} cannot vote`);
  }
}

greet(user);
