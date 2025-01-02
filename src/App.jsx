import { useLocation } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import HomePage from "./Pages/IntroductionPage/HomePage";
import ShopPage from "./Pages/ShopPage/ShopPage";

function App() {
  const location = useLocation();
  const locationPathName = location.pathname;

  return (
    <>
      <Header />
      {locationPathName === "/shop" ? <ShopPage /> : <HomePage />}
    </>
  );
}

export default App;
