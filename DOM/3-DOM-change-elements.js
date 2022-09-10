/*
  - open the console to see the effect of the constant paragraph
  - run this script with the debugger to see the effects step-by-step
*/
/*1. Create p Element*/
const paragraph = document.createElement('p');
console.log(paragraph)
console.log(paragraph.outerHTML)
/*1.1 Change property textContent */
paragraph.textContent = "I'm a brand new paragraph.";
console.log(paragraph)
console.log(paragraph.outerHTML)
/*1.2 Change property innerHTML */
/*
  - Note: While this will work and is a common method of adding content to an element, 
    there is a possible cross-site scripting (XSS) risk associated with using the innerHTML method, 
    as inline JavaScript can be added to an element. 
    Therefore, it is recommended to use textContent instead, which will strip out HTML tags. 
*/
paragraph.innerHTML = "I'm a paragraph with <strong>bold</strong> text.";
console.log(paragraph)
console.log(paragraph.outerHTML)
/*2. Create li element*/
const todoList = document.querySelector('ul');
const newTodo = document.createElement('li');
/*2.1 Change property textContent */
newTodo.textContent = 'Do homework';
/*2.2 Append, i.e. Add new todo to the end of the list*/
todoList.appendChild(newTodo);
/*3. Create li element*/
const anotherTodo = document.createElement('li');
/*3.1 Change property textContent */
anotherTodo.textContent = 'Pay bills';
/*3.2 Add new todo to the beginning of the list*/
todoList.insertBefore(anotherTodo, todoList.firstElementChild);
/*4. Create li element*/
const modifiedTodo = document.createElement('li');
/*4.1 Change property textContent */
modifiedTodo.textContent = 'Feed the dog';
/*4.2 Replace existing li element with modified li-element*/
todoList.replaceChild(modifiedTodo, todoList.children[2]);
/*5. Remove li elements*/
todoList.removeChild(todoList.lastElementChild);
todoList.children[1].remove();





