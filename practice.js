let arr = [2, 3, 1, 4];
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 2) {
    let temp = arr[i];
    arr[i] = arr[i + 1];
    arr[i + 1] = temp;
  }
}
console.log(arr);
