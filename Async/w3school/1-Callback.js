/*1.1 The Callback function */
function Displayer(o) {
  document.getElementById("demo-1").innerHTML = o;
}
/*1.2 THe function that gets a Callback function as argument*/
/* 
  - It delivers the arguments, in case the callback function has arguments, like (o) 
*/
function Calculator(num1, num2, Callback) {
  let sum = num1 + num2;
  Callback(sum);
}
/*1.3 The call of the function*/
/*
  - Four different ways to pass a Callback function
  - When you pass a function defined outside as an argument, remember not to use parenthesis.
    Displayer not Displayer()
  - The function can be defined when passed as an argument, either named or anonymous.
*/
Calculator(5, 5, Displayer);
Calculator(6, 6, function Displayer(o) {
  document.getElementById("demo-2").innerHTML = o;
});
Calculator(7, 7, function (o) {
  document.getElementById("demo-3").innerHTML = o;
});
Calculator(8, 8, (o) => {
  document.getElementById("demo-4").innerHTML = o;
});