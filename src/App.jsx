import { useLocation } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import HomePage from "./Pages/HomePage/HomePage";
import ShopPage from "./Pages/ShopPage/ShopPage";
import CartPage from "./Pages/CartPage/CartPage";
import { useState } from "react";

function App() {
  const location = useLocation();
  const locationPathName = location.pathname;

  const [shoppingCart, setShoppingCart] = useState([]);

  function addToCart(product) {
    const updatedCart = [...shoppingCart, product];
    setShoppingCart(updatedCart);
  }

  return (
    <>
      <Header />
      {locationPathName === "/shop" ? (
        <ShopPage shoppingCart={shoppingCart} addToCart={addToCart} />
      ) : locationPathName === "/cart" ? (
        <CartPage shoppingCart={shoppingCart} />
      ) : (
        <HomePage />
      )}
    </>
  );
}

export default App;
