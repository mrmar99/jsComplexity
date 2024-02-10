import React from "react";
import $store from "../store";
import { useUnit } from "effector-react";
import styled from "styled-components";

const DeprecatedBlock = styled.div`
  display: flex;
  background-color: var(--red-color);
  padding: 0.5rem 1rem;
  height: max-content;
  border-radius: 8px;
  color: var(--bg-color);
  font-family: "InterExtrabold";
  font-size: 0.8rem;
  margin-top: 0.4rem;
`;

const Deprecated = () => {
  const store = useUnit($store);
  const { language } = store;

  const deprecatedText = {
    ru: "Устаревший",
    en: "Deprecated"
  };

  return (
    <DeprecatedBlock>
      { deprecatedText[language] }
    </DeprecatedBlock>
  );
};

export default Deprecated;
