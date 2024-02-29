import React from "react";
import DSItems from "./DSItems";
import styled from "styled-components";
import tooltipSvg from "../svg/tooltip.svg";
import $store from "../store";
import { useUnit } from "effector-react";
import ComplexityTooltip from "./ComplexityTooltip";

const DSSection = styled.section`
  margin-top: 3.5rem;

  @media (max-width: 780px) {
    margin-top: 2.5rem;
  }
`;

const DSTitle = styled.h2`
  font-family: "InterExtraBold";
  font-size: 3rem;
  margin-bottom: 1.5rem;

  @media (max-width: 780px) {
    font-size: 2rem;
  }
`;

const DSHead = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  padding-right: 5px;
  user-select: none;

  @media (max-width: 780px) {
    gap: 5px;
  }
`;

const DSHeadTitleDummy = styled.div`
  flex: 3;
`;

const DSComplexity = styled.div`
  font-family: "InterRegular";
  text-align: center;
  width: 140px;
  padding: 0 5px;

  span {
    font-size: 2rem;
  }

  @media (max-width: 780px) {
    width: 90px;

    span {
      font-size: 1.5rem;
    }
  }
`;

const DataStructure = (props) => {
  const { title, dataStructures } = props;

  const items = dataStructures[title];
  const { searchInputValue } = useUnit($store);
  const filteredItems = Object.values(items).filter((item) =>
    item.title.toLowerCase().includes(searchInputValue.toLowerCase())
  );

  return (
    <DSSection>
      <DSTitle>{title}</DSTitle>
      <DSHead>
        <DSHeadTitleDummy />
        <ComplexityTooltip type="tc">
          <DSComplexity>
            <span>tc</span>
            <sup>
              <img src={tooltipSvg} alt="tooltipSvg" />
            </sup>
          </DSComplexity>
        </ComplexityTooltip>
        <ComplexityTooltip type="sc">
          <DSComplexity>
            <span>sc</span>
            <sup>
              <img src={tooltipSvg} alt="tooltipSvg" />
            </sup>
          </DSComplexity>
        </ComplexityTooltip>
      </DSHead>
      <DSItems items={filteredItems} />
    </DSSection>
  );
};

export default DataStructure;
