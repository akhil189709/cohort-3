function filterArr(arr) {
  let newArr = [];

  newArr.push(arr.filter((items) => items % 2 == 0));

  return newArr;
}
let Arr = [1, 2, 3, 4, 5, 6, 6, 7, 8, 8];
const ans = filterArr(Arr);
console.log(ans);
