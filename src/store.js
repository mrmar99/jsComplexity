import { createStore, createEvent } from "effector";
import contentData from "./content/data.json";

console.log(navigator.language)

export const changeItems = createEvent();
export const changeLanguage = createEvent();
export const changeSearchInput = createEvent();

const languages = new Set(["ru", "en"]);
const userLanguage = navigator.language.split('-')[0];
const language = languages.has(userLanguage) ? userLanguage : "en";

export default createStore({
  items: contentData,
  language,
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