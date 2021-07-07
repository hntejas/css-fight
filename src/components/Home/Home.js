import { useFightData } from "../../store/fights";
import Level from "./Level";
import "./home.css";

export default function Home() {
  const { fights, levels } = useFightData();

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
