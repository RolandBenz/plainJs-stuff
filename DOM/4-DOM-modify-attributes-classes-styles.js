/*
  - open the console to see the effect of the constant paragraph
  - run this script with the debugger to see the effects step-by-step
*/

/*1. Assign the first image element*/
const c_img = document.querySelector('img')
/*1.1 Write attribute into console*/
console.log(c_img.hasAttribute('src'))
console.log(c_img.getAttribute('src'))
/*1.2 Remove attribute, which removes the image*/
  //c_img.removeAttribute('src')
/*1.3 Add new attribute, which adds a new image*/
  //c_img.setAttribute('src', 'https://assets.digitalocean.com/articles/eng_javascript/dom/attributes-octopus.png');
c_img.src = 'https://assets.digitalocean.com/articles/eng_javascript/dom/attributes-octopus.png';

/*2. Select the first div*/
const c_div = document.querySelector('div');
/*2.1 Assign the warning class with .className property*/
/*
  - Note: If any classes already exist on the element, this will override them. 
          You can add multiple space delimited classes using the className property, 
          or use it without assignment operators to get the current value 
          of the class on the element.
*/
c_div.className = 'warning';

/*3. Select the second div by class name*/
const c_activeDiv = document.querySelector('.active');
/*3.1 add .hidden class with .add method of classList property*/
c_activeDiv.classList.add('hidden');                // Add the hidden class
/*3.2 remove .hidden class with .remove method of classList property*/
c_activeDiv.classList.remove('hidden');             // Remove the hidden class
/*3.1 toggle .hidden class with .toggle method of classList property*/
/*
  - if the class .hidden is in the classList, it will be removed
  - if the class .hidden is not in the classList, it will be added
*/
c_activeDiv.classList.toggle('hidden');             // Switch between hidden true and false
c_activeDiv.classList.toggle('hidden'); 
/*3.1 replace .active class with .replace method of classList property*/
c_activeDiv.classList.replace('active', 'warning'); // Replace active class with warning class

/*4. Select div */
const c_styleDiv = document.querySelector('#stylediv');
/*4.1 Apply style to div*/
/*
  - this will remove all existing inline styles from the element
*/
c_styleDiv.setAttribute('style', 'text-align: center');
/*4.2 Apply style to dive, use style attribute directly*/
/*
  - CSS properties are written in kebab-case, which is lowercase words separated by dashes. 
    However, kebab-case CSS properties cannot be used on the JavaScript style property, 
    as the dash - is used for subtraction. 
    Instead, they will be replaced with their camelCase equivalent, 
    which is when the first word is lowercase, and all subsequent words are capitalized. 
    In other words, instead of text-align use textAlign for the JavaScript style property.
*/
c_styleDiv.style.height = '100px';
c_styleDiv.style.width = '100px';
c_styleDiv.style.border = '2px solid black';
/*4.3 Make div into a circle and vertically center the text*/
c_styleDiv.style.borderRadius = '50%';
c_styleDiv.style.display = 'flex';
c_styleDiv.style.justifyContent = 'center';
c_styleDiv.style.alignItems = 'center';
