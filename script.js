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
