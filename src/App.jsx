import React from "react";
import Home from "./pages/Home";
import ItemPage from "./pages/ItemPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Container from "./components/Container";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/:itemid", element: <ItemPage /> }
]);

const App = () => {
  return (
    <Container>
      <RouterProvider router={router} />
    </Container>
  );
};

export default App;
