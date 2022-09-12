/*1. */
/*
  - The whole thing works, because every call to a .then returns a new promise, 
    so that we can call the next .then on it.
  - The implicit Promises returned by .then are resolved instantanious and next .then is triggered
*/
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 5000); // (*)
})
  .then(function (result) {
    // (**)
    alert("1.1: " + result); // 1
    return result * 2;
  })
  .then(function (result) {
    // (***)
    alert("1.2: " + result); // 2
    return result * 2;
  })
  .then(function (result) {
    alert("1.3: " + result); // 4
    return result * 2;
  });

/*2. Returning promises */
/*
  - Here the returned Promises contain an own setTimeout()
  - The explicit Promises returned by .then are only resolved after the defined time in SetTimeout 
    and next .then is triggered afterwards
*/
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(10), 5000);
})
  .then(function (result) {
    alert("2.1: " + result); // 10
    return new Promise((resolve, reject) => {
      // (*)
      setTimeout(() => resolve(result * 2), 5000);
    });
  })
  .then(function (result) {
    // (**)
    alert("2.2: " + result); // 20
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 5000);
    });
  })
  .then(function (result) {
    alert("2.3: " + result); // 40
  });

/*3. Load Script */
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
loadScript("resources/one.js")
  .then(function (script) {
    return loadScript("resources/two.js");
  })
  .then(function (script) {
    return loadScript("resources/three.js");
  })
  .then(function (script) {
    // use functions declared in scripts
    // to show that they indeed loaded
    one();
    two();
    three();
  });

/*3.1 Load Script and get access to the variable in all scripts*/
loadScript("resources/one.js").then((script1) => {
  loadScript("resources/two.js").then((script2) => {
    loadScript("resources/three.js").then((script3) => {
      // this function has access to variables script1, script2 and script3
      one();
      two();
      three();
    });
  });
});

/*4. Tenable objects*/
/*
  - To be precise, a handler may return not exactly a promise, but a so-called “thenable” object – 
    an arbitrary object that has a method .then. 
    It will be treated the same way as a promise.
*/
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert("4.: " + resolve); // function() { native code }
    // resolve with this.num*2 after the 1 second
    setTimeout(() => resolve(this.num * 2), 1000); // (**)
  }
}
new Promise((resolve) => resolve(100))
  .then((result) => {
    return new Thenable(result); // (*)
  })
  .then(function (result) {
    alert("4.1: " + result); // shows 200 after 1000ms, what resolve is called with
    return result * 2;
  })
  .then(alert); // shows 400 after 1000ms, alert is js alert, it shows what resolve is called with

/*5. Fetch - network request */
/*
  - Because of Cross-Origin Request Blocked run with server
      3_Apps_PlainJs\Async\javascrip.info> python -m http.server
  - In frontend programming, promises are often used for network requests. 
    So let’s see an extended example of that.
*/
/*5.1*/
/*
  - This makes a network request to the url and returns a promise. 
    The promise resolves with a response object when the remote server responds with headers, 
    but before the full response is downloaded.
  - To read the full response, we should call the method response.text(): 
    it returns a promise that resolves when the full text is downloaded from the remote server, 
    with that text as a result.
  - The code below makes a request to user.json and loads its text from the server.
*/
fetch("resources/user.json")
  // .then below runs when the remote server responds
  .then(function (response) {
    // response.text() returns a new promise that resolves with the full response text
    // when it loads
    return response.text();
  })
  .then(function (text) {
    // ...and here's the content of the remote file
    alert(text); // {"name": "ro", "isAdmin": true}
  });
/*5.2 */
/*
  - same as above, but response.json() parses the remote content as JSON
*/
fetch("resources/user.json")
  .then((response) => response.json())
  .then((user) => alert(user.name)); // ro, got user name

/*5.3 */
/*
  - let's do something with user.json
  - Look at the line (*): how can we do something after the avatar has finished showing and gets removed? 
    For instance, we’d like to show a form for editing that user or something else. As of now, there’s no way. 
*/
// Make a request for user.json
fetch("resources/user.json")
  // Load it as json
  .then((response) => response.json())
  // Make a request to GitHub
  .then((user) => fetch(`https://api.github.com/users/${user.name}`))
  // Load the response as json
  .then((response) => response.json())
  // Show the avatar image (githubUser.avatar_url) for 3 seconds (maybe animate it)
  .then((githubUser) => {
    let img = document.createElement("img");
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);
    setTimeout(() => img.remove(), 3000); // (*)
  });

/*5.4 */
/* 
  - That is, the .then handler in line (*) now returns new Promise, 
    that becomes settled only after the call of resolve(githubUser) in setTimeout (**). 
    The next .then in the chain will wait for that.
  - As a good practice, an asynchronous action should always return a promise. 
    That makes it possible to plan actions after it; even if we don’t plan to extend the chain now, 
    we may need it later.
*/
fetch("resources/users.json")
  .then((response) => response.json())
  .then((data) => {
    for (const user of data.users) {
      if (user.name === "iliakan") {
        return user;
      }
    }
  })
  .then((user) => fetch(`https://api.github.com/users/${user.name}`))
  .then((response) => response.json())
  .then(
    (githubUser) =>
      new Promise(function (resolve, reject) {
        // (*)
        let img = document.createElement("img");
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);
        setTimeout(() => {
          img.remove();
          resolve(githubUser); // (**)
        }, 3000);
      })
  )
  // triggers after 3 seconds
  .then((githubUser) => alert(`5.4 Finished showing ${githubUser.name}`));

/*5.5 */
/* 
  - Finally, we can split the code into reusable functions
*/
function loadJson_5_5(url) {
  return fetch(url)
    .then(response => response.json());
}
function loadGithubUser_5_5(name) {
  return loadJson_5_5(`https://api.github.com/users/${name}`);
}
function showAvatar_5_5(githubUser) {
  return new Promise(function(resolve, reject) {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);
    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}
// Use them:
loadJson_5_5('resources/user.json')
  .then(user => loadGithubUser_5_5(user.name))
  .then(showAvatar_5_5)
  .then(githubUser => alert(`5.5 Finished showing ${githubUser.login}`));
  // ...


/*6. Fetch json example from MDN */
const myList = document.querySelector("ul");
fetch("resources/products.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error, status = ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    for (const product of data.products) {
      const listItem = document.createElement("li");
      const nameElement = document.createElement("strong");
      nameElement.textContent = product.Name;
      const priceElement = document.createElement("strong");
      priceElement.textContent = `£${product.Price}`;
      listItem.append(
        nameElement,
        ` can be found in ${product.Location}. Cost: `,
        priceElement
      );
      myList.appendChild(listItem);
    }
  })
  .catch((error) => {
    const p = document.createElement("p");
    p.appendChild(document.createTextNode(`Error: ${error.message}`));
    document.body.insertBefore(p, myList);
  });
