import { useContext } from "react";
import { FightsContext } from "./fightsContext";

export function useFightData() {
  return useContext(FightsContext);
}
