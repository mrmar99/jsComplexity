import { attachReduxDevTools } from "@effector/redux-devtools-adapter";
import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import "./index.css";

attachReduxDevTools({
  trace: true
});

const renderTarget = document.getElementById("app");
const root = createRoot(renderTarget);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);