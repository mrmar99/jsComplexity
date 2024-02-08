import React from "react";
import { DSItems } from "./DSItems";
import styled from "styled-components";
import tooltipSvg from "../svg/fi-br-interrogation.svg";

const DSSection = styled.section`
  margin-top: 3.5rem;
`;

const DSTitle = styled.h2`
  font-family: "InterExtraBold";
  font-size: 3rem;
  margin-bottom: 1.5rem;
`;

const DSHead = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  padding-right: 10px;
  user-select: none;
`;

const DSHeadTitleDummy = styled.div`
  flex: 3;
`;

const DSComplexity = styled.div`
  font-family: "InterRegular";
  font-size: 2rem;
  text-align: center;
  width: 130px;
`;

export const DataStructure = () => {
  return (
    <DSSection>
      <DSTitle>Array</DSTitle>
      <DSHead>
        <DSHeadTitleDummy />
        <DSComplexity>
          tc
          <sup>
            <img src={tooltipSvg} alt="tooltipSvg" />
          </sup>
        </DSComplexity>
        <DSComplexity>
          sc
          <sup>
            <img src={tooltipSvg} alt="tooltipSvg" />
          </sup>
        </DSComplexity>
      </DSHead>
      <DSItems />
    </DSSection>
  );
};
