var toBeDeleted = false;
var operationsBase = ["+", "-", "*", "/", "√"];
var operations = ["√", "sin", "cos", "tan", "asin", "acos", "atan"];
var names = ["sqrt"];
var htmlSpecials = ["&#8730;("];
function NumButton(input) {
  var outputElement = document.getElementById("calcScreen").innerHTML;
  if (toBeDeleted) {
    for (var i = 0; i < operationsBase.length; i++) {
      if (input === operationsBase[i]) {
        toBeDeleted = false;
      }
    }
    if (toBeDeleted) {
      input = "";
    }
  }
  toBeDeleted = false;
  if (outputElement === "0")
  {
    outputElement = input.toString();
  }
  else
  {
    outputElement += input.toString();
  }
  document.getElementById("calcScreen").innerHTML = beautify(outputElement);
  
}

function ClearButton() {
  document.getElementById("calcScreen").innerHTML = "";
}

function EnterButton() {
  document.getElementById("calcScreen").innerHTML = personalEval(document.getElementById("calcScreen").innerHTML);
  toBeDeleted = true;
}
function BackspaceButton() {
  if (document.getElementById("calcScreen").innerHTML.length === 1) {
    document.getElementById("calcScreen").innerHTML = "0";
  }
  else {
    document.getElementById("calcScreen").innerHTML = document.getElementById("calcScreen").innerHTML.slice(0, -1);
  }
}
function AllClearButton() {
  document.getElementById("calcScreen").innerHTML = "0";
}
//capture key press events from js
document.addEventListener("keydown", function(e) {
  var key = e.key;
  if (key === "Enter") {
    EnterButton();
  }
  else if (key === "Backspace") {
    BackspaceButton();
  }
  else if (key === "Delete") {
    AllClearButton();
  }
  else if (key !== "Shift") {
    NumButton(key);
  }
});
// END OF HTML INTERACTION
/* 
 * Section: calculator math
 */
function mathActions(input, action) {
  if (action == operations[0]) {
    return Math.sqrt(input);
  }
  else if (action == "sin") {
    return Math.sin(input);
  }
  else if (action == "cos") {
    return Math.cos(input);
  }
  else if (action == "tan") {
    return Math.tan(input);
  } else if (action == "asin") {
    return Math.asin(input);
  }
  else if (action == "acos") {
    return Math.acos(input);
  }
  else if (action == "atan") {
    return Math.atan(input);
  }
  
  
}
function nextParen(input, index) {
  var opencnt = -1;
  for (var i = index; i > input.length; i+= 1) {
    if (input[i] == "(") {
      opencnt++;
    }
    else if (input[i] == ")") {
      opencnt--;
    }
    if (input[i] === ")" && opencnt === 0) {
      return i;
    }
  }
  return input.length;
}
function personalEval(input) {
  console.log("carrot: " + Function("return " + "2 ^ 3")());
  /*while (input.indexOf("^") >= 0) {
    input = Math.pow(personalEval(input.substring(0, input.indexOf("^"))), personalEval(input.substring(input.indexOf("^") + 1, nextParen(input, input.indexOf("^")))));
  }*/
  for (var i = 0; i < operations.length; i++) {
    while (input.indexOf(operations[i]) >= 0) {
      console.log(input);
      input = input.substring(0, input.indexOf(operations[i])) + mathActions(personalEval(input.substring(input.indexOf(operations[i]) + operations[i].length, nextParen(input, input.indexOf(operations[i])))), operations[i]);
      input += input.substring(nextParen(input, input.indexOf(operations[i])) + operations[i].length, input.length);
    }
  }
  input = fixParens(input);
  console.log("eval: " + input);
  return Function("return " + input)();
} 
function fixParens (input) {
  var opencnt = 0, closecnt = 0;
  for (var i = 0; i < input.length; i++) {
    if (input[i] === "(") {
      opencnt ++;
    }
    else if (input[i] === ")") {
      closecnt ++
    }
  }
  while(closecnt > 0 && closecnt != opencnt) {
    input = "(" + input;
    closecnt--;
  }
  while(opencnt > 0 && opencnt!= closecnt) {
    input = input + ")";
    opencnt--;
  }
  return input;
  
}
/*
 * //////////////////////////////////////////////////////////////////////////
 * /////////////////////////////////////////////////////////////////////////
 * Section: site interaction
 * 
 */
function beautify(input) {
  for (var i = 0; i < htmlSpecials.length; i++) {
    input = input.replaceAll(names[i], htmlSpecials[i]);
  }
  return input;
}
