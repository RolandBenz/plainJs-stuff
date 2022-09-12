Cross-Origin Request Blocked
  - When trying to load a website inside another website you get an error like:
    - Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at 
      file:///C:/Users/41792/Documents/5)%20More-Code/3_Apps_PlainJs/Async/Promises,%20async_await.htm. 
      (Reason: CORS request not http)
  - But you can save a website locally, like I did with Promises,%20async_await.htm
    and use an http server to show the content inside your website, like I did in Asynchronous.html
    - Server
     - https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server
     -  3_Apps_PlainJs\Async> python3 -m http.server

Tutorial
  https://www.w3schools.com/Js/js_callback.asp
  https://www.w3schools.com/Js/js_asynchronous.asp
  https://www.w3schools.com/Js/js_promise.asp
  https://www.w3schools.com/Js/js_async.asp
  https://javascript.info/async
  https://javascript.info/callbacks
  https://javascript.info/promise-basics
  https://javascript.info/promise-chaining
  https://javascript.info/promise-error-handling
  https://javascript.info/promise-api
  https://javascript.info/promisify
  https://javascript.info/microtask-queue
  https://javascript.info/async-await

W3Schools
  1-JavaScript Callbacks
    - A callback is a function passed as an argument to another function.
    - The functions are simplified to show the callback syntax.
    - Where callbacks really shine are in asynchronous functions, 
      where one function has to wait for another function 
      (like waiting for a file to load).
  2-Asynchronous 
    - Waiting for a Timeout
        setTimeout(fun, 3000);
    - Waiting for Intervals
        setInterval()
    - Waiting for Files
        let request = new XMLHttpRequest();
  3-JavaScript Promise Object
    - "Producing code" is code that can take some time
      "Consuming code" is code that must wait for the result
      A Promise is a JavaScript object that links producing code and consuming code
    - A JavaScript Promise object can be:
        Pending
        Fulfilled
        Rejected
    - The Promise object supports two properties: state and result.
        While a Promise object is "pending" (working), the result is undefined.
        When a Promise object is "fulfilled", the result is a value.
        When a Promise object is "rejected", the result is an error object.
    - Syntax 
        let myPromise = new Promise(function (resolve, reject) {
          //"Producing Code" (May take some time)
          resolve("successful"); // when successful
          reject("error");  // when error
        });
        //"Consuming Code" (Must wait for a fulfilled Promise)
        myPromise.then(
          function (value) { /* code if successful */ },
          function (error) { /* code if some error */ }
        );
  4-JavaScript Async
    - async and await make promises easier to write
    - async makes a function return a Promise
      With async:
        async function fun() {
          return "hello";
        }
      With Promise:
        function fun() {
          return Promise.resolve("hello");
        }
      Use:
        fun().then(
          function (value) { /* code if successful */ },
          function (error) { /* code if some error */ }
        );
    - await makes a function wait for a Promise
        let value = await promise;

