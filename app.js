const buttonNumbers = document.querySelectorAll('#buttons-grid > .button.number')
const buttonOperators = document.querySelectorAll('#buttons-grid > .button.operator')
const buttonEquals = document.querySelector('#buttons-grid > .button.equals')
const buttonClear = document.querySelector('#buttons-grid > .button.clear')
const buttonReturn = document.querySelector('#buttons-grid > .button.return')
const screen = document.getElementById('screen')
const screenOperator = document.getElementById('operator')
const screenText = document.getElementById('text')


let firstNumber = '';
let secondNumber = '';
let action = '';

const add = (a,b) => a+b;
const minus = (a,b) => a-b;
const divide = (a,b) => a/b;
const multiply = (a,b) => a*b;

operate = (num1,num2, operator) => {
    num1 = parseFloat(num1)
    num2 = parseFloat(num2)
    switch(operator){
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '/':
            if(num2 !== 0){
                return num1 / num2;
            }
            else{
                return "Err: Division by 0";
            }
        case '*':
            return num1 * num2;
        case 'X^':
            return num1 ** num2
        default:
            return "Invalid";
    }
}

function start(){
    //Numbers
    buttonNumbers.forEach(button => {
        button.addEventListener('click',() => {
            if(action == '='){
                firstNumber = ''
                action = ''
            }
            if(action === ''){
                firstNumber += button.textContent;
                screenText.textContent = firstNumber;
            } else {
                secondNumber += button.textContent;
                screenText.textContent = secondNumber;
            }
            
        })
    });
    //Operators
    buttonOperators.forEach(button => {
        button.addEventListener('click', () => {
            action = button.textContent;
            if(action == 'X^'){
                screenText.textContent = '';
                screenOperator.textContent = `${firstNumber}^`
            } else {
                screenOperator.textContent = action;
            }
            
        })
    })
    //Equals
    buttonEquals.addEventListener('click',() => {
        if(firstNumber == '' || secondNumber == '' || action == '') return;
        result = (Math.round(operate(firstNumber,secondNumber,action)*100000000)/100000000).toFixed(8)
        firstNumber = result
        secondNumber = ''
        action = '='
        screenOperator.textContent = ''
        screenText.textContent = firstNumber
        
    })
    //Clear
    buttonClear.addEventListener('click', () => {
        firstNumber = ''
        secondNumber = ''
        action = ''
        screenText.textContent = ''
        screenOperator.textContent = ''
    })
    //Return
    buttonReturn.addEventListener('click', () => {
        if(action == '='){
            return
        }
        if(action == ''){
            if(firstNumber.length == 1){
                firstNumber = ''
            }
            firstNumber = firstNumber.slice(0,-1)
            screenText.textContent = firstNumber
        } else {
            if(secondNumber.length == 1){
                secondNumber = ''
            }
            secondNumber = secondNumber.slice(0,1)
            screenText.textContent = secondNumber
        }
    })
}

start()