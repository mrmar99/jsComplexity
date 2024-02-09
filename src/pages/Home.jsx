import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DataStructure from "../components/DataStructure";
import Spinner from "../components/Spinner";

const Home = (props) => {
  const { store } = props;
  const { items, language, searchInputValue } = store;
  const dataStructures = items[language];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Object.keys(items).length) {
      setLoading(false);
    }
  }, [items, language, searchInputValue]);

  return (
    <>
      <Navbar type="home" />
      {
        dataStructures && Object.keys(dataStructures).map((ds) => {
          const title = ds.charAt(0).toUpperCase() + ds.slice(1);

          return (
            <DataStructure 
              key={ds}
              title={title} 
              dataStructures={dataStructures}
            />
          )
        })
      }
      <Spinner loading={loading} />
    </>
  );
};

export default Home;