Javascript.info 
  1-Callbacks
      function loadScript(src, callback) {
        let script = document.createElement('script');
        script.src = src;
        // anonymous function gets the name callback with argument script
        script.onload = () => callback(script);
        document.head.append(script);
      }
      var s;
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', (script) => {
        alert(`Cool, the script ${script.src} is loaded`);
      });
  1.1-Handling errors
      function loadScript(src, callback) {
        let script = document.createElement('script');
        script.src = src;
        // It calls callback(null, script) for successful load and callback(error) otherwise.
        script.onload = () => callback(null, script);
        script.onerror = () => callback(new Error(`Script load error for ${src}`));
        document.head.append(script);
      }
      loadScript('/my/script.js', function(error, script) {
        if (error) {
          // handle error
        } else {
          // script loaded successfully
        }
      });
  1.2-Callback in callback
      - Nested 
      - After the outer loadScript is complete, the callback initiates the inner one(s). 
      - That’s sometimes called “callback hell” or “pyramid of doom.”
        loadScript('script1.js', function(script) {
          loadScript('script2.js', function(script) {
            loadScript('script3.js', function(script) {
              // ...continue after all scripts are loaded
            });
          });
        });
  1.3-Error handling and clearer nesting of callbacks
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
  2-Promises
    - Look at the Code in 2-promise.js and it becomes clear.
    - Real-life analogy for things we often have in programming:
      A singer producing a song that offers a subscription list, 
      and fans that get informed when song is produced.
      - A “producing code” that does something and takes time. 
        For instance, some code that loads the data over a network. That’s a “singer”.
      - A “consuming code” that wants the result of the “producing code” once it’s ready. 
        Many functions may need that result. These are the “fans”.
      - A promise is a special JavaScript object that links the “producing code” and the “consuming code” together. 
        In terms of our analogy: this is the “subscription list”. 
        The “producing code” takes whatever time it needs to produce the promised result, 
        and the “promise” makes that result available to all of the subscribed code when it’s ready.
      - The analogy isn’t terribly accurate, because JavaScript promises are more complex 
        than a simple subscription list: they have additional features and limitations. 
        But it’s fine to begin with.
    - The constructor syntax for a promise object is:
      let promise = new Promise(function (resolve, reject) {
        // function passed to the Promise is called the executor (the producing code, "singer")
        // its arguments resolve and reject are callbacks and provided by javaScript
        /*
          When the executor obtains the result, be it soon or late, doesn’t matter, 
          it should call one of these callbacks:
          - resolve(value) — if the job is finished successfully, with result value.
          - reject(error) — if an error has occurred, error is the error object.
        */
        /*
        The promise object returned by the new Promise constructor has these internal properties:
          state  —  initially "pending", then changes to either 
                    "fulfilled" when resolve is called or "rejected" when reject is called.
          result —  initially undefined, then changes to 
                    value when resolve(value) is called or error when reject(error) is called.
          summary:
                    new Promise(executor)   resolve(value)    reject(error)
          state:    pending                 fulfilled         rejected
          result:   undefined               value             error
        */
      });
    - Example with simple executor function with “producing code” that takes time (via setTimeout):
        let promise = new Promise(function (resolve, reject) {
          // the function is executed automatically when the promise is constructed
          // after 1 second: signal, that the job is done with the result "done"
          setTimeout(() => resolve("done"), 1000);
        });
        let promise = new Promise(function(resolve, reject) {
          // after 1 second: signal, that the job is finished with an error
          setTimeout(() => reject(new Error("Whoops!")), 1000);
        });
    - To summarize, the executor should perform a job (usually something that takes time) and 
      then call resolve or reject to change the state of the corresponding promise object.
      A promise that is either resolved or rejected is called “settled”, as opposed to an initially 
      “pending” promise.
    - The properties state and result of the Promise object are internal. 
      We can’t directly access them. We can use the methods .then/.catch/.finally for that. 
      A Promise object serves as a link between the executor (the “producing code” or “singer”) and the consuming functions (the “fans”), which will receive the result or error. 
      Consuming functions can be registered (subscribed) using the methods .then and .catch.
    - promise.then(
        function(result) { /* handle a successful result */ },
        function(error) { /* handle an error */ }
      );
      // reject runs the second function in .then
      promise.then(
        result => alert(result), // doesn't run
        error => alert(error) // shows "Error: Whoops!" after 1 second
      );
    - If we’re interested only in errors, then we can use null as the first argument: .then(null, errorHandlingFunction). 
      Or we can use .catch(errorHandlingFunction), which is exactly the same.
    - The idea of finally is to set up a handler for performing cleanup/finalizing 
      after the previous operations are complete.
      A finally handler “passes through” the result or error to the next suitable handler.
      new Promise((resolve, reject) => {
        setTimeout(() => resolve("value"), 2000);
      })
        .finally(() => alert("Promise ready")) // triggers first
        .then(result => alert(result)); // <-- .then shows "value"
      new Promise((resolve, reject) => {
        throw new Error("error");
      })
        .finally(() => alert("Promise ready")) // triggers first
        .catch(err => alert(err));  // <-- .catch shows the error
  2-1-Promise chaining
    - Look at the Code in 2-1-promises-chaining.js and it becomes clear.
    - Let’s return to the problem mentioned in the chapter callbacks: 
      we have a sequence of asynchronous tasks to be performed one after another — 
      for instance, loading scripts. How can we code it well?
    - The idea is that the result is passed through the chain of .then handlers.
    - The whole thing works, because every call to a .then returns a new promise, 
      so that we can call the next .then on it.
    - To be precise, a handler may return not exactly a promise, but a so-called “thenable” object – 
      an arbitrary object that has a method .then. 
      It will be treated the same way as a promise. 
        new Promise(function (resolve, reject) {
        setTimeout(() => resolve(1), 1000); // (*)
        }).then(function(result) { // (**)
          alert(result); // 1
          return result * 2;
        }).then(function(result) { // (***)
          alert(result); // 2
          return result * 2;
        }).then(function(result) {
          alert(result); // 4
          return result * 2;
        });
    - Load the scripts
        loadScript("/article/promise-chaining/one.js")
          .then(script => loadScript("/article/promise-chaining/two.js"))
          .then(script => loadScript("/article/promise-chaining/three.js"))
          .then(script => {
            // scripts are loaded, we can use functions declared there
            one();
            two();
            three();
          });
    - Load the scripts and have access to all variables in the scripts
        loadScript("/article/promise-chaining/one.js").then(script1 => {
          loadScript("/article/promise-chaining/two.js").then(script2 => {
            loadScript("/article/promise-chaining/three.js").then(script3 => {
              // this function has access to variables script1, script2 and script3
              one();
              two();
              three();
            });
          });
        });
  3-Async-Await
    - There’s a special syntax to work with Promises in a more comfortable fashion, 
      called “async/await”. It’s surprisingly easy to understand and use.
    - Async functions
      - The word “async” before a function means one simple thing: a function always returns a promise. 
        Other values are wrapped in a resolved promise automatically.
          async function f() {
            return 1;
          }
          f().then(alert); // 1
      - We could explicitly return a promise, which would be the same:
        async function f() {
          return Promise.resolve(1);
        }
        f().then(alert); // 1  
    - Await
      - So, async ensures that the function returns a promise, and wraps non-promises in it. 
        Simple enough, right? But not only that. 
        There’s another keyword, await, that works only inside async functions, and it’s pretty cool.
      - The keyword await makes JavaScript wait until that promise settles and returns its result.
          async function f() {
            let promise = new Promise((resolve, reject) => {
              setTimeout(() => resolve("done!"), 1000)
            });
            //The function execution “pauses” at the line (*) and resumes when the promise settles, 
            //with result becoming its result. So the code shows “done!” in one second.
            let result = await promise; // wait until the promise resolves (*)
            alert(result); // "done!"
          }
          f();