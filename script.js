function add(a, b){
    return a+b;
}

function multiply(a,b){
    return a*b
}

function subtract(a,b){
    return a-b
}

function divide(a,b){
    return a/b
}

function operate(numa,operator,numb){
    switch(operator){
        case("+") :
            return(add(numa, numb));

        case("-"):
            return (subtract(numa, numb));

        case("*"):
            return (multiply(numa, numb));
        case("/"):
            return (divide(numa, numb));
    }
}

let mathStack =[]
let evaluated = false;
let numericButtons = document.querySelectorAll(".numButton")
let displayBox = document.querySelector(".displayBox")

numericButtons.forEach((element) => {
    element.addEventListener('click', function(e){
        if(evaluated){
            clearBox()
            evaluated =false;
        }
        displayBox.value += e.target.textContent;
    })
});

let operateButton = document.querySelectorAll(".operator")
operateButton.forEach((element) => {
    element.addEventListener('click', function(e){
        evaluated = false;
        displayBox.value += e.target.textContent;


    })
});

document.addEventListener('keydown', (event) => {
  if (event.key == "Enter"){
    getResult();
  }else if(event.key =="Backspace"){
    deleteStroke()
  }
});



let equalsbtn = document.querySelector(".equalsButton")
equalsbtn.addEventListener('click', getResult)

const operaterList = ["+","-", "/", "*"];

let clearBtn = document.querySelector(".clearButton")
clearBtn.addEventListener('click', clearBox)


let deleteBtn = document.querySelector('.deleteButton');
deleteBtn.addEventListener('click' ,deleteStroke)


let dotBtn = document.querySelector(".dotButton")
dotBtn.addEventListener('click', ()=>{
    checkIfdotBtn()
    displayBox.value += dotBtn.textContent; 
    console.log(displayBox.value.split('.').length -1)
    
})

function getResult(){
    equationSplit = displayBox.value.split(/([+|/|*|-])/);
    

    let result = +equationSplit[0];

    for(let i =1;i<equationSplit.length; i+=2){
        let operator = equationSplit[i];
        let b = +equationSplit[i+1];
        result = operate(result, operator, b)

    }

    if(!checkForError(result)){
        evaluated = true;  
        mathStack.push(parseFloat(result).toFixed(3))
        result != undefined ? displayBox.value = result :displayBox.value = "Error" 
    }
    console.log(mathStack)
}

function clearBox(){
    displayBox.value ="" ;
    mathStack.length =0;
    checkIfdotBtn()
}
function checkForError(result){
    if(displayBox.value === "Error"){
        return true
    }
    return false
  
}

function deleteStroke(){
    if(parseFloat(displayBox.value).toFixed(3) == mathStack.pop()){
        clearBox();
    }else{
        displayBox.value = displayBox.value.slice(0, displayBox.value.length-1)
    }
}

function setDotToggele(givenBoolean){
    if(givenBoolean){
        dotBtn.disabled = givenBoolean
    }
}

function checkIfdotBtn(){
    equationSplit = displayBox.value.split(/([+|/|*|-])/);
    numOperaters = equationSplit.reduce((count, item)=>{
        for(let operator of operaterList ){
            if (operator == item){
                count =+1
            }
            
        }
        return count;
    },0)

    if(numOperaters ==0 || displayBox.value == " "){
        setDotToggele(false);
        return false
    }
    else if (numOperaters == (displayBox.value.split('.').length -1)){
        setDotToggele(false);
        return false
    }else{
        setDotToggele(true);
        return true
    }
    

}




