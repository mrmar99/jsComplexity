import React from "react";
import { useUnit } from "effector-react";
import { $counter, increment, decrement } from "./model";
import "./Counter.css";

export const Counter = ({className}) => {
  const counter = useUnit($counter);
  const counterClasses = className ? `counter ${className}` : `counter`;

  return (
    <div className={counterClasses}>
      <button
        className="counter__button"
        aria-label="Increment value"
        onClick={increment}
      >
        +
      </button>
      <span className="counter__label">{counter}</span>
      <button
        className="counter__button"
        aria-label="Decrement value"
        onClick={decrement}
      >
        -
      </button>
    </div>
  );
};