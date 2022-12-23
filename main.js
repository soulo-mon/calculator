// let operands = '';
let previousValue = '';
let currentValue = '';

document.addEventListener('DOMContentLoaded',  function(){
    //Store all compnents from my HTML file in JS
    let clear = document.querySelector('.clear');
    let equal = document.querySelector('.equal');
    let del = document.querySelector('.del');
    let decimal = document.querySelector('.decimal');

    let operands = document.querySelectorAll('.operand');
    let numbers = document.querySelectorAll('.number');

    let previousScreen = document.querySelector('.previous');
    let currentScreen = document.querySelector('.current');

    numbers.forEach((number) => number.addEventListener('click', function(e){
        handleNumber(e.target.textContent);
        currentScreen.textContent = currentValue;
    }))


    operands.forEach((op) => op.addEventListener('click', function(e){
        handleOperand(e.target.textContent);
        previousScreen.textContent = previousValue + " " + operand;
        currentScreen.textContent = currentValue ;
        
    }))
    
    clear.addEventListener('click', function(){
        previousValue = '';
        currentValue = '';
        operand = '';
        previousScreen.textContent = currentValue;
        currentScreen.textContent =currentValue;
    })

    equal.addEventListener('click', function(){
        if(currentValue != '' && previousValue != ''){
            calculate();
            previousScreen.textContent = '';
            if(previousValue.length <= 5){
                currentScreen.textContent = previousValue;
            }else{
                currentScreen.textContent = previousValue.slice(0, 5) + '...';
            }
        }
    })

    decimal.addEventListener('click', function(){
        addDecimal();
    })

    del.addEventListener('click', function() {
        deleteChar();
        currentScreen.textContent = currentValue;
      });
})

function handleNumber(num){
    if(currentValue.length <= 5){
        currentValue += num
    }
}

function handleOperand(op){
    operand= op;
    previousValue = currentValue;
    currentValue = '';
}

function calculate(){
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    if(operand === '+'){
        previousValue += currentValue;
    } else if(operand === '-'){
        previousValue -= currentValue;
    } else if(operand === '×'){
        previousValue *= currentValue;
    } else if(operand === '÷'){
        previousValue /= currentValue;
    }

    previousValue = roundNumber(previousValue);
    previousValue = previousValue.toString();
    currentValue = previousValue .toString();  
   
}

function roundNumber(num){
    return Math.round(num * 1000) / 1000;
}

function addDecimal(){
    if(!currentValue.includes('.')){
        currentValue += '.';
    }
}

function deleteChar() {
    if (currentValue.length > 0) {
      currentValue = currentValue.substring(0, currentValue.length - 1);
    }
  }