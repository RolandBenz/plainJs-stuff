/*1. Syntax Example */
/*1.1 Callback */
function displayer_1(o) {
  document.querySelector("#demo-1").innerHTML = o;
}
/*1.2 Promise - async turned fun() into Promise */
async function fun() {return "hello";}
/*1.3 Use */
fun().then(
  function(value) {displayer_1(value);},
  function(error) {displayer_1(error);}
);

/*2. Syntax Example */
async function display_2() {
  let promise_2 = new Promise(function (resolve, reject) {
    resolve("success");
  });
  document.querySelector("#demo-2").innerHTML = await promise_2;
}
/*2.3 Use */
display_2();

/*3. Async await - with setTimeout() */
async function display_3() {
  let promise_3 = new Promise(function(resolve) {
    setTimeout(function () {resolve("I waited for 3 seconds");}, 3000);
  });
  document.querySelector("#demo-3").innerHTML = await promise_3;
}
/*3.3 Use */
display_3();

/*4. Async await - with XMLHttpRequest() */
async function getFile() {
  let promise_4 = new Promise(function (resolve) {
    let request = new XMLHttpRequest();
    request.open('GET', "Promises, async_await.htm");
    request.onload = function() {
      if (request.status == 200) {
        resolve(request.response);
      } else {
        resolve("File not Found");
      }
    };
    request.send();
  });
  document.querySelector("#demo-4").innerHTML = await promise_4;
}
/*4.3 Use */
getFile();

