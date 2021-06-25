import { useUser } from "../../store/user";
import { useFightData } from "../../store/fights";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function NavBar() {
  const { user, userDispatch, userActionTypes } = useUser();
  const { fights } = useFightData();

  const authHandler = () => {
    userDispatch({
      type: userActionTypes.UPDATE_USER_LOGIN,
      payload: {
        isLoggedIn: !user.isLoggedIn,
      },
    });
  };

  const currentFight = fights.find(
    (fight) => fight.fightId === user.currentFightId
  );

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
          <div className="fight-selector">
            <div className="current-fight">
              {currentFight &&
                "#" + currentFight.fightId + " " + currentFight.fightName}
              <span>🔻</span>
            </div>
            <div className="fight-list">
              {fights.map((fight) => {
                return (
                  <Link
                    key={fight.fightId}
                    to={`/fight/${fight.fightId}`}
                    className="fight-list-item"
                  >
                    #{fight.fightId} {fight.fightName}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <button className="btn-logout" onClick={authHandler}>
        {user.isLoggedIn ? "Logout" : "Login"}
      </button>
    </div>
  );
}
