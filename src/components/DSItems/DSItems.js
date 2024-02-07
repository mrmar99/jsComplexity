import React from "react";
import { DSItem } from "../DSItem/DSItem";
import "./DSItems.css";

export const DSItems = () => {
  return (
    <div className="ds-items">
      <DSItem title="sort()" />
      <DSItem title="toLocaleString()" />
      <DSItem title="findLastIndex()" />
      <DSItem title="join()" />
      <DSItem title="lastIndexOf()" />
      <DSItem title="reduceRight()" />
    </div>
  );
};
