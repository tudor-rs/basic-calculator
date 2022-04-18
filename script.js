const DISPLAY = document.querySelector('#display');
const OPERATOR_BUTTONS = document.querySelectorAll('.operator-button');
const NUMBER_BUTTONS = document.querySelectorAll('.number-button');

let opInProgress = false; // without this it will concatenate result and new inputs on display
let firstRun = true;
let waitingForNumber = true; // so you can't press the same operator repeatedly,
                            // it means than no operation is currently in execution

let waitingForOperator = false; // this prevents inputing numbers after '=' has been pressed
                                // unless it's another operator or utility button
let decimalPressed = false;

let num1;
let num2;
let result;
let operator;

for (let i = 0; i < OPERATOR_BUTTONS.length; i++) {
    OPERATOR_BUTTONS[i].addEventListener('click', () => {
        opInProgress = true;
        decimalPressed = false;
        if (OPERATOR_BUTTONS[i].innerText != '=') {
            waitingForOperator = false;
        }
        processInput(OPERATOR_BUTTONS[i].innerText);
    });
}

for (let i = 0; i < NUMBER_BUTTONS.length; i++) {
    NUMBER_BUTTONS[i].addEventListener('click', () => {
        if (waitingForOperator) {
            return;
        }

        else {
            if (opInProgress) {
                DISPLAY.innerText = '';
                DISPLAY.innerText = `${NUMBER_BUTTONS[i].innerText}`;
                opInProgress = false;
            }

            else {
                if (decimalPressed && NUMBER_BUTTONS[i].innerText == '.') {
                    return;
                }
                else {
                    DISPLAY.innerText += `${NUMBER_BUTTONS[i].innerText}`;
                    if (NUMBER_BUTTONS[i].innerText == '.') {
                        decimalPressed = true;
                    }
                }
            }
            waitingForNumber = false;
        }
    });
}

function getDisplay() {
    return parseFloat(DISPLAY.innerText);
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
    console.log(`clearEverything()`);
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
        console.log(`reached del`);
        return;
    }

    if (firstRun) {
        if (!num1 && !num2) {
            waitingForNumber = true;
            num1 = getDisplay();
            filterOperator(input);
            console.log(`[!num1 && !num2]: [num1 = ${num1}] [operator = ${operator}]`);
        }

        else if (num1 && !num2) {
            if (waitingForNumber) {
                filterOperator(input);
                console.log(`[num1 && !num2]: [num1 = ${num1}] [num2 = ${num2}] [operator = ${operator}] [result = ${result}]`);
                console.log(`New operator = [${operator}]`);
            }

            else if (!waitingForNumber) {
                num2 = getDisplay();
                operate();
                console.log(`[!waitingForNumber]: [num1 = ${num1}] [num2 = ${num2}] [operator = ${operator}] [result = ${result}]`);
                filterOperator(input);
                console.log(`New operator = ${operator}`);
                firstRun = false;
                waitingForNumber = true;
                console.log('-- firstRun = false --');
            }
        }
    }

    else if (!firstRun) {
        if (waitingForNumber) {
            filterOperator(input);
            console.log(`New operator = ${operator}`);
        }

        else if (!waitingForNumber) {
            num1 = result;
            num2 = getDisplay();
            operate();
            console.log(`Result: num1 = ${num1}, num2 = ${num2}, operator = ${operator} result = ${result}`);
            filterOperator(input);
            console.log(`New operator = ${operator}`);
            waitingForNumber = true;
            console.log(`Waiting for number? ${waitingForNumber}`);
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

function filterOperator(input) {
    if (input == 'C' || input == '-/+' || input == 'DEL') {
        return;
    }

    else if (input == '=') {
        waitingForOperator = true;
        display(result);
    }

    else {
        operator = input;
    }
}

// results that are very long do not fit the display, need to format
// decimal button can be pressed multiple times ? wtf