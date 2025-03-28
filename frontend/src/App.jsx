import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Welcome from "./components/Welcome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Home/></>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <SignUp/>
  },
  {
    path: "/welcome/:name",
    element: <Welcome/>
  }
]);

function App() {

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
