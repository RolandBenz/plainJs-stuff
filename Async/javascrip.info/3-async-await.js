console.log("Hi, says 3-async-await.js")

/*1. Async functions*/
/*
  - The word “async” before a function means one simple thing: a function always returns a promise. 
    Other values are wrapped in a resolved promise automatically.
  - We could explicitly return a promise, which would be the same.
*/
async function f_1_1() {
  return 1;
}
f_1_1().then(alert); // 1

async function f_1_2() {
  return Promise.resolve(1);
}
f_1_2().then(alert); // 1

/*2. Await functions*/
/*
  - So, async ensures that the function returns a promise, and wraps non-promises in it. 
  Simple enough, right? But not only that. 
  There’s another keyword, await, that works only inside async functions, and it’s pretty cool.
  - The keyword await makes JavaScript wait until that promise settles and returns its result.
  - Let’s emphasize: await literally suspends the function execution until the promise settles, 
    and then resumes it with the promise result. That doesn’t cost any CPU resources, 
    because the JavaScript engine can do other jobs in the meantime: execute other scripts, 
    handle events, etc.
*/
async function f_2_1() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });
  //The function execution “pauses” at the line (*) and resumes when the promise settles, 
  //with result becoming its result. So the code shows “done!” in one second.
  let result = await promise; // wait until the promise resolves (*)
  alert(result); // "done!"
}
f_2_1();

/*3. */
/*
  - Pretty clean and easy to read, right? Much better than before, with Promises chaining .then()
*/
async function showAvatar() {
  // read our JSON
  let response = await fetch('resources/user.json');
  let user = await response.json();
  // read github user
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();
  // show the avatar
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);
  // wait 3 seconds
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));
  img.remove();
  return githubUser;
}
showAvatar();

/*4. Await in modules or outside*/
/*
  - Modern browsers allow top-level await in modules
      // we assume this code runs at top level, inside a module
      let response = await fetch('resources/user.json');
      let user = await response.json();
      console.log(user);
  - if we’re not using modules, or older browsers must be supported, 
    there’s a universal recipe: wrapping into an anonymous async function.
*/
(async () => {
  let response = await fetch('resources/user.json');
  let user = await response.json();
  console.log(user);
})();

/*5. Await accepts Tenables */
/* 
  - Like promise.then, await allows us to use thenable objects (those with a callable then method). 
    The idea is that a third-party object may not be a promise, but promise-compatible: 
    if it supports .then, that’s enough to use it with await.
  - If await gets a non-promise object with .then, 
    it calls that method providing the built-in functions resolve and reject as arguments 
    (just as it does for a regular Promise executor). 
    Then await waits until one of them is called 
    (in the example below it happens in the line (*)) and then proceeds with the result.
*/
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // resolve with this.num*2 after 1000ms
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
}
async function f_5() {
  //await stops execution of function f_5 until resolve or reject are called in Thenable
  //i.e. line below waits for 1 second, then result becomes 2 and is shown in alert(result)
  let result = await new Thenable(1);
  alert(result); //2
}
f_5();

/*6. Async class methods */
class Waiter {
  async wait() {
    return await Promise.resolve(1);
  }
}
new Waiter()
  .wait()
  .then(alert); // 1 (this is the same as (result => alert(result)))

/*7. */
async function f_7() {
  try {
    let response = await fetch('/no-user-here');
    let user = await response.json();
  } catch(err) {
    // catches errors both in fetch and response.json
    alert(err);
  }
}
f_7();

/*8. */
/*
  - We can return response.json() instead of awaiting for it.
    Then the outer code would have to await for that promise to resolve. 
    In our case it doesn’t matter.
      if (response.status == 200) {
        return response.json(); // (3)
      }
*/
async function loadJson_8(url) { // (1)
  let response = await fetch(url); // (2)
  if (response.status == 200) {
    let json = await response.json(); // (3)
    return json;
  }
  throw new Error(response.status);
}
loadJson_8('https://javascript.info/no-such-user.json')
  .catch(alert); // Error: 404 (4)

/*9. */
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}
async function loadJson_9(url) {
  let response = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}
// Ask for a user name until github returns a valid user
async function demoGithubUser_9() {
  let user;
  while(true) {
    let name = prompt("Enter a name?", "iliakan");
    try {
      user = await loadJson_9(`https://api.github.com/users/${name}`);
      break; // no error, exit loop
    } catch(err) {
      if (err instanceof HttpError && err.response.status == 404) {
        // loop continues after the alert
        alert("No such user, please reenter.");
      } else {
        // unknown error, rethrow
        throw err;
      }
    }
  }
  alert(`Full name: ${user.name}.`);
  return user;
}
demoGithubUser_9();
