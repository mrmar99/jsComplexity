import React from "react";
import Complexity from "./Complexity";
import styled from "styled-components";

const DSItemLink = styled.a`
  user-select: none;
  padding: 10px 10px 10px 20px;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  gap: 16px;
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

const DSItemComplexity = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const DSItem = (props) => {
  return (
    <DSItemLink>
      <DSItemTitle>{props.title}</DSItemTitle>
      <DSItemComplexity>
        <Complexity title="O(log(n))" color="lightgreen" />
      </DSItemComplexity>
      <DSItemComplexity>
        <Complexity title="O(1)" color="green" />
      </DSItemComplexity>
    </DSItemLink>
  );
};

export default DSItem;