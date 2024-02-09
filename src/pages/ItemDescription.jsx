import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SyncLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import { fetchItems } from "../store";

const ItemDescription = (props) => {
  const { ds, itemid } = useParams();
  const { store } = props;
  const { items, language } = store;
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({});
  console.log("eblan?", store, items);

  useEffect(() => {
    const fetchData = async () => {
      await fetchItems();
      setLoading(false);
    };

    if (Object.keys(items).length === 0) {
      fetchData();
    } else {
      const item = items[language][ds][`${ds}/${itemid}`];
      setItem(item);
      setLoading(false);
    }
  }, [items]);

  const { title, content, tc, tcColor, sc, scColor } = item;

  return (
    <>
      <Navbar />
      <SyncLoader
        color="white"
        loading={loading}
        aria-label="Loading Spinner"
      />
      {Object.keys(item).length ? (
        <>
          <h1>{title}</h1>
          <Markdown>{content}</Markdown>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ItemDescription;
