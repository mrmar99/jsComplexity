import React from "react";
import styled from "styled-components";

const SearchBar = styled.div`
  position: relative;
  flex: 1;
`;

const SearchInput = styled.input`
  padding: 1rem 1rem 1rem 3rem;
  background-color: transparent;
  border: 2px solid var(--main-color);
  border-radius: 8px;
  color: var(--main-color);
  font-size: 1.125rem;
  height: 100%;
  width: 100%;
  transition: all .15s ease-in;
  &:focus {
    border-color: var(--secondary-color);
    transition: all .15s ease-out;
  }
  &:focus + svg path {
    fill: var(--secondary-color);
    transition: all .15s ease-out;
  }
`;

const SearchSvg = styled.svg`
  position: absolute;
  top:50%;
  transform: translateY(-50%);
  left: 1rem;
`;

const Search = () => {
  return (
    <SearchBar>
      <SearchInput />
      <SearchSvg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1_48)">
          <path
            d="M23.5612 21.7519L18.9161 17.1048C22.3918 12.46 21.4441 5.87701 16.7993 2.40129C12.1545 -1.07443 5.57151 -0.126717 2.09579 4.51806C-1.37993 9.16283 -0.432213 15.7458 4.21256 19.2215C7.94363 22.0135 13.0682 22.0135 16.7993 19.2215L21.4464 23.8687C22.0304 24.4526 22.9772 24.4526 23.5612 23.8687C24.1451 23.2847 24.1451 22.3378 23.5612 21.7539L23.5612 21.7519ZM10.5446 18.3246C6.41659 18.3246 3.07018 14.9782 3.07018 10.8501C3.07018 6.72209 6.41659 3.37568 10.5446 3.37568C14.6727 3.37568 18.0191 6.72209 18.0191 10.8501C18.0147 14.9763 14.6709 18.3202 10.5446 18.3246Z"
            fill="#F4F4F4"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_48">
            <rect
              width="24"
              height="24"
              fill="white"
              transform="translate(0 0.306488)"
            />
          </clipPath>
        </defs>
      </SearchSvg>
    </SearchBar>
  );
};

export default Search;