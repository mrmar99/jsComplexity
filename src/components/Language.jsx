import React from "react";
import styled from "styled-components";

const LanguageToggle = styled.div`
  flex-shrink: 0;
  display: flex;
  background-color: transparent;
  border: 2px solid var(--secondary-color);
  border-radius: 8px;
  cursor: pointer;
`;

const LanguageItem = styled.div`
  font-family: "InterBlack";
  display: flex;
  align-items: center;
  padding: 12px;
  height: 100%;
  transition: background-color 0.1s ease-in;

  ${({ $isActive }) =>
    $isActive
      ? `background-color: var(--secondary-color);`
      : `background-color: transparent;`}

  &:hover {
    background-color: var(--secondary-color-hover);
    transition: background-color 0.1s ease-out;
  }
`;

const Language = () => {
  return (
    <LanguageToggle>
      <LanguageItem $isActive={true}>en</LanguageItem>
      <LanguageItem $isActive={false}>ru</LanguageItem>
    </LanguageToggle>
  );
};

export default Language;
