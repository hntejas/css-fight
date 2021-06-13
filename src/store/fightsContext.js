import { createContext } from "react";

import fight1Img from "../images/level1.png";
import fight2Img from "../images/level2.png";
import fight3Img from "../images/level3.png";
import fight4Img from "../images/level4.png";
import fight5Img from "../images/level5.png";

const fights = [
  {
    fightId: 1,
    fightName: "Simple Box",
    fightImg: fight1Img,
    fightColors: ["#5d3a3a", "#b5e0ba"]
  },
  {
    fightId: 2,
    fightName: "The Fort",
    fightImg: fight2Img,
    fightColors: ["#62374e", "#fdc57b"]
  },
  {
    fightId: 3,
    fightName: "Spring Leaves",
    fightImg: fight3Img,
    fightColors: ["#0B2429", "#F3AC3C", "#998235"]
  },
  {
    fightId: 4,
    fightName: "Diamonds",
    fightImg: fight4Img,
    fightColors: ["#222730", "#4CAAB3", "#393E46"]
  },
  {
    fightId: 5,
    fightName: "Cool Pyramids",
    fightImg: fight5Img,
    fightColors: ["#007065", "#FFEECF", "#F5C181", "#00A79D"]
  }
];

export const FightsContext = createContext();

export default function FightsContextProvider({ children }) {
  return (
    <FightsContext.Provider value={{ fights }}>
      {children}
    </FightsContext.Provider>
  );
}
