var input = document.getElementById("input");
var numbers = document.querySelectorAll(".numbers div");
var operator = document.querySelectorAll(".operations div");
var result = document.getElementById("result");
var clear = document.getElementById("clear");
var resultDisplayed = false;

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", function (e) {
    let currentString = input.innerHTML;
    let lastChar = currentString[currentString.length - 1];

    if (resultDisplayed === false) {
      input.innerHTML += e.target.innerHTML;
    } else if (
      resultDisplayed === true &&
      (lastChar === "+" ||
        lastChar === "-" ||
        lastChar === "×" ||
        lastChar === "÷")
    ) {
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      resultDisplayed = false;
      input.innerHTML = e.target.innerHTML;
    }
  });
}

for (let i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function (e) {
    let currentString = input.innerHTML;
    let lastChar = currentString[currentString.length - 1];

    if (
      lastChar === "+" ||
      lastChar === "-" ||
      lastChar === "×" ||
      lastChar === "÷"
    ) {
      let newString =
        currentString.substring(0, currentString.length - 1) +
        e.target.innerHTML;
      input.innerHTML = newString;
    } else if (currentString.length == 0) {
      console.log("Enter a number first");
    } else {
      input.innerHTML += e.target.innerHTML;
    }
  });
}

result.addEventListener("click", function () {
  let inputString = input.innerHTML;

  let number = inputString.split(/\+|\-|\×|\÷/g);
  let operators = inputString.replace(/[0-9]|\./g, "").split("");

  console.log(number);
  console.log(operators);

  let divide = operators.indexOf("÷");
  while (divide != -1) {
    number.splice(divide, 2, number[divide] / number[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  let multiply = operators.indexOf("×");
  while (multiply != -1) {
    number.splice(multiply, 2, number[multiply] * number[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  let minus = operators.indexOf("-");
  while (minus != -1) {
    number.splice(minus, 2, number[minus] - number[minus + 1]);
    operators.splice(minus, 1);
    minus = operators.indexOf("-");
  }

  let add = operators.indexOf("+");
  while (add != -1) {
    number.splice(
      add,
      2,
      parseFloat(number[add]) + parseFloat(number[add + 1])
    );
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.innerHTML = number[0];
  resultDisplayed = true;
});

clear.addEventListener("click", function () {
  input.innerHTML = "";
});
