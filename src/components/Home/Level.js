import { Link } from "react-router-dom";

export default function Level({ levelInfo, fights }) {
  return (
    <div className="level-container">
      <div className="level-header">
        Level #{levelInfo.id} - {levelInfo.name}
      </div>
      <div className="level-content">
        <div className="level-info">
          <span>{levelInfo.description}</span>
        </div>
        {fights.map((fight) => {
          return (
            <Link
              to={`/fight/${fight.fightId}`}
              className="fight-card"
              key={fight.fightId}
            >
              <img
                loading="lazy"
                src={fight.fightImg}
                className="fight-img"
              ></img>{" "}
              <span className="hover-fightid">#{fight.fightId}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
