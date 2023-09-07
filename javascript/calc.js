var toBeDeleted = false;

function NumButton(input) {
  var outputElement = document.getElementById("calcScreen").innerHTML;
  if (toBeDeleted && input >= "0" && input <= "9") {
    outputElement = "";
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
document.addEventListener("keypress", function(e) {
  var key = e.key;
  var keyCode = e.keyCode;
  if (key === "Enter") {
    EnterButton();
  }
  else if (keyCode === 8) {
    BackspaceButton();
    NumButton("0");
  }
  /*else if (key === "Delete") {
    AllClearButton();
  }*/
  else if (key !== "Shift") {
    NumButton(key);
  }
});
function nextParen(input) {
  var opencnt = 0, closedcnt = 0;
  for (var i = input.length - 1; i >= 0; i--) {
    if (input[i] === "(") {
      opencnt++;
    }
    else if (input[i] === ")") {
      opencnt--;
    }
    if (input[i] === ")" && opencnt === 0) {
      return input.slice(0, i);
    }
  }
  return 0;
}
function personalEval(input) {
  while (input.indexOf("&#8730;")!== -1) {
    input = 
    input = input.replace("&#8730;", Math.sqrt(nextParen(input)));
  }
  return eval(input);
}
function ParsePareth(input) {

}
// add an event listener for the backspace key
document.addEventListener("keydown", function(e) {
  var key = e.key;
  var keyCode = e.keyCode;
  if (keyCode === 8) {
    BackspaceButton();
  }
});
function beautify(input) {
  
  return input.replaceall("sqrt", "&#8730;");
}