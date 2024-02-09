import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import { fetchItems } from "../store";
import Spinner from "../components/Spinner";

const ItemDescription = (props) => {
  const { ds, itemid } = useParams();
  const { store } = props;
  const { items, language } = store;
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({});

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
      {Object.keys(item).length ? (
        <>
          <h1>{title}</h1>
          <Markdown>{content}</Markdown>
        </>
      ) : (
        <></>
      )}
      <Spinner loading={loading} />
    </>
  );
};

export default ItemDescription;
