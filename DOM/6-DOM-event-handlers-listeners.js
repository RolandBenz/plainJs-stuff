/*1. Inline Event Handler Attributes*/
const changeText_1 = () => {
	const p_1 = document.querySelector('#p-1');

	p_1.textContent = "I changed because of an inline event handler.";
}

/*2. Event Handler properties */
// Function to modify the text content of the paragraph
const changeText_2 = () => {
	const p_2 = document.querySelector('#p-2');
	p_2.textContent = "I changed because of an event handler property.";
}
// Add event handler as a property of the button element
const button_2 = document.querySelector('#button-2');
button_2.onclick = changeText_2;

/*3. Event Listeners */
// Function to modify the text content of the paragraph
const changeText_3 = () => {
	const p_3_1 = document.querySelector('#p-3-1');
	p_3_1.textContent = "I changed because of an event listener.";
}
const alertText_3 = () => {
	alert('I alerted because of an event listener.');
}
// Listen for click event
const button_3 = document.querySelector('#button-3');
button_3.addEventListener('click', changeText_3);
button_3.addEventListener('click', alertText_3);
// An anonymous function on an event listener
button_3.addEventListener('click', () => {
  const p_3_2 = document.querySelector('#p-3-2');
	p_3_2.textContent = "I changed because of an event listener, with anonymous function";
  alert('I alerted because of an event listener, with anonymous function');
});
// Remove alert function from button element
button_3.removeEventListener('click', alertText_3);

/*4. Test the key and code properties*/
/*
document.addEventListener('keydown', (event) => {
	console.log('key: ' + event.key);
	console.log('code: ' + event.code);
});
*/
document.addEventListener('keydown', function fun_4 (event) {
	console.log('key: ' + event.key);
	console.log('code: ' + event.code);
  // EventListener will be removed after waiting 5 seconds
  setTimeout(()=>{document.removeEventListener('keydown', fun_4)}, 5000)
});

/*5. Event Objects */
// Pass an event through to a listener
document.addEventListener('keydown', (event) => {
	const p_5 = document.querySelector('#p-5');
	// Set variables for keydown codes
	const a = 'KeyA';
	const s = 'KeyS';
	const d = 'KeyD';
	const w = 'KeyW';
	// Set a direction for each code
	switch (event.code) {
		case a:
			p_5.textContent = 'Left';
			break;
		case s:
			p_5.textContent = 'Down';
			break;
		case d:
			p_5.textContent = 'Right';
			break;
		case w:
			p_5.textContent = 'Up';
			break;
	}
});

/*6. The target property*/
const section_6 = document.querySelector('#selection-6');
// Print the selected target
section_6.addEventListener('click', (event) => {
	console.log(event.target)
  alert(event.target.id + "\n" + event.target.innerHTML)
});




