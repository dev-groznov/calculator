function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function operate(a, b, sign) {
    switch (sign) {
        case '+': return add(a, b); break;
        case '-': return subtract(a, b); break;
        case '*': return multiply(a, b); break;
        case '/': return divide(a, b); break;
    }
}

let a, b, sign;

const display = document.querySelector('.display')
display.textContent = 0
const digits = document.querySelector('.digits')


for (let i = 0; i <= 9; i++) {
    const digit = document.createElement('button')
    digit.setAttribute('id', i)
    digit.textContent = i
    digits.appendChild(digit)
    digit.addEventListener('click', () => {
        if (display.textContent === '0') {display.textContent = i}
        else {display.textContent += i}
    })
}