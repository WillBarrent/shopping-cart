import App from "./App.jsx";
import ErrorPage from "./Pages/ErrorPage/ErrorPage.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/shop",
    element: <App />,
  },
  {
    path: "/cart",
    element: <App />,
  }
];

export default routes;
