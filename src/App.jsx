import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import HomePage from "./Pages/HomePage/HomePage";
import ShopPage from "./Pages/ShopPage/ShopPage";
import CartPage from "./Pages/CartPage/CartPage";
import { useState } from "react";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";

function App() {

  const [shoppingCart, setShoppingCart] = useState([]);

  function addToCart(product, count) {
    const productInCart = shoppingCart.find((cart) => cart.id === product.id);
    if (productInCart) {
      const productInCartCount = productInCart.count;
      const productInCartIndex = shoppingCart.findIndex(
        (cart) => cart.id === product.id
      );
      const updatedCart = [...shoppingCart];
      updatedCart[productInCartIndex] = {
        ...updatedCart[productInCartIndex],
        count: productInCartCount + count,
      };

      setShoppingCart(updatedCart);

      return;
    }

    const updatedCart = [...shoppingCart, product];
    setShoppingCart(updatedCart);
  }

  function removeFromCart(productId) {
    const productInCartIndex = shoppingCart.findIndex(
      (cart) => cart.id === productId
    );
    const updatedCart = [...shoppingCart];
    updatedCart.splice(productInCartIndex, 1);
    setShoppingCart(updatedCart);
  }

  function cartCountIncrement(productId) {
    const productInCartIndex = shoppingCart.findIndex(
      (cart) => cart.id === productId
    );
    const updatedCart = [...shoppingCart];

    updatedCart[productInCartIndex].count += 1;

    setShoppingCart(updatedCart);
  }

  function cartCountDecrement(productId) {
    const productInCartIndex = shoppingCart.findIndex(
      (cart) => cart.id === productId
    );
    const updatedCart = [...shoppingCart];

    if (updatedCart[productInCartIndex].count === 1) {
      return;
    }

    updatedCart[productInCartIndex].count -= 1;

    setShoppingCart(updatedCart);
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/shop"
          element={
            <ShopPage shoppingCart={shoppingCart} addToCart={addToCart} />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              shoppingCart={shoppingCart}
              removeFromCart={removeFromCart}
              cartCountIncrement={cartCountIncrement}
              cartCountDecrement={cartCountDecrement}
            />
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
