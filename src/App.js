import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Arena from "./components/Arena/Arena";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import PrivateRoute from "./utils/PrivateRoute";

import "./styles.css";
import { useAppLoader } from "./utils/appLoaderHook";

export default function App() {
  const { isLoading } = useAppLoader();

  if (isLoading) {
    return "Loading...";
  }

  return (
    <>
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <PrivateRoute path="/fight/:fightId" element={<Arena />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}
