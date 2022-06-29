let eq = document.querySelector(".equation-screen span");
let os = document.querySelector(".output-screen span");
let buffer = null;
let flag = 0;
let pre_operator = null;
function btnClick(value) {
    switch (value) {
        case "AC":
            eq.innerText = 0;
            os.innerText = 0;
            flag = 0
            break;
        case "C":
            os.innerText = 0;
            //to clear of operand after operator in eqation screen
            eq.innerText = eq.innerText.slice(0, buffer + 1);
            flag = 0;
            //to clear numbers in eqation without operator
            if (!isNaN(eq.innerText)) {
                eq.innerText = 0
            }
            break;
        // remove last number
        case "←":
            if (os.innerText!=0) {
                os.innerText = os.innerText.slice(0, -1)
                eq.innerText = eq.innerText.slice(0, -1)
            }
            if (os.innerText.length==0) {
                os.innerText=0
            }
            if (eq.innerText.length==0) {
                eq.innerText=0
            }
            break;
        case "=":
            if (flag == 1) {
                break;
            }
            flag = 1;
            evalfunction(eq);
            break;
        default:
            render(value);
            break;
    }
}
function render(value) {
    if (eq.innerText == 0) {
        eq.innerText = null;
    }
    if (os.innerText == 0) {
        os.innerText = null;
    }
    //new calculation after eqals
    if (flag == 1) {
        eq.innerText = os.innerText
        if (parseInt(value)) {
            eq.innerText = null
            os.innerText = null;
        }
        flag = 0
    }
    //handle symbol
    if (isNaN(value)) {
        os.innerText = 0;
        buffer = eq.innerText.length
        //not useing / or multiply at start
        if (eq.innerText == 0) {
            if (value == '/' || value == '*') {
                eq.innerText += 0
                return
            }
        }
        // change operator
        if (isNaN(eq.innerText[buffer - 1])) {
            eq.innerText = eq.innerText.substring(0, buffer - 1) + value
            return
        }
    } else {
        os.innerText += value;
    }
    eq.innerText += value;
   
}
// evaluating equation
function evalfunction(eq) {
    os.innerText = eval(eq.innerText)
    //eq.innerText = os.innerText;
    eq.innerText += "=" + os.innerText
    if (os.innerText=='Infinity') {
        os.innerText=0
        eq.innerText=0
        console.warn("Divide by 0");
    }
}
function init() {
    //document.querySelector(".calc-btns").addEventListener("click", function (event) {
    //  if (event.target.innerText.length < 3) {
    //    btnClick(event.target.innerText);
    //  }
    //});

    let btns = document.getElementsByClassName("calc-btn")
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function (event) {
            btnClick(event.target.innerText);
        });
    }
}
init();