import React from "react";
import styled from "styled-components";
import { useUnit } from "effector-react";
import $store from "../store";

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
  text-align: center;
  align-items: center;
  padding: 0 12px;
  height: 100%;
  transition: background-color 0.1s ease-in;
  background-color: ${({ $isActive }) => 
    $isActive ? "var(--secondary-color)" : "transparent"
  };

  &:hover {
    background-color: var(--secondary-color-hover);
    transition: background-color 0.1s ease-out;
  }
`;

const Language = () => {
  const { language } = useUnit($store);

  return (
    <LanguageToggle>
      <LanguageItem $isActive={language === 'ru'}>ru</LanguageItem>
      <LanguageItem $isActive={language === 'en'}>en</LanguageItem>
    </LanguageToggle>
  );
};

export default Language;
