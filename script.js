const DISPLAY = document.querySelector('#display');
const OPERATOR_BUTTONS = document.querySelectorAll('.operator-button');
const NUMBER_BUTTONS = document.querySelectorAll('.number-button');

for (let i = 0; i < OPERATOR_BUTTONS.length; i++) {
    OPERATOR_BUTTONS[i].addEventListener('click', () => {
        console.log(OPERATOR_BUTTONS[i].innerText);
    });
}

for (let i = 0; i < NUMBER_BUTTONS.length; i++) {
    NUMBER_BUTTONS[i].addEventListener('click', () => {
        DISPLAY.innerText += `${NUMBER_BUTTONS[i].innerText}`;
    });
}