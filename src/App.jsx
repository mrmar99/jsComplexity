import React from "react";
import Home from "./pages/Home";
import ItemDescription from "./pages/ItemDescription";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Container from "./components/Container";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/:ds/:itemid", element: <ItemDescription /> },
  ]);

  return (
    <Container>
      <RouterProvider router={router} />
    </Container>
  );
};

export default App;
