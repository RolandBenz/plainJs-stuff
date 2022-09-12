/*1. Callback */
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));
  document.head.append(script);
}

/*2. Promise */
/*2.1 */
/*
  - loadScript returns a Promise, which after its state changed,
    when all the work is done, can be accessed with .then()
  - the work is finished when .onload or .on error is trigged, 
    which initiates the state change of the Promise.
*/
function loadScript(src) {
  return new Promise(function (resolve, reject) {
    let script = document.createElement("script");
    script.src = src;
    //the names are irrelevant, only the fact that an object is put
    //inside the functions resolve() or reject() is what runs the magic.
    //when .onload is triggered, within an anonymous function resolve(script) is carried out
    //By the way, just script.onload = resolve(script); would also work
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));
    document.head.append(script);
  });
}
/*2.2 Promise Usage*/
let promise = loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"
);
/*
  - the name of the arguments (script) and (error) are irrelevant.
    - only what's put inside the function calls resolve() or reject() is what runs the magic
    - and within .then() only the position of the argument runs the magic
      - the first argument gets the object value of resolve(value), name irrelevant
      - the second argument gets the object error of reject(error), name irrelevant
*/
promise.then(
  (script) => alert(`${script.src} is loaded!`),
  (error) => alert(`Error: ${error.message}`)
);
promise.then((script) => alert("Another handler..."));

/*3. Delay with a Promise */
function delay_3(ms) {
  //resolve is called without arguments, within setTimeout(). 
  //We don’t return any value from delay, just ensure the delay.
  //After resolve is called within setTimeout, the state of the Promise changes
  //and .then() gets triggered
  return new Promise((resolve) => setTimeout(resolve, ms));
}
delay_3(3000).then(() => alert("runs after 3 seconds"));

/*Animated circle*/
/*4.1 Animated circle with a Promise*/
/*
  - showCircle() returns a Promise, which after the state change,
    when work is done, can be accessed with .then()
*/
function go_4_1() {
  showCircle_1(450, 150, 150).then((div) => {
    div.classList.add("message-ball");
    div.append("Hello, world!");
  });
}
function showCircle_1(cx, cy, radius) {
  let div = document.createElement("div");
  div.style.width = 0;
  div.style.height = 0;
  div.style.left = cx + "px";
  div.style.top = cy + "px";
  div.className = "circle";
  document.body.append(div);
  // Here the Promise runs setTimeout()
  // setTimeout() waits and runs an anonymous function, 
  // it sets the style, and adds an EventListener which listens, 
  // when the css-transition is finished. When triggered, it
  // removes the EventListener and calls resolve(div).
  // which triggeres the state change of the Promise. This triggeres showCircle.then()
  return new Promise((resolve) => {
    setTimeout(() => {
      div.style.width = radius * 2 + "px";
      div.style.height = radius * 2 + "px";
      div.addEventListener("transitionend", function handler() {
        div.removeEventListener("transitionend", handler);
        resolve(div);
      });
    }, 5000);
  });
}

/*4.2 Animated Circle with Callback */
/*
  - Here showCircle is called with an anonoumous callback function with argument div
  - it is directly triggered inside setTimeout()
*/
function go_4_2() {
  showCircle_2(150, 150, 100, (div) => {
    div.classList.add("message-ball");
    div.append("Hello, world!");
  });
}
function showCircle_2(cx, cy, radius, callback) {
  let div = document.createElement("div");
  div.style.width = 0;
  div.style.height = 0;
  div.style.left = cx + "px";
  div.style.top = cy + "px";
  div.className = "circle";
  document.body.append(div);
  setTimeout(() => {
    div.style.width = radius * 2 + "px";
    div.style.height = radius * 2 + "px";
    div.addEventListener("transitionend", function handler() {
      div.removeEventListener("transitionend", handler);
      callback(div);
    });
  }, 5000);
}
