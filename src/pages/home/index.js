import React from "react";
import Navbar from "../../components/Navbar";
import DataStructure from "../../components/DataStructure";
import Container from "../../components/Container";
import { Counter } from "../../features/counter";

export const Home = () => {
  return (
    <Container>
      <Navbar />
      <DataStructure />
      <DataStructure />
      <DataStructure />
    </Container>
  );
};
