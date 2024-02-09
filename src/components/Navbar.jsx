import React from "react";
import Language from "./Language";
import Search from "./Search";
import styled from "styled-components";
import logo from "../svg/logo.svg";
import { Link } from "react-router-dom";
import leftArrowSvg from "../svg/leftArrow.svg";

const Nav = styled.nav`
  height: 50px;
  display: flex;
  justify-content: space-between;
  column-gap: ${({ type }) => type === "home" && "24px"};
`;

const LogoBlock = styled(Link)`
  flex-shrink: ${({ type }) => type === "home" && "0"};
  position: ${({ type }) => type === "item" && "absolute"};
  left: ${({ type }) => type === "item" && "50%"};
  transform: ${({ type }) => type === "item" && "translateX(-50%)"};

  @media (max-width: 780px) {
    display: none;
  }
`;

const Logo = styled.img.attrs({
  src: `${logo}`,
})`
  @media (max-width: 780px) {
    width: 0;
  }
`;

const LeftArrowBlock = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: var(--description-bg-color);
  border: 2px solid var(--secondary-color);
  padding: 12px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color .2s ease-in;

  &:hover {
    background-color: transparent;
    transition: background-color .2s ease-out;
  }
`;

const LeftArrow = styled.img.attrs({
  src: `${leftArrowSvg}`,
})``;

const Navbar = (props) => {
  return (
    <Nav type={props.type}>
      {props.type === "item" && (
        <LeftArrowBlock to="/">
          <LeftArrow />
        </LeftArrowBlock>
      )}
      <LogoBlock type={props.type} to="/">
        <Logo type={props.type} />
      </LogoBlock>
      {props.type === "home" && <Search />}
      <Language />
    </Nav>
  );
};

export default Navbar;
