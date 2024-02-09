import React from "react";
import Complexity from "./Complexity";
import styled from "styled-components";
import { Link } from "react-router-dom";

const DSItemLink = styled(Link)`
  text-decoration: none;
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

  @media (max-width: 780px) {
    padding: 5px;
    margin-top: 0.5rem;
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

  @media (max-width: 780px) {
    font-size: 0.9rem;
  }
`;

const DSItem = (props) => {
  const { title, item } = props;
  const { slug, tc, tcColor, sc, scColor } = item;

  return (
    <DSItemLink to={slug}>
      <DSItemTitle>{title}</DSItemTitle>
      <Complexity title={tc} color={tcColor} />
      <Complexity title={sc} color={scColor} />
    </DSItemLink>
  );
};

export default DSItem;
