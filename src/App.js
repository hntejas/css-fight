import UserContextProvider from "./store/user/userContext";
import FightsContextProvider from "./store/fightsContext";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./components/Home/Home";
import Arena from "./components/Arena/Arena";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";

import "./styles.css";

export default function App() {
  return (
    <>
      <ToastContainer />
      <UserContextProvider>
        <FightsContextProvider>
          <NavBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/fight/:fightId" element={<Arena />} />
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </FightsContextProvider>
      </UserContextProvider>
    </>
  );
}
