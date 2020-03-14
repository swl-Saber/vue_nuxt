function feibo(index) {
  if (index <= 2) {
    return 1;
  }
  return feibo(index - 1) + feibo(index - 2)
}
console.log(feibo(1));
console.log(feibo(2));
console.log(feibo(5));
console.log(feibo(6));
console.log(feibo(15));
