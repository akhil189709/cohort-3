let users = [
  {
    firstName: "Akhil",
    gender: "male",
    age: 23,
  },
  {
    firstName: "shubhi",
    gender: "female",
    age: 22,
  },
  {
    firstName: "gujju",
    gender: "male",
    age: 13,
  },
];
function filterObj(arr) {
  return arr.filter((items) => items.gender == "male" && items.age > 20)
  // let newArr = [];
  // for (let i = 0; i < arr.length; i++) {
  //   if (arr[i].age > 20 && arr[i].gender == "male") {
  //     newArr.push(arr[i])

  //   }
  // }
  // return newArr
}
const ans = filterObj(users);
console.log(ans);
