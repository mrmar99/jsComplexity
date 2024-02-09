import React, { useEffect } from "react";
import Home from "./pages/Home";
import ItemDescription from "./pages/ItemDescription";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Container from "./components/Container";
import { fetchItems } from "./store";
import { useUnit } from "effector-react";
import $store from "./store";

const App = () => {
  const [store] = useUnit([$store, fetchItems.done]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchItems();
    };
  
    fetchData();
  }, []);

  const router = createBrowserRouter([
    { path: "/", element: <Home store={store} /> },
    { path: "/:ds/:itemid", element: <ItemDescription store={store} /> },
  ]);

  return (
    <Container>
      <RouterProvider router={router} />
    </Container>
  );
};

export default App;
