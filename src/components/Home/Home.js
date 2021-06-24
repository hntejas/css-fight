import { useContext } from "react";
import { FightsContext } from "../../store/fightsContext";
import Level from "./Level";
import "./home.css";

export default function Home() {
  const { fights, levels } = useContext(FightsContext);

  return (
    <div>
      <div className="home-header">Levels</div>
      {levels.map((level) => {
        const levelFights = fights.filter(
          (fight) => fight.levelId === level.id
        );
        return <Level levelInfo={level} fights={levelFights} key={level.id} />;
      })}
    </div>
  );
}
