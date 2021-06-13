import { createContext, useReducer, useEffect } from "react";
import { userReducer } from "./userReducer";
import { DEFAULT_CODE, FIGHT_STATUSES } from "./appConstants";

export const UserContext = createContext();

const initialUserState = {
  id: 1,
  name: "Tejas",
  currentFightId: 1,
  allowSlideAndCompare: true,
  fights: [
    {
      fightId: 1,
      fightStatus: FIGHT_STATUSES.NOT_STARTED,
      fightHighScore: 0,
      fightLastScore: 0,
      fightCode: DEFAULT_CODE
    }
  ]
};

const cssFightLocalStorage = JSON.parse(localStorage.getItem("cssFightData"));

export default function UserContextProvider({ children }) {
  const [userState, userStateDispatch] = useReducer(
    userReducer,
    // initialUserState
    cssFightLocalStorage || initialUserState
  );

  useEffect(() => {
    localStorage.setItem("cssFightData", JSON.stringify(userState));
  });

  return (
    <UserContext.Provider value={{ userState, userStateDispatch }}>
      {children}
    </UserContext.Provider>
  );
}
