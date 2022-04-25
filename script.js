const DISPLAY = document.querySelector('#display');
const OPERATOR_BUTTONS = document.querySelectorAll('.operator-button');
const NUMBER_BUTTONS = document.querySelectorAll('.number-button');

let opInProgress = false; // without this the result gets concatenated with new inputs on display
let firstRun = true;
let waitingForNumber = true; // so you can't press the same operator repeatedly
let waitingForOperator = false; // this prevents inputing numbers after '=' has been pressed
let decimalPressed = false; // this will prevent user from pressing decimal more than once

let num1;
let num2;
let result;
let operator;

// add event listener to operator buttons

for (let i = 0; i < OPERATOR_BUTTONS.length; i++) {
    OPERATOR_BUTTONS[i].addEventListener('click', () => {
        if (getDisplay() == 'err' && OPERATOR_BUTTONS[i].innerText != 'C') {
            return;
        }

        else {
            opInProgress = true;
            decimalPressed = false;
            if (OPERATOR_BUTTONS[i].innerText != '=') {
                waitingForOperator = false;
            }
            processInput(OPERATOR_BUTTONS[i].innerText);
        }
    });
}

// add event listener to numbers

for (let i = 0; i < NUMBER_BUTTONS.length; i++) {
    NUMBER_BUTTONS[i].addEventListener('click', () => {
        if (getDisplay() == 'err') {
            clearEverything();
            DISPLAY.innerText = `${NUMBER_BUTTONS[i].innerText}`;
        }

        else if (waitingForOperator) {
            return;
        }

        else {
            if (opInProgress) {
                DISPLAY.innerText = `${NUMBER_BUTTONS[i].innerText}`;
                opInProgress = false;
            }

            else {
                if (decimalPressed && NUMBER_BUTTONS[i].innerText == '.') {
                    return;
                }
                else {
                    if (NUMBER_BUTTONS[i].innerText == '.') {
                        decimalPressed = true;
                    }
                    DISPLAY.innerText += `${NUMBER_BUTTONS[i].innerText}`;
                }
            }
            waitingForNumber = false;
        }
    });
}

function getDisplay() {
    let x = parseFloat(DISPLAY.innerText);

    if (Number.isNaN(x)) {
        return 'err';
    }

    else {
        return x;
    }
}

function display(input) {
    DISPLAY.innerText = input;
}

function clearEverything() {
    DISPLAY.innerText = '';
    num1 = undefined;
    num2 = undefined;
    operator = undefined;
    result = undefined;
    firstRun = true;
    waitingForNumber = true;
    waitingForOperator = false;
    opInProgress = false;
}

function processInput(input) {
    if (input == 'C') {
        clearEverything();
        return;
    }

    else if (input == '-/+' && !waitingForNumber) {
        let i = parseInt(DISPLAY.innerText);
        i = -i;
        display(i);
        return;
    }

    else if (input == 'DEL' && !waitingForNumber) {
        opInProgress = false;
        let i = DISPLAY.innerText;
        display(i.slice(0, i.length - 1));
        return;
    }

    if (firstRun) {
        if (!num1 && !num2) {
            waitingForNumber = true;
            num1 = getDisplay();
            filterOperator(input);
        }

        else if (num1 && !num2) {
            if (waitingForNumber) {
                filterOperator(input);
            }

            else if (!waitingForNumber) {
                num2 = getDisplay();
                operate();
                filterOperator(input);
                firstRun = false;
                waitingForNumber = true;
            }
        }
    }

    else if (!firstRun) {
        if (waitingForNumber) {
            filterOperator(input);
        }

        else if (!waitingForNumber) {
            num1 = result;
            num2 = getDisplay();
            operate();
            filterOperator(input);
            waitingForNumber = true;
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
}

// this function doesn't let some buttons register as operators in global 'operator' variable

function filterOperator(input) {
    if (input == 'C' || input == '-/+' || input == 'DEL') {
        return;
    }

    else if (input == '=') {
        if (num1 == undefined || num2 == undefined || result == undefined || operator == undefined) {
            display('err');
        }

        else if (num2 == 0) {
            display('err');
        }

        else {
            waitingForOperator = true;
            display(result);
        }
    }

    else {
        operator = input;
    }
}

// results that are very long do not fit the display, need to format
// keyboard functionality
// round answers with long decimals so that they don’t overflow the screen