import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import Success from "./pages/Success";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Layout><Home /></Layout>
        } />

        <Route path="/shop" element={
          <Layout><Shop /></Layout>
        } />

        <Route path="/product/:id" element={
          <Layout><Product /></Layout>
        } />

        <Route path="/cart" element={
          <Layout><Cart /></Layout>
        } />

        <Route path="/checkout" element={
          <Layout><Checkout /></Layout>
        } />

        <Route path="/success" element={
          <Layout><Success /></Layout>
        } />

        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
