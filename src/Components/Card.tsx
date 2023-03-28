import s from "./Card.module.css";
import { useState } from "react";
const Card = () => {
  const [calc, setCalc] = useState<string[]>([]);
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ["+", "-", "/", "*", "."];
  const [currentNumb, setCurrentNumb] = useState("");

  const addNumber = (value: number | string) => {
    // if (currentNumb.endsWith(".")) {
    //   const newValue = currentNumb + value;
    //   return newValue;
    // }

    setCurrentNumb((prev) => {
      if (value === "." && prev.includes(".")) {
        return prev;
      } else return prev + value.toString();
    });
  };

  const addOperator = (operator: string) => {
    if (!currentNumb) {
      return;
    }
    setCalc((prev) => {
      const copy = [...prev];
      const last = copy.length - 1;

      if (operators.includes(copy[last]) && !currentNumb) {
        return copy;
      } else {
        copy.push(currentNumb, operator);
        setCurrentNumb("");
        console.log(currentNumb);
        return copy;
      }
    });
  };

  const executeMultiplication = (operationsArray: string[]) => {
    while (operationsArray.indexOf("*") !== -1) {
      const index = operationsArray.indexOf("*");
      const before = index - 1;
      const after = index + 1;
      const result = parseFloat(operationsArray[before]) * parseFloat(operationsArray[after]);

      operationsArray.splice(before, 3, result.toString());
    }
  };

  const executeAdd = (operationsArray: string[]) => {
    while (operationsArray.indexOf("+") !== -1) {
      const index = operationsArray.indexOf("+");
      const before = index - 1;
      const after = index + 1;
      const result = parseFloat(operationsArray[before]) + parseFloat(operationsArray[after]);
      operationsArray.splice(before, 3, result.toPrecision(2).toString());
    }
  };
  const executeSubtract = (operationsArray: string[]) => {
    while (operationsArray.indexOf("-") !== -1) {
      const index = operationsArray.indexOf("-");
      const before = index - 1;
      const after = index + 1;
      const result = parseFloat(operationsArray[before]) - parseFloat(operationsArray[after]);
      operationsArray.splice(before, 3, result.toString());
    }
  };
  const executeDivide = (operationsArray: string[]) => {
    while (operationsArray.indexOf("/") !== -1) {
      const index = operationsArray.indexOf("/");
      const before = index - 1;
      const after = index + 1;
      const result = parseFloat(operationsArray[before]) / parseFloat(operationsArray[after]);
      operationsArray.splice(before, 3, result.toString());
    }
  };
  const doCalc = () => {
    if (currentNumb) {
      setCalc((prev) => [...prev, currentNumb]);
      setCurrentNumb("");
    }

    setCalc((prev) => {
      const copy = [...prev];
      executeMultiplication(copy);
      executeDivide(copy);
      executeAdd(copy);
      executeSubtract(copy);
      console.log(copy);
      setCurrentNumb(copy[0]);
      return [];
    });
  };

  const resetCalculator = () => {
    setCalc([]);
    setCurrentNumb("");
  };
  const deleteLastNumb = () => {
    if (currentNumb) {
      setCurrentNumb((prev) => {
        const newRes = prev.slice(0, -1);
        return newRes;
      });
    } else {
      setCalc((prev) => {
        const copy = [...prev];
        const lastElement = copy[copy.length - 1];

        if (lastElement && lastElement.length > 1) {
          const modifiedValue = lastElement.slice(0, -1);
          copy[copy.length - 1] = modifiedValue;
        } else if (lastElement && lastElement.length < 2) {
          return copy.slice(0, -1);
        }
        return copy;
      });
    }
  };
  return (
    <div className={s.card}>
      <div className={s.display}>
        <h1>
          {calc.join("")}
          <span style={{ color: "#33142a" }}>{currentNumb}</span>
        </h1>
      </div>
      <div className={s.buttons}>
        {numbers.map((number) => (
          <button key={number} onClick={() => addNumber(number)}>
            {number}
          </button>
        ))}
        <button className={s.button} onClick={() => addOperator("+")}>
          +
        </button>
        <button className={s.button} onClick={() => addOperator("-")}>
          -
        </button>
        <button className={s.button} onClick={() => addOperator("*")}>
          *
        </button>
        <button className={s.button} onClick={() => addOperator("/")}>
          /
        </button>
        <button className={s.button} onClick={() => doCalc()}>
          =
        </button>
        <button className={s.button} onClick={resetCalculator}>
          C
        </button>
        <button className={s.button} onClick={deleteLastNumb}>
          D
        </button>
        <button className={s.button} onClick={() => addNumber(".")}>
          .
        </button>
      </div>
    </div>
  );
};

export default Card;
