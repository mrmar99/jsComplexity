import { createStore, createEvent, createEffect } from "effector";
import contentStructure from "./content/contentStructure.json";
import parseMD from "parse-md";

export const fetchItems = createEffect(async () => {
  const mds = {};

  try {
    for (const lang in contentStructure) {
      mds[lang] = {};
      for (const ds in contentStructure[lang]) {
        mds[lang][ds] = {};
        const mdFilePaths = contentStructure[lang][ds]["mdfiles"];
        await Promise.all(mdFilePaths.map(async mdFilePath => {
          const module = await import(`./content/${mdFilePath}`);
          const res = await fetch(module.default);
          const mdData = await res.text();
          const { content, metadata } = parseMD(mdData);
          const { title, slug, tc, tcColor, sc, scColor } = metadata;
          mds[lang][ds][slug] = {
            title,
            content,
            slug,
            tc,
            tcColor,
            sc,
            scColor,
          };
        }));
      }
    }

    return mds;
  } catch (err) {
    console.error(err);
    throw err;
  }
});


export const changeLanguage = createEvent();
export const changeSearchInput = createEvent();

export default createStore({
  items: {},
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
  .on(fetchItems.done, (store, { result }) => ({
    ...store,
    items: result,
  }));