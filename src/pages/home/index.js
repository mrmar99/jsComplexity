import React from "react";
import { Navbar } from "../../components/Navbar";
import { DataStructure } from "../../components/DataStructure";
import { Counter } from "../../features/counter";

export const Home = () => {
  return (
    <main className="page page--home">
      <section className="container">
        <Navbar />
        <DataStructure />
        <DataStructure />
        <DataStructure />
      </section>
    </main>
  );
};
