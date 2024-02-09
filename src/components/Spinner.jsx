import React from "react";
import styled from "styled-components";
import { SyncLoader } from "react-spinners";

const SpinnerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: background-color 0.3s ease-out;
  ${({ loading }) =>
    loading
      ? `background-color: var(--bg-color)`
      : `display: none`}
`;

const SpinnerBlock = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Spinner = (props) => {
  return (
    <SpinnerOverlay loading={+props.loading}>
      <SpinnerBlock>
        <SyncLoader
          color="white"
          loading={+props.loading}
          aria-label="Loading Spinner"
          size={24}
        />
      </SpinnerBlock>
    </SpinnerOverlay>
  );
};

export default Spinner;
