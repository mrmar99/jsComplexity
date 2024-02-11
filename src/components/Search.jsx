import React from "react";
import styled from "styled-components";
import $store, { changeSearchInput } from "../store";
import { useUnit } from "effector-react";

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
  transition: all 0.15s ease-in;
  &:focus {
    border-color: var(--secondary-color);
    transition: all 0.15s ease-out;
  }
  &:focus + svg path {
    fill: var(--secondary-color);
    transition: all 0.15s ease-out;
  }
`;

const SearchSvg = styled.svg`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 1rem;
`;

const CrossSvg = styled.svg`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0.75rem;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: all 0.15s ease-in;

  &:hover path {
    fill: var(--secondary-color);
    transition: all 0.15s ease-out;
  }
`;

const Search = () => {
  const { searchInputValue } = useUnit($store);

  const onChange = ({ target }) => {
    changeSearchInput(target.value);
  };

  const onClearInput = () => {
    changeSearchInput("");
  };

  return (
    <SearchBar>
      <SearchInput value={searchInputValue} onChange={onChange} />
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
      {searchInputValue.length ? (
        <CrossSvg onClick={onClearInput}>
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.1211 12.3063L18.0001 8.42328C18.2519 8.13704 18.3853 7.76564 18.3731 7.38457C18.361 7.0035 18.2042 6.64137 17.9346 6.37178C17.665 6.10218 17.3028 5.94537 16.9218 5.9332C16.5407 5.92103 16.1693 6.05443 15.8831 6.30628L12.0001 10.1853L8.11006 6.29428C7.97073 6.15495 7.80532 6.04442 7.62327 5.96901C7.44122 5.89361 7.24611 5.8548 7.04906 5.8548C6.85202 5.8548 6.6569 5.89361 6.47485 5.96901C6.29281 6.04442 6.12739 6.15495 5.98806 6.29428C5.84873 6.43361 5.7382 6.59902 5.6628 6.78107C5.58739 6.96312 5.54858 7.15823 5.54858 7.35528C5.54858 7.55232 5.58739 7.74744 5.6628 7.92949C5.7382 8.11153 5.84873 8.27694 5.98806 8.41628L9.87906 12.3063L6.00006 16.1883C5.84793 16.3243 5.72515 16.4899 5.63923 16.6749C5.5533 16.86 5.50604 17.0607 5.50033 17.2646C5.49462 17.4686 5.53059 17.6716 5.60603 17.8612C5.68147 18.0508 5.7948 18.223 5.93908 18.3673C6.08336 18.5115 6.25557 18.6249 6.44516 18.7003C6.63475 18.7758 6.83774 18.8117 7.0417 18.806C7.24567 18.8003 7.44633 18.753 7.6314 18.6671C7.81648 18.5812 7.98207 18.4584 8.11806 18.3063L12.0001 14.4273L15.8781 18.3063C16.1595 18.5877 16.5411 18.7458 16.9391 18.7458C17.337 18.7458 17.7187 18.5877 18.0001 18.3063C18.2815 18.0249 18.4395 17.6432 18.4395 17.2453C18.4395 16.8473 18.2815 16.4657 18.0001 16.1843L14.1211 12.3063Z"
              fill="#F4F4F4"
            />
          </svg>
        </CrossSvg>
      ) : (
        <></>
      )}
    </SearchBar>
  );
};

export default Search;
