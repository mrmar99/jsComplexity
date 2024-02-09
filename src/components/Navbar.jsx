import React from "react";
import Language from "./Language";
import Search from "./Search";
import styled from "styled-components";
import logo from "../svg/logo.svg";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  height: 50px;
  display: flex;
  justify-content: space-between;
  column-gap: 24px;
`;

const Logo = styled.img.attrs({
  src: `${logo}`
})`
  flex-shrink: 0;
`;

const Navbar = () => {
  return (
    <Nav>
      <Link to="/"><Logo /></Link>
      <Search />
      <Language />
    </Nav>
  );
};

export default Navbar;
