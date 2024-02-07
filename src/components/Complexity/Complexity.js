import React from "react";
import "./Complexity.css";

export const Complexity = (props) => {
  const validColors = {
    "green": "#03A500",
    "lightgreen": "#6ACC74",
    "limegreen": "#97DE00",
    "orange": "#F9A13B",
    "red": "#DF513D"
  };

  const isColorValid = props.color in validColors;
  const backgroundColor = isColorValid ? validColors[props.color] : ''

  return (
    <div className="complexity" style={
      isColorValid ? { backgroundColor } : {}
    }>
      {props.title}
    </div>
  );
};
