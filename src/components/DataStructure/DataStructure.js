import React from "react";
import { DSItems } from "../DSItems/DSItems";
import "./DataStructure.css";
import tooltipSvg from "./fi-br-interrogation.svg";

export const DataStructure = () => {
  return (
    <section className="dataStructure">
      <h2>Array</h2>
      <div className="ds-items__head">
        <div className="ds-items__head-first"></div>
        <div className="ds-items__head-tc">
          tc
          <sup>
            <img src={tooltipSvg} className="tooltipSvg" alt="tooltipSvg" />
          </sup>
        </div>
        <div className="ds-items__head-sc">
          sc
          <sup>
            <img src={tooltipSvg} className="tooltipSvg" alt="tooltipSvg" />
          </sup>
        </div>
        <div className="ds-items__head-last"></div>
      </div>
      <DSItems />
    </section>
  );
};
