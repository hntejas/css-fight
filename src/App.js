import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./components/Home/Home";
import Arena from "./components/Arena/Arena";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import PrivateRoute from "./utils/PrivateRoute";

import "./styles.css";
import { useUser } from "./store/user";
import { getUserFights } from "./services/fight.service";

export default function App() {
  const { user, userDispatch, userActionTypes } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    setIsLoading(true);
    if (user.isLoggedIn) {
      const response = await getUserFights();
      userDispatch({
        type: userActionTypes.SYNC_USER_FIGHTS,
        payload: {
          userFights: response.fights,
        },
      });
      setIsLoading(false);
    } else {
      userDispatch({
        type: userActionTypes.UPDATE_USER_LOGIN,
        payload: {
          isLoggedIn: false,
        },
      });
      setIsLoading(false);
    }
  }, [user.isLoggedIn]);

  if (isLoading) {
    return "Loading";
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
