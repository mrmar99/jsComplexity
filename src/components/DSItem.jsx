import React from "react";
import Complexity from "./Complexity";
import styled from "styled-components";

const DSItemLink = styled.a`
  user-select: none;
  padding: 10px 10px 10px 20px;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: var(--description-bg-color);
    transition: background-color 0.2s ease-out;
  }
`;

const DSItemTitle = styled.span`
  font-family: "InterSemiBold";
  font-size: 2rem;
  color: var(--secondary-color);
  flex: 3;
  height: 100%;
  display: inline-flex;
  align-items: center;
`;

const DSItem = (props) => {
  return (
    <DSItemLink>
      <DSItemTitle>{props.title}</DSItemTitle>
      <Complexity title="O(n log(n))" color="lightgreen" />
      <Complexity title="O(1)" color="green" />
    </DSItemLink>
  );
};

export default DSItem;