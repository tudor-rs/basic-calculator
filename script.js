const DISPLAY = document.querySelector('#display');
const OPERATOR_BUTTONS = document.querySelectorAll('.operator-button');
const NUMBER_BUTTONS = document.querySelectorAll('.number-button');

let opInProgress = false;
let firstRun = true;
let num1;
let num2;
let result;
let operator;

for (let i = 0; i < OPERATOR_BUTTONS.length; i++) {
    OPERATOR_BUTTONS[i].addEventListener('click', () => {
        opInProgress = true;
        processInput(OPERATOR_BUTTONS[i].innerText);
    });
}

for (let i = 0; i < NUMBER_BUTTONS.length; i++) {
    NUMBER_BUTTONS[i].addEventListener('click', () => {
        if (opInProgress) {
            DISPLAY.innerText = '';
            DISPLAY.innerText = `${NUMBER_BUTTONS[i].innerText}`;
            opInProgress = false;
        }

        else {
            DISPLAY.innerText += `${NUMBER_BUTTONS[i].innerText}`;
        }
    });
}

function getDisplay() {
    return parseFloat(DISPLAY.innerText);
}

function display(input) {
    DISPLAY.innerText = input;
}

//

function processInput(input) {
    if (input == 'C') {
        DISPLAY.innerText = '';
        num1 = undefined;
        num2 = undefined;
        operator = undefined;
        result = undefined;
        firstRun = true;
        console.log (`cleaered everything`);
        return;
    }

    if (firstRun) {
        if (!num1 && !num2) {
            num1 = getDisplay();
            operator = input;
            console.log(`num1 = ${num1}, operator = ${operator}`);
        }

        else if (num1 && !num2) {
            num2 = getDisplay();
            operate();
            console.log(`num1 = ${num1}, num2 = ${num2}, operator = ${operator} result = ${result}`);
            operator = input;
            console.log(`new operator = ${operator}`);
            firstRun = false;
            console.log('--------------------------');
        }
    }

    else if (!firstRun) {
        num1 = result;
        num2 = getDisplay();

        operate();
        console.log(`num1 = ${num1}, num2 = ${num2}, operator = ${operator} result = ${result}`);
        operator = input;
        console.log(`new operator = ${operator}`);
    }
}

function operate() {
    if (operator == '+') {
        result = num1 + num2;
        display(result);
    }

    else if (operator == '-') {
        result = num1 - num2;
        display(result);
    }

    else if (operator == '*') {
        result = num1 * num2;
        display(result);
    }

    else if (operator == '/') {
        result = num1 / num2;
        display(result);
    }

    else if (operator == '=') {
        display(result);
    }
}