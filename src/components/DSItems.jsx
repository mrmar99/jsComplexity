import React from "react";
import DSItem from "./DSItem";

const DSItems = (props) => {
  const { items } = props;
  return (
    <>
      {
        Object.entries(items).map(([slug, item]) => {
          return (
            <DSItem key={slug} title={item.title} item={item} />
          )
        })
      }
    </>
  );
};

export default DSItems;