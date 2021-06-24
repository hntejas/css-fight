import { useContext } from "react";
import { useUser } from "../store/user";
import { Link } from "react-router-dom";
import { FightsContext } from "../store/fightsContext";
import * as actionTypes from "../store/user/userActionTypes";

export default function NavBar() {
  const { user, userDispatch, userActionTypes } = useUser();
  const { fights } = useContext(FightsContext);

  const changeCurrentFight = (fightId) => {
    userDispatch({
      type: actionTypes.UPDATE_CURRENT_FIGHT,
      payload: {
        fightId: fightId,
      },
    });
  };

  const authHandler = () => {
    userDispatch({
      type: userActionTypes.UPDATE_USER_LOGIN,
      payload: {
        isLoggedIn: !user.isLoggedIn,
      },
    });
  };

  return (
    <div className="nav-container">
      <div className="flex-wrapper">
        <Link className="logo" to="/">
          {" "}
          CSSFight
          <span role="img" aria-label="logo">
            ⚔️
          </span>
        </Link>
        <div>
          <select
            className="fight-selector"
            value={user.currentFightId}
            onChange={(e) => {
              const fightId = parseInt(e.target.value, 10);
              changeCurrentFight(fightId);
            }}
          >
            {fights.map((fight) => {
              return (
                <option
                  key={fight.fightId}
                  id={fight.fightId}
                  value={fight.fightId}
                >
                  #{fight.fightId} {fight.fightName}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <button className="btn-logout" onClick={authHandler}>
        {user.isLoggedIn ? "Logout" : "Login"}
      </button>
    </div>
  );
}
