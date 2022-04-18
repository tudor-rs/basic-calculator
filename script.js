const DISPLAY = document.querySelector('#display');
const OPERATOR_BUTTONS = document.querySelectorAll('.operator-button');
const NUMBER_BUTTONS = document.querySelectorAll('.number-button');

let opInProgress = false;
let firstRun = true;
let waitingForNumber = true;
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

        waitingForNumber = false;
    });
}

function getDisplay() {
    return parseFloat(DISPLAY.innerText);
}

function display(input) {
    DISPLAY.innerText = input;
}

function processInput(input) {
    if (input == 'C') {
        DISPLAY.innerText = '';
        num1 = undefined;
        num2 = undefined;
        operator = undefined;
        result = undefined;
        firstRun = true;
        waitingForNumber = true;
        console.log(`cleaered everything`);
        return;
    }

    else if (input == '-/+') {
        let i = parseInt(DISPLAY.innerText);
        i = -i;
        display(i);
        return;
    }

    if (firstRun) {
        if (!num1 && !num2) {
            waitingForNumber = true;

            num1 = getDisplay();
            operator = input;
            console.log(`num1 = ${num1}, operator = ${operator}`);
        }

        else if (num1 && !num2) {
            if (waitingForNumber) {
                operator = input;
                console.log(`new operator = ${operator}`);
            }

            else if (!waitingForNumber) {
                num2 = getDisplay();
                operate();
                console.log(`num1 = ${num1}, num2 = ${num2}, operator = ${operator} result = ${result}`);
                operator = input;
                console.log(`new operator = ${operator}`);
                firstRun = false;
                waitingForNumber = true;
                console.log('--------------------------');
            }
        }
    }

    else if (!firstRun) {
        if (waitingForNumber) {
            operator = input;
            console.log(`new operator = ${operator}`);
        }

        else if (!waitingForNumber) {
            num1 = result;
            num2 = getDisplay();
            operate();
            console.log(`num1 = ${num1}, num2 = ${num2}, operator = ${operator} result = ${result}`);
            operator = input;
            console.log(`new operator = ${operator}`);
            waitingForNumber = true;
            console.log(`waiting for number, ${waitingForNumber}`);
        }
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


// when pressing plus sign repeatedly it keeps adding up the numbers [done]
// results that are very long do not fit the display, need to format
// backspace functionality
// shift buttons upwards (equals to be bottom right)
// delete ? button

// -/+ functinoality? need to decide how it is going to behave.