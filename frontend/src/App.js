import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
import Homepage from "./pages/HomePage/homepage";
import Products from "./pages/products/products";
import InventoryProvider from "./providers/inventory.provider";
function App() {
  return (
    <div style={{ height: "100%" }}>
      <Helmet>
        <title>Inventory</title>
      </Helmet>
      <InventoryProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/products" element={<Products />} />
          </Routes>
        </Router>
      </InventoryProvider>
    </div>
  );
}

export default App;
