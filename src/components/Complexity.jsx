import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';

const ScComplexityBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "JetBrainsMonoExtraBold";
  font-size: 1rem;
  color: var(--bg-color);
  border-radius: 8px;
  min-width: 140px;
  height: 75px;
  padding: 0 5px;

  @media (max-width: 780px) {
    font-size: 0.7rem;
    min-width: 90px;
  }

  ${({ $color }) =>
    $color ? `background-color: ${$color}` : `background-color: white`}
`;

const TcComplexityBadge = styled.div`
  font-family: "JetBrainsMonoExtraBold";
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  min-width: 140px;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  height: 75px;
  color: var(--bg-color);

  @media (max-width: 780px) {
    min-width: 90px;
  }
`;

const TcComplexitySubBadge = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--description-bg-color);

  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom: none;
  }

  @media (max-width: 780px) {
    font-size: 0.7rem;
  }

  ${({ $color }) =>
    $color ? `background-color: ${$color}` : `background-color: white`};

  ${({ $size }) => `flex: ${$size}`};
`;

const Complexity = (props) => {
  const validColors = {
    green: "#03A500",
    lightgreen: "#6ACC74",
    limegreen: "#97DE00",
    orange: "#F9A13B",
    red: "#DF513D",
  };

  const { complexity, type } = props;

  if (type === "tc") {
    let { best, average, worst } = complexity;

    const complexities = [];

    if (best.title !== average.title && average.title !== worst.title) {
      complexities.push(best, average, worst);
    } else {
      if (best.title === average.title && average.title === worst.title) {
        worst = { ...worst, size: 3 };
        complexities.push(worst);
      } else if (best.title === average.title) {
        average = { ...average, size: 2 };
        complexities.push(average, worst);
      } else if (average.title === worst.title) {
        worst = { ...worst, size: 2 };
        complexities.push(best, worst);
      }
    }

    return (
      <TcComplexityBadge>
        {complexities.map(({ title, color, size }) => {
          return (
            <TcComplexitySubBadge key={uuidv4()} $color={validColors[color]} $size={size ? size : 1}>
              {title}
            </TcComplexitySubBadge>
          );
        })}
      </TcComplexityBadge>
    );
  } else if (type === "sc") {
    return (
      <ScComplexityBadge $color={validColors[complexity.color]}>
        {complexity.title}
      </ScComplexityBadge>
    );
  }
};

export default Complexity;
