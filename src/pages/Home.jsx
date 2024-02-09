import React from "react";
import Navbar from "../components/Navbar";
import DataStructure from "../components/DataStructure";

const Home = (props) => {
  const { store } = props;
  const { items, language } = store;
  const dataStructures = items[language];

  return (
    <>
      <Navbar />
      {
        dataStructures && Object.keys(dataStructures).map((ds) => {
          return (
            <DataStructure 
              key={ds}
              title={ds.charAt(0).toUpperCase() + ds.slice(1)} 
              dataStructures={dataStructures}
            />
          )
        })
      }
    </>
  );
};

export default Home;
