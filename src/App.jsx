import { useLocation } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import HomePage from "./Pages/HomePage/HomePage";
import ShopPage from "./Pages/ShopPage/ShopPage";
import CartPage from "./Pages/CartPage/CartPage";

function App() {
  const location = useLocation();
  const locationPathName = location.pathname;

  return (
    <>
      <Header />
      {locationPathName === "/shop" ? <ShopPage /> : (locationPathName === "/cart") ? <CartPage /> : <HomePage />}
    </>
  );
}

export default App;
