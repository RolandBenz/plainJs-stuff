JavaScript overview
	https://plainjs.com/javascript/
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_Overview
  https://javascript.info/
	https://www.digitalocean.com/community/tutorial_series/how-to-code-in-javascript

JavaScript APIs
	DOM
		https://www.digitalocean.com/community/tutorial_series/understanding-the-dom-document-object-model
		https://www.digitalocean.com/community/tutorials/introduction-to-the-dom
  	https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model

Javascript topics
    https://alvarotrigo.com/blog/change-css-javascript/


DOM
	- How To Access Elements in the DOM
			Gets 								Selector Syntax 	Method
			ID 										#demo 						getElementById()
			Class 								.demo 						getElementsByClassName()
			Tag 									demo 							getElementsByTagName()
			Selector (single) 											querySelector()
			Selector (all) 													querySelectorAll()
	- How To Traverse the DOM
		- The document object is the root of every node in the DOM. 
			This object is actually a property of the window object, which is the global, 
			top-level object representing a tab in the browser. 
			The window object has access to such information as the toolbar, 
			height and width of the window, prompts, and alerts. 
			The document consists of what is inside of the inner window.
		- Console 
				- Enter 'document' into the console and you see all the properties you can access
					with the dot notation e.g. document.all shows a collection of all element tags.
				- You can access an item of a collection with item() or [].
				- You can also access variables and constants of a script which run with the html 
				>> document
				>> document.all
				>> document.all.item(8).parentNode
				>> document.all.item(11).firstElementChild.style.background = 'yellow';
				>> document.body.children[3].lastElementChild.style.background = 'fuchsia';
		- Properties used to traverse the Dom
				Property 											Node 						Node Type
					document 											#document 			DOCUMENT_NODE
					document.documentElement 			html 						ELEMENT_NODE
					document.head 								head 						ELEMENT_NODE
					document.body 								body 						ELEMENT_NODE
				Property 									Gets
					parentNode 								Parent Node
					parentElement 						Parent Element Node
				Property 									Gets
					childNodes 								Child Nodes (with the indentation between elements in html file)
					firstChild 								First Child Node
					lastChild 								Last Child Node
					children 									Element Child Nodes (without the indentation between elements in html file)
					firstElementChild 				First Child Element Node
					lastElementChild 					Last Child Element Node
				Property 									Gets
					previousSibling 					Previous Sibling Node
					nextSibling 							Next Sibling Node
					previousElementSibling 		Previous Sibling Element Node
					nextElementSibling 				Next Sibling Element Node
	- How To Make Changes to the DOM
		- How to create new nodes and insert them into the DOM, replace existing nodes, and remove nodes.
		- Creating New Nodes
				Property/Method 				Description
					createElement() 				Create a new element node
					createTextNode() 				Create a new text node
					node.textContent 				Get or set the text content of an element node
					node.innerHTML 					Get or set the HTML content of an element
		- Inserting Nodes into the DOM
				Property/Method 				Description
					node.appendChild() 			Add a node as the last child of a parent element
					node.insertBefore() 		Insert a node into the parent element before a specified sibling node
					node.replaceChild() 		Replace an existing node with a new node
		- Removing Nodes from the DOM
				Method 									Description
					node.removeChild() 			Remove child node
					node.remove() 					Remove node		
	- How To Modify Attributes, Classes, and Styles in the DOM
		- Modifying Attributes
				Method 								Description 																					Example
					hasAttribute() 				Returns a true or false boolean 											element.hasAttribute('href');
					getAttribute() 				Returns the value of a specified attribute or null 		element.getAttribute('href');
					setAttribute() 				Adds or updates value of a specified attribute 				element.setAttribute('href', 'index.html');
					removeAttribute() 		Removes an attribute from an element 									element.removeAttribute('href');
		- Modifying Classes
				Method/Property 			Description 														Example
					className 						Gets or sets class value 								element.className;
					classList.add() 			Adds one or more class values 					element.classList.add('active');
					classList.toggle() 		Toggles a class on or off 							element.classList.toggle('active');
					classList.contains() 	Checks if class value exists 						element.classList.contains('active');
					classList.replace() 	Replace existing with new class value 	element.classList.replace('old', 'new');
					classList.remove() 		Remove a class value 										element.classList.remove('active');
		- Modifying Styles
			- The style property represents the inline styles on an HTML element.
					element.style.cssProperty = 'value'
					div.setAttribute('style', 'cssProperty: value', 'css-property: value');
			- How To Change CSS With JavaScript [With Examples] 
				- https://alvarotrigo.com/blog/change-css-javascript/
				- 
	- Understanding Events
		- Event Handlers and Event Listeners
			- An event handler is a JavaScript function that runs when an event fires.
			- An event listener attaches a responsive interface to an element, 
				which allows that particular element to wait and “listen” for the given event to fire.
		- Inline Event Handler Attributes
			- Inline event handlers are a straightforward way to begin understanding events, 
				but they generally should not be used beyond testing and educational purposes.
			- <button id="button-1" onclick="changeText()" type="button">Click me</button>
		- Event Handler properties
			- The event handler property is slightly more maintainable than the inline handler, 
				but it still suffers from some of the same hurdles.
			- const button_2 = document.querySelector('#button-2')
				button_2.onclick = changeText_2
		- Event Listeners
			- The latest addition to JavaScript event handlers are event listeners.
			-	Every event listener drops the on from the word. Eg. onclick becomes click.
			- At first look, event listeners seem very similar to event handler properties, 
				but they have a few advantages. We can set multiple event listeners on the same element
			- const button_3 = document.querySelector('#button-3');
				button_3.addEventListener('click', changeText_3);
				button_3.addEventListener('click', alertText_3);
			- You can remove them
				button_3.removeEventListener('click', alertText_3);
			- You can use addEventListener() on the document and window object.
		- Common Events
			- Mouse Events
				Event 									Description
					click 									Fires when the mouse is pressed and released on an element
					dblclick 								Fires when an element is clicked twice
					mouseenter 							Fires when a pointer enters an element
					mouseleave 							Fires when a pointer leaves an element
					mousemove 							Fires every time a pointer moves inside an element
			- Form Events
				Event 									Description
					submit 									Fires when a form is submitted
					focus 									Fires when an element (such as an input) receives focus
					blur 										Fires when an element loses focus
			- Keyboard Events
				- While keydown will acknowledge every key that is pressed, 
					keypress will omit keys that do not produce a character, 
					such as SHIFT, ALT, or DELETE.
				- If a parameter, known as an event object, is passed through to the event listener, 
					we can access more information about the action that took place. 
					Two properties that pertain to keyboard objects include key and code.
					In the second example, the eventListener is removed after 5 seconds.
						document.addEventListener('keydown', (event) => {
							console.log('key: ' + event.key);
							console.log('code: ' + event.code);
						});
						document.addEventListener('keydown', function fun_4 (event) {
							console.log('key: ' + event.key);
							console.log('code: ' + event.code);
							setTimeout(()=>{document.removeEventListener('keydown', fun_4)}, 5000)
						});
				Event 									Description
					keydown 								Fires once when a key is pressed
					keyup 									Fires once when a key is released
					keypress 								Fires continuously while a key is pressed
				Property 								Description 																	Example
					key 										Represents the character name 								a
					code 										Represents the physical key being pressed 		KeyA
			- Event Objects
				- The Event object consists of properties and methods that all events can access. 
					In addition to the generic Event object, each type of event has its own extensions, 
					such as KeyboardEvent and MouseEvent.
				- The Event object is passed through a listener function as a parameter. 
					It is usually written as (event) or (e).
				- One of the most frequently used event properties is the target property.
					Using event.target, we can place one event listener on the outer container element 
					and get the most deeply nested element.
						const section_6 = document.querySelector('#selection-6');
						section_6.addEventListener('click', (event) => {
							console.log(event.target)
							alert(event.target.id + "\n" + event.target.innerHTML)
						});


Async
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


