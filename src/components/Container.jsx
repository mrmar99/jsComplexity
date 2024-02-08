import React from "react";
import styled from "styled-components";

const ContainerBlock = styled.section`
  width: 752px;
  padding: 3rem 1rem; 
`;

const Container = ({ children }) => {
  return (
    <ContainerBlock>
      {children}
    </ContainerBlock>
  );
};

export default Container;
