import { useContext } from "react";
import { UserContext } from "../store/userContext";
import { FightsContext } from "../store/fightsContext";
import * as actionTypes from "../store/userActionTypes";

export default function NavBar() {
  const { userState, userStateDispatch } = useContext(UserContext);
  const { fights } = useContext(FightsContext);

  const changeCurrentFight = (fightId) => {
    userStateDispatch({
      type: actionTypes.UPDATE_CURRENT_FIGHT,
      payload: {
        fightId: fightId
      }
    });
  };
  return (
    <div className="nav-container">
      <div className="logo">
        {" "}
        CSSFight
        <span role="img" aria-label="logo">
          ⚔️
        </span>
      </div>
      <div>
        <select
          className="fight-selector"
          value={userState.currentFightId}
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
  );
}
