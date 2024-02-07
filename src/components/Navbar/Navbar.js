import React from "react";
import { Language } from "../Language/Language";
import { Search } from "../Search/Search";
import logo from "./logo.svg";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav>
      <img src={logo} className="logo" alt="logo" />
      <Search className="search-input__block" />
      <Language className="language-toggle" />
    </nav>
  );
};
