import { createStore, createEvent } from "effector";
import contentData from "./content/data.json";

export const changeItems = createEvent();
export const changeLanguage = createEvent();
export const changeSearchInput = createEvent();

export default createStore({
  items: contentData,
  language: "ru",
  searchInputValue: ""
})
  .on(changeLanguage, (store, payload) => ({
    ...store,
    language: payload,
  }))
  .on(changeSearchInput, (store, payload) => ({
    ...store,
    searchInputValue: payload,
  }))
  .on(changeItems, (store, payload) => ({
    ...store,
    items: payload,
  }));