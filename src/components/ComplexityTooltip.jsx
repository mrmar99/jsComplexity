import React from "react";
import $store from "../store";
import { useUnit } from "effector-react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const ComplexityTooltip = ({ type, children }) => {
  const store = useUnit($store);
  const { language } = store;

  const tooltipText = {
    en: {
      tc: "Time Complexity",
      sc: "Space Complexity",
    },
    ru: {
      tc: "Сложность по времени",
      sc: "Сложность по памяти",
    },
  };

  return (
    <div data-tooltip-content={tooltipText[language][type]} data-tooltip-id={`tooltip-${type}`}>
      {children}
      <Tooltip id={`tooltip-${type}`} />
    </div>
  );
};

export default ComplexityTooltip;
