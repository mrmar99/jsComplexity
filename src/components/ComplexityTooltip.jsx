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
      tc: `Time Complexity<br />
      Best case<br />
      Average case<br />
      Worst case
      `,
      sc: "Space Complexity in Worst case",
    },
    ru: {
      tc: `Сложность по времени<br />
      Лучший случай<br />
      Средний случай<br />
      Худший случай
      `,
      sc: "Сложность по памяти в Худшем случае",
    },
  };

  return (
    <div style={{textAlign: "center"}} data-tooltip-html={tooltipText[language][type]} data-tooltip-id={`tooltip-${type}`}>
      {children}
      <Tooltip id={`tooltip-${type}`} />
    </div>
  );
};

export default ComplexityTooltip;
