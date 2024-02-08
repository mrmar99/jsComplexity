import React from "react";
import styled from "styled-components";

const ComplexityBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-family: "JetBrainsMonoExtraBold";
  font-size: 1rem;
  color: var(--bg-color);
  border-radius: 8px;
  width: 130px;

  ${({ $color }) =>
    $color ? `background-color: ${$color}` : `background-color: white`}
`;

export const Complexity = (props) => {
  const validColors = {
    green: "#03A500",
    lightgreen: "#6ACC74",
    limegreen: "#97DE00",
    orange: "#F9A13B",
    red: "#DF513D",
  };

  return (
    <ComplexityBadge $color={validColors[props.color]}>
      {props.title}
    </ComplexityBadge>
  );
};
