import React from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

const ItemPage = () => {
  const { itemid } = useParams();

  return (
    <>
      <Navbar />
      <span>{itemid}</span>
    </>
  );
};

export default ItemPage;
