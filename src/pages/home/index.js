import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { DataStructure } from "../../components/DataStructure/DataStructure";
import { Counter } from "../../features/counter";
import "./home.css";

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
