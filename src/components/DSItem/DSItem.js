import React from "react";
import { Complexity } from "../Complexity/Complexity";
import "./DSItem.css";
import arrowSvg from "./fi-br-angle-left.svg";

export const DSItem = (props) => {
  return (
    <div className="ds-item">
      <div className="ds-item__accordion">
        <span className="ds-item__method">{props.title}</span>
        <div className="ds-item__tc">
          <Complexity title="O(log(n))" color="lightgreen" />
        </div>
        <div className="ds-item__sc">
          <Complexity title="O(1)" color="green" />
        </div>
        <div className="ds-item__arrow">
          <img src={arrowSvg} className="arrowSvg" alt="arrowSvg" />
        </div>
      </div>
      <div className="ds-item__description">
        Метод <code>findLastIndex</code> выполняет итерацию по массиву в обратном порядке и
        возвращает индекс первого элемента, который удовлетворяет
        предоставленной функции тестирования. Если ни один элемент не
        удовлетворяет функции тестирования, возвращается <code>-1</code>.
      </div>
    </div>
  );
};
