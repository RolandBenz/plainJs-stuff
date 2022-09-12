/*1. Syntax */
/*1.1 without callback*/
function loadScript_1(src) {
  // creates a <script> tag and append it to the page
  // this causes the script with given src to start loading and run when complete
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}
// load and execute the script at the given path
loadScript_1('script.js');
// the code below loadScript
// doesn't wait for the script loading to finish
// ...
// script_newFunction(); // no such function!

/*2. Syntax */
/*2.1 with callback*/
function loadScript_2(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  // anonymous function gets the name callback with argument script
  script.onload = () => callback(script);
  document.head.append(script);
}
loadScript_2('script.js', function (script) {
  // the callback runs after the script is loaded
  // script_newFunction(); // so now it works
  //...
});

/*3. Runnable example*/
/*3.1 with callback */
function loadScript_3(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  // anonymous function gets the name callback with argument script
  script.onload = () => callback(script);
  document.head.append(script);
}
var s;
loadScript_3('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', (script) => {
  alert(`Cool, the script ${script.src} is loaded`);
  alert( _ ); // _ is a function declared in the loaded script
  s=script;
  console.log(s);
});

/*4. Callback in callback*/
/*4.1 with callback */
function loadScript_4(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  // anonymous function gets the name callback with argument script
  script.onload = () => callback(script);
  document.head.append(script);
}
/*4.2 
  - Nested 
  - After the outer loadScript is complete, the callback initiates the inner one(s). 
  - That’s sometimes called “callback hell” or “pyramid of doom.”
*/
loadScript_4('script1.js', function(script) {
  loadScript_4('script2.js', function(script) {
    loadScript_4('script3.js', function(script) {
      // ...continue after all scripts are loaded
    });
  });
});

/*5. Handling errors */
/*
  - The convention is:
    - The first argument of the callback is reserved for an error if it occurs. 
      Then callback(err) is called.
    - The second argument (and the next ones if needed) are for the successful result. 
      Then callback(null, result1, result2…) is called.
*/
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  //It calls callback(null, script) for successful load and callback(error) otherwise.
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));
  document.head.append(script);
}
loadScript('script.js', function(error, script) {
  if (error) {
    // handle error
  } else {
    // script loaded successfully
  }
});

/*6. With handling errors and clearer nesting of callbacks*/
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  //It calls callback(null, script) for successful load and callback(error) otherwise.
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));
  document.head.append(script);
}
function handleError(error){ 
  //handle the error
  console.log("handleError:\n " + error)
}
loadScript('1.js', step1);
function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', step2);
  }
}
function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('3.js', step3);
  }
}
function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...continue after all scripts are loaded (*)
  }
}
