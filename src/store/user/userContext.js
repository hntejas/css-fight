import { createContext, useReducer, useEffect } from "react";
import { userReducer } from "./userReducer";
import { DEFAULT_CODE } from "../../utils/appConstants";
import * as userActionTypes from "./userActionTypes";

export const UserContext = createContext();

const initialUserState = {
  isLoggedIn: false,
  name: "",
  currentFightId: 1,
  allowSlideAndCompare: true,
  fights: [
    {
      fightId: 1,
      fightHighScore: 0,
      fightLastScore: 0,
      fightCode: DEFAULT_CODE,
    },
  ],
};

const cssFightLocalStorage = JSON.parse(localStorage.getItem("cssFightData"));

export default function UserContextProvider({ children }) {
  const [user, userDispatch] = useReducer(
    userReducer,
    cssFightLocalStorage || initialUserState
  );

  useEffect(() => {
    localStorage.setItem("cssFightData", JSON.stringify(user));
  });

  return (
    <UserContext.Provider value={{ user, userDispatch, userActionTypes }}>
      {children}
    </UserContext.Provider>
  );
}
