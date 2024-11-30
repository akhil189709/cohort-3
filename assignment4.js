function findSum(number) {
  let sum = 0;
  for (let i = 0; i <= number; i++) {
    sum += i;
  }
  return sum;

}
const ans = findSum(100);
console.log(`the sum till 100 is ${ans}`);
