import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./fonts/Inter-Black.woff2";
import "./fonts/Inter-ExtraBold.woff2";
import "./fonts/Inter-Regular.woff2";
import "./fonts/Inter-SemiBold.woff2";
import "./fonts/JetBrainsMono-ExtraBold.woff2";

const renderTarget = document.getElementById("app");
const root = createRoot(renderTarget);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);