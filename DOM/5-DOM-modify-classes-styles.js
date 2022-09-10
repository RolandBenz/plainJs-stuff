/*1. & 2. Change CSS inline properties with JavaScript*/
const button_1 = document.querySelector('#button-1');
button_1.addEventListener('click', () => {
    const element = document.querySelector('.demo-1');
    element.style.backgroundColor = 'red';
});

const button_2 = document.querySelector('#button-2');
button_2.addEventListener('click', () => {
    const element = document.querySelector('.demo-2');
    element.style.color = 'green';
});

/*3. Set Multiple CSS Styles At The Same Time */
/*
  - You can actually pass a string value to the cssText property to set multiple CSS styles at once.
  - Even better, we can use template literals kind of strings to keep them separate 
    in different lines as you do in your stylesheets.
*/
// Defining all our CSS styles
const styles_3 = `
    display: block;
    width: 80%;
    background-color: lightskyblue;
    border: 2px;
    font-size: 5em;
    color: white;
    margin: 20px;
    padding-left: 10px;
    padding-bottom: 10px;
    border: 2px solid black;
`;
const button_3 = document.querySelector('#button-3');
button_3.addEventListener('click', () => {
  const element = document.querySelector('.demo-3');
  element.style.cssText = styles_3;
});

/*4. Change CSS class in JavaScript */
const buttonAdd_4 = document.querySelector('#button-4-1');
buttonAdd_4.addEventListener('click', addClass_4);
function addClass_4(){
  const element = document.querySelector('.demo-4');
  element.classList.add('new-class-4');
}

const buttonRemove_4 = document.querySelector('#button-4-2');
buttonRemove_4.addEventListener('click', removeClass_4);
function removeClass_4(){
  const element = document.querySelector('.demo-4');
  element.classList.remove('new-class-4');
}

const buttonToggle_4 = document.querySelector('#button-4-3');
buttonToggle_4.addEventListener('click', toggleClass_4);
function toggleClass_4(){
  const element = document.querySelector('.demo-4');
  element.classList.toggle('new-class-4');
}

/*5. Change CSS stylesheets dynamically */
/*
  -Let's say that now you do not want to add inline styles to an element or apply a class to it. 
    Instead, you want to apply a change at the stylesheet level.
  - Does not work with css file, only with style in header
    Uncaught DOMException: CSSStyleSheet.cssRules getter: Not allowed to access cross-origin stylesheet
*/
var button_5 = document.querySelector('#button-5');
button_5.addEventListener('click', modifyStyleSheet_5);

function modifyStyleSheet_5(){
  // Getting the stylesheet
  //const stylesheet = document.styleSheets[1];
  const stylesheet = document.querySelector('style#demo').sheet
  console.log(stylesheet);
  let elementRules;
  // looping through all its rules and getting your rule
  for(let i = 0; i < stylesheet.cssRules.length; i++) {
    if(stylesheet.cssRules[i].selectorText === '.element-5') {
      elementRules = stylesheet.cssRules[i];
    }
  }
  // modifying the rule in the stylesheet
  elementRules.style.setProperty('background', 'rgb(110, 255, 153)');
}

/*6. Append And Remove CSS stylesheets dynamically*/
const button_6 = document.querySelector("#button-6");
// The content of the stylesheet
const styleSheetContent_6 = `
    .demo-6{
        margin-top: 20px;
        background:red;
    }
`;
button_6.addEventListener("click", () => {
    appendStyleSheet_6("demo-6", styleSheetContent_6);
});
// Appends CSS content to the head of the site
function appendStyleSheet_6(id, content) {
    if (!document.querySelector("#" + id)) {
        var head = document.head || document.getElementsByTagName("head")[0];
        console.log(head);
        head.appendChild(createStyleElement_6(id, content));
    }
}
function createStyleElement_6(id, content) {
    var style = document.createElement("style");
    style.type = "text/css";
    style.id = id;
    if (style.styleSheet) {
        style.styleSheet.cssText = content;
    } else {
        style.appendChild(document.createTextNode(content));
    }
    return style;
}

/*7. Overwrite CSS !important style with JavaScript */
const button_7 = document.querySelector("#button-7");
button_7.addEventListener("click", overwriteImportant_7);
function overwriteImportant_7(){
    var el = document.querySelector('.demo-7');
    el.style.setProperty('background-color', 'lightgreen', 'important');
}
