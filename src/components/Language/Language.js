import React from "react";
import "./Language.css";

export const Language = (props) => {
  return (
    <div className={props.className}>
      <div className="language-toggle__item language-toggle__item--active">en</div>
      <div className="language-toggle__item">ru</div>
    </div>
  );
};
