import React from "react";
import DSItem from "./DSItem";
import styled from "styled-components";

const EmptyItemsList = styled.div`
  text-align: center;
  font-size: 1.75rem;
  color: var(--secondary-color);
  font-family: "InterRegular";
  margin-top: 2rem;
`;

const DSItems = (props) => {
  const { items } = props;
  items.sort((a, b) => a.title.localeCompare(b.title));
  console.log(items)

  return (
    <>
      {items.length ? (
        items
          .map((item) => {
            return <DSItem key={item.slug} title={item.title} item={item} />;
          })
      ) : (
        <EmptyItemsList>Нет данных</EmptyItemsList>
      )}
    </>
  );
};

export default DSItems;
