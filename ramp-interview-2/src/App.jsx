import "./App.css";

/* 
Implement a spreadsheet. The spreadsheet can be represented by a data type of your choosing, but it should be easy to get/update individual cells as well as display the entire spreadsheet. Each cell in the spreadsheet can have one of the following:

a string, such as "Name" in A1 or "John Doe" in A2

a number, such as 263 in B1 or 75 in B2

a formula linking other items in the spreadsheet. Ex: "=C1*C2" in D2 or "=C1+C2" in D3

cells that reference other cells with formulas are said to have dependencies. If the value in C1 or C2 changes, D2 will also need to be updated since it depends on those inputs.

Requirements

Implement the following:

Define a class to represent spreadsheets

Define a method setCell, which adds either a value or formula to a given cell in your spreadsheet

Define a method getCell, which gets the value inside of a spreadsheet cell

Depending on your code, you might also implement parseFormula to handle all relevant formula parsing

Assumptions

Assume the spreadsheet is initialized with 26 columns, 100 rows, with no values in any cell

Assume valid input (no error checking needed on input, particularly formulas)

Assume that if a string begins with a '=', it’s a valid formula

Assume we just want to handle basic arithmetic operations for now (+-/*) between two cells like '=B1-B2' or '=A1+A2'
*/

//  no need to handle pemdas only 2 numbers
// assume no spaces in forumlas
// we can assume that there will be a valid value in the refereced cell

const alphabeticalLabels = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
  I: 8,
  J: 9,
  K: 10,
  L: 11,
  M: 12,
  N: 13,
  O: 14,
  P: 15,
  Q: 16,
  R: 17,
  S: 18,
  T: 19,
  U: 20,
  V: 21,
  W: 22,
  X: 23,
  Y: 24,
  Z: 25,
};

function getOperator(formula) {
  if (formula.includes("+")) {
    return { references: formula.split("+"), operator: "+" };
  } else if (formula.includes("-")) {
    return { references: formula.split("-"), operator: "-" };
  } else if (formula.includes("*")) {
    return { references: formula.split("*"), operator: "*" };
  } else {
    return { references: formula.split("/"), operator: "/" };
  }
}

function getIndexOfLabel(label) {
  const alphabeticalValue = alphabeticalLabels[label[0]];
  const numeric = label.slice(1);
  const index = alphabeticalValue + 26 * (Number(numeric) - 1);
  return index;
}

function calculateEquation(value1, operator, value2) {
  if (operator === "*") {
    return value1 * value2;
  } else if (operator === "/") {
    return value1 / value2;
  } else if (operator === "+") {
    return value1 + value2;
  } else {
    return value1 - value2;
  }
}

class Spreadsheet {
  constructor() {
    this.cells = Array(2600).fill(null);
  }

  getCell(label) {
    const index = getIndexOfLabel(label);
    return this.cells[index];
  }

  setCell(label, value) {
    const index = getIndexOfLabel(label);

    if (typeof value === "number") {
      this.cells[index] = value;
      return;
    }

    // ['a', '1', '+', "b", "1"]

    if (value[0] === "=") {
      // valid equation
      const { references, operator } = getOperator(value.slice(1));
      console.log(references, operator);
      const value1 = getIndexOfLabel(references[0]);
      const value2 = getIndexOfLabel(references[1]);
      console.log(value1, value2);
      const result = calculateEquation(
        this.cells[value1],
        operator,
        this.cells[value2]
      );
      this.cells[index] = result;
    } else {
      // number or string
      this.cells[index] = value;
    }
    // A1*B1
    // 5*2
  }
}

const spreadsheet = new Spreadsheet();

spreadsheet.setCell("A1", 2);
spreadsheet.setCell("B1", 5);
console.log(spreadsheet.getCell("A1")); // => 5
console.log(spreadsheet.getCell("B1")); // => 5
spreadsheet.setCell("C1", "=A1*B1");
console.log(spreadsheet.getCell("C1")); // => 10

export default function App() {
  return null;
}
