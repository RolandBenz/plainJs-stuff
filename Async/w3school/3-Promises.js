/*1 Syntax Example */
/*1.1 Callback */
function displayer_1(o) {
  document.querySelector("#demo-1").innerHTML = o;
}
/*1.2 Promise - returns OK or Error */
let promise_1 = new Promise(function (resolve, reject) {
  let x = 0;
  // some code (try to change x to 5)
  if (x == 0) {
    resolve("OK");
  } else {
    reject("Error");
  }
});
/*1.3 Use */
promise_1.then(
  // value equals what you put into resolve(value)
  // error equals what you put into reject(error)
  function(value) {displayer_1(value);},
  function(error) {displayer_1(error);}
);

/*2. Promise and setTimeout*/
/*2.2 Promise */
const promise_2 = new Promise(function (resolve, reject) {
  setTimeout(function () { resolve("I waited 3 seconds"); }, 3000);
});
/*2.3 Use */
promise_2.then(function (value) {
  // value equals what you put into resolve(value)
  document.querySelector("#demo-2").innerHTML = value;
});

/*3. Promise and XMLHttpRequest, Waiting for a file to load*/
/*3.1 Callback */
function displayer_3(o) {
  document.querySelector("#demo-3").innerHTML = o;
}
/*3.2 Promise and XMLHttpRequest */
let promise_3 = new Promise(function (resolve, reject) {
  let request = new XMLHttpRequest();
  request.open('GET', "Promises, async_await.htm");
  request.onload = function() {
    if (request.status == 200) {
      resolve(request.response);
    } else {
      reject("File not Found");
    }
  };
  request.send();
});
/*3.3 Use */
promise_3.then(
  // value equals what you put into resolve(value)
  // error equals what you put into reject(error)
  function (value) {displayer_3(value);},
  function (error) {displayer_3(error);}
);
