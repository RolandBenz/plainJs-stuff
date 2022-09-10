Git commit message
  Tutorial from: https://www.digitalocean.com/community/tutorial_series/understanding-the-dom-document-object-model and https://www.digitalocean.com/community/tutorials/introduction-to-the-dom and https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model and https://www.digitalocean.com/community/tutorial_series/how-to-code-in-javascript and https://alvarotrigo.com/blog/change-css-javascript/

Tutorials	
  https://www.digitalocean.com/community/tutorial_series/understanding-the-dom-document-object-model
	https://www.digitalocean.com/community/tutorials/introduction-to-the-dom
  https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
  https://www.digitalocean.com/community/tutorial_series/how-to-code-in-javascript
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