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

function clickSign(clickedSign) {
    if (isNaN(savedNumber)) {
        savedNumber = currentNumber
        currentNumber = NaN
    } else if (!isNaN(currentNumber)) {
        if (currentSign === '/' && currentNumber === 0) {
            display.textContent = 'Error: division by zero is not possible!'
            currentNumber = NaN, savedNumber = NaN, currentSign = '';
        } else {
        result = operate(savedNumber, currentNumber, currentSign)
        history.push({num1: savedNumber, sign: currentSign, num2: currentNumber, result: result})
        savedNumber = result
        currentNumber = NaN
        display.textContent = result
        }
    }
    currentSign = clickedSign
}

let currentNumber = NaN, savedNumber = NaN, currentSign;
const history = [{num1: NaN, sign: currentSign, num2: NaN, result: 0}]

const display = document.querySelector('.display')
const digits = document.querySelector('.digits')
const addBtn = document.getElementById("+")
const subtractBtn = document.getElementById("-")
const multiplyBtn = document.getElementById("*")
const divideBtn = document.getElementById("/")
const equalBtn = document.getElementById("=")
const clearBtn = document.getElementById("clear")
const point = document.getElementById("point")
const back = document.getElementById("back")

display.textContent = 0

for (let i = 0; i <= 9; i++) {
    const digit = document.createElement('button')
    digit.setAttribute('id', i)
    digit.textContent = i
    digits.appendChild(digit)
    digit.addEventListener('click', () => {
        if (display.textContent === '0' || display.textContent != currentNumber) {
            display.textContent = i
            currentNumber = +display.textContent
            if (currentSign === '=') {
                savedNumber = NaN
            }
        }
        else {
            display.textContent += i
            currentNumber = +display.textContent
        }
    })
}

addBtn.addEventListener('click', e => clickSign('+'))
subtractBtn.addEventListener('click', e => clickSign('-'))
multiplyBtn.addEventListener('click', e => clickSign('*'))
divideBtn.addEventListener('click', e => clickSign('/'))

equalBtn.addEventListener('click', () => {
    if (currentSign === '/' && currentNumber === 0) {
        display.textContent = 'Error: division by zero is not possible!'
        currentNumber = NaN, savedNumber = NaN, currentSign = '';
    }else if (!isNaN(currentNumber) && !isNaN(savedNumber)) {
        result = operate(savedNumber, currentNumber, currentSign)
        history.push({num1: savedNumber, sign: currentSign, num2: currentNumber, result: result})
        currentNumber = NaN
        currentSign = '='
        savedNumber = result
        display.textContent = result
    } else if (currentSign === '=') {
        console.log(savedNumber, history.at(-1)["sign"], history.at(-1)["num2"], operate(savedNumber, history.at(-1)["num2"], history.at(-1)["sign"]))
        result = operate(savedNumber, history.at(-1)["num2"], history.at(-1)["sign"])
        history.push({num1: savedNumber, sign: history.at(-1)["sign"], num2: history.at(-1)["num2"], result: result})
        savedNumber = result
        display.textContent = result
    }
})

clearBtn.addEventListener('click', () => {
    currentNumber = NaN, savedNumber = NaN, currentSign = '';
    display.textContent = 0
})

point.addEventListener('click', () => {
    if (display.textContent != currentNumber) {
        display.textContent = '0.'
        currentNumber = +display.textContent
    }
    else if (!display.textContent.includes('.')) {
        display.textContent += '.'
        currentNumber = +display.textContent
    }
})

back.addEventListener('click', () => {
    currentNumber = history.at(-2)["result"], savedNumber = NaN, currentSign = ''
    display.textContent = history.at(-2)["result"]
})

display.addEventListener('keydown', (event) => {
    if ('0123456789'.includes(event.key)) {
        currentNumber = +display.textContent +event.key
        if (currentSign === '=') {
            savedNumber = NaN
        }
        if (display.textContent[0] === '0') {
            display.textContent = display.textContent.slice(1)
        }
    } else if (event.key === 'Backspace') {
        currentNumber = +display.textContent.slice(0, -1)
        if (currentSign === '=') {
            savedNumber = NaN
        }
    } else {
        event.preventDefault()
    }
})