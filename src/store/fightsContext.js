import { createContext } from "react";

const levels = [
  {
    id: 1,
    name: "Pilot Battle",
    description: "Fun warm-up targets to play",
  },
  {
    id: 2,
    name: "Visibility",
    description: "6 targets unlocked to wield your CSS sword",
  },
  {
    id: 3,
    name: "Cursor",
    description: "First ever mini-battle. 2 Targets. Some intense CSS golfing.",
  },
  {
    id: 4,
    name: "Display",
    description: "2 fun targets to flex your muscles",
  },
  {
    id: 5,
    name: "Inline",
    description: "Ultimate crash course for CSS",
  },
];
const fights = [
  {
    fightId: 1,
    levelId: 1,
    fightName: "Simple Box",
    fightImg: "/images/1.png",
    fightColors: ["#5d3a3a", "#b5e0ba"],
  },
  {
    fightId: 2,
    levelId: 1,
    fightName: "The Fort",
    fightImg: "/images/2.png",
    fightColors: ["#62374e", "#fdc57b"],
  },
  {
    fightId: 3,
    levelId: 1,
    fightName: "Spring Leaves",
    fightImg: "/images/3.png",
    fightColors: ["#0B2429", "#F3AC3C", "#998235"],
  },
  {
    fightId: 4,
    levelId: 1,
    fightName: "Diamonds",
    fightImg: "/images/4.png",
    fightColors: ["#222730", "#4CAAB3", "#393E46"],
  },
  {
    fightId: 5,
    levelId: 1,
    fightName: "Cool Pyramids",
    fightImg: "/images/5.png",
    fightColors: ["#007065", "#FFEECF", "#F5C181", "#00A79D"],
  },
  {
    fightId: 6,
    levelId: 2,
    fightName: "Corner",
    fightImg: "/images/6.png",
    fightColors: ["#0B2429", "#F3AC3C"],
  },
  {
    fightId: 7,
    levelId: 2,
    fightName: "Eye for it",
    fightImg: "/images/7.png",
    fightColors: ["#0B2429", "#998235", "#F3AC3C"],
  },
  {
    fightId: 8,
    levelId: 2,
    fightName: "Cloud",
    fightImg: "/images/8.png",
    fightColors: ["#F5D6B4", "#D86F45"],
  },
  {
    fightId: 9,
    levelId: 3,
    fightName: "Star",
    fightImg: "/images/9.png",
    fightColors: ["#F3AC3C", "#1A4341"],
  },
  {
    fightId: 10,
    levelId: 3,
    fightName: "Tilt",
    fightImg: "/images/10.png",
    fightColors: ["#6592CF", "#243D83"],
  },
  {
    fightId: 11,
    levelId: 4,
    fightName: "Blue Spin",
    fightImg: "/images/11.png",
    fightColors: ["#191919", "#F9E492", "#4F77FF"],
  },
  {
    fightId: 12,
    levelId: 4,
    fightName: "Switch-O-Switch",
    fightImg: "/images/12.png",
    fightColors: ["#62306D", "#F7EC7D", "#AA445F", "#E38F66"],
  },
  {
    fightId: 13,
    levelId: 5,
    fightName: "Waterfall",
    fightImg: "/images/13.png",
    fightColors: ["#F7EC7D", "#E38F66", "#AA445F", "#62306D"],
  },
  {
    fightId: 14,
    levelId: 5,
    fightName: "Bandaid",
    fightImg: "/images/14.png",
    fightColors: ["#FFFFFF", "#F3AC3C", "#A3A368", "#FBE18C"],
  },
  {
    fightId: 15,
    levelId: 5,
    fightName: "Pizza",
    fightImg: "/images/15.png",
    fightColors: ["#E3516E", "#F7F3D7", "#51B5A9", "#FADE8B"],
  },
];

export const FightsContext = createContext();

export default function FightsContextProvider({ children }) {
  return (
    <FightsContext.Provider value={{ fights, levels }}>
      {children}
    </FightsContext.Provider>
  );
}
