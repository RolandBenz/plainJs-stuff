/*1. Waiting for a Timeout */
function fun() {
  document.querySelector("#demo-1-1").innerHTML = "I waited for you 3 seconds";
}
setTimeout(fun, 3000);
setTimeout(()=>{
  document.querySelector("#demo-1-2").innerHTML = "I waited for you 6 seconds";
}, 6000);

/*2. Set Intervalls to update time */
setInterval(function () {
  let d = new Date();
  document.querySelector("#demo-2-1").innerHTML=
  d.getHours() + ":" +
  d.getMinutes() + ":" +
  d.getSeconds();
}, 1000);

/*3. Waiting for a file*/
function getFile(Callback) {
  let request = new XMLHttpRequest();
  request.withCredentials = true;
  request.open('GET', 'Promises, async_await.htm');
  request.onload = function() {
    if (request.status == 200) {
      Callback(this.responseText);
    } else {
      Callback("Error: " + request.status);
    }
  }
  request.send();
}
getFile(function (o) {
  document.querySelector("#demo-3-1").innerHTML = o;
}); 



