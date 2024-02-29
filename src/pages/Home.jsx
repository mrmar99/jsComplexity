import React from "react";
import Navbar from "../components/Navbar";
import DataStructure from "../components/DataStructure";
import { useUnit } from "effector-react";
import $store from "../store";

const Home = () => {
  const store = useUnit($store);
  const { items, language } = store;
  const dataStructures = items[language];

  return (
    <>
      <Navbar type="home" />
      {
        dataStructures && Object.keys(dataStructures).map((ds) => {
          return (
            <DataStructure 
              key={ds}
              title={ds} 
              dataStructures={dataStructures}
            />
          )
        })
      }
    </>
  );
};

export default Home;
