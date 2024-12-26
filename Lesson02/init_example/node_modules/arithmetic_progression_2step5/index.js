function arithmetic_progression (){
  let firstNumber;
  let step;
  let a_n_minus1;
  firstNumber = 2;
  step = 3;
  a_n_minus1 = step;
  console.log(a_n_minus1);
  for (let index = 1; index <= 100; index = index + 1) {
    console.log(a_n_minus1 + step);
    a_n_minus1 = a_n_minus1 + step;
  }

}
module.exports = { arithmetic_progression };