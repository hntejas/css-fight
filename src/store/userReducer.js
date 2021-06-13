import * as actionTypes from "./userActionTypes";
import {
  FIGHT_STATUSES,
  DEFAULT_FIGHT_STATE,
  DEFAULT_CODE
} from "./appConstants";

const updateCurrentFight = (state, { fightId }) => {
  const stateCopy = { ...state };
  if (stateCopy.currentFightId === fightId) return;

  stateCopy.currentFightId = fightId;

  const isFightStartedByUser = isFightStarted(stateCopy.fights, fightId);
  if (!isFightStartedByUser) {
    stateCopy.fights = stateCopy.fights.concat([
      {
        ...DEFAULT_FIGHT_STATE,
        fightId: fightId,
        fightStatus: FIGHT_STATUSES.IN_PROGRESS
      }
    ]);
  }

  return stateCopy;
};

const isFightStarted = (fights, fightId) => {
  return fights.findIndex((fight) => fight.fightId === fightId) !== -1;
};

const updateFightCode = (state, { fightId, fightCode }) => {
  let stateCopy = { ...state };
  stateCopy.fights = stateCopy.fights.map((fight) => {
    if (fight.fightId === fightId) {
      return { ...fight, fightCode: fightCode };
    }
    return fight;
  });
  return stateCopy;
};

const resetFightCode = (state, { fightId }) => {
  let stateCopy = { ...state };
  stateCopy.fights = stateCopy.fights.map((fight) => {
    if (fight.fightId === fightId) {
      return { ...fight, fightCode: DEFAULT_CODE };
    }
    return fight;
  });
  return stateCopy;
};

const updateSlideAndCompareFlag = (state, { slideAndCompareFlag }) => {
  return { ...state, allowSlideAndCompare: slideAndCompareFlag };
};

const submitFight = (state, { fightId, fightCode, fightScore }) => {
  let stateCopy = { ...state };
  stateCopy.fights = stateCopy.fights.map((fight) => {
    if (fight.fightId === fightId) {
      let fightCopy = { ...fight };
      fightCopy.fightCode = fightCode;
      fightCopy.fightLastScore = fightScore;
      fightCopy.fightHighScore =
        fightScore > fightCopy.fightHighScore
          ? fightScore
          : fightCopy.fightHighScore;
      fightCopy.fightStatus =
        fightScore === 100
          ? FIGHT_STATUSES.COMPLETED
          : FIGHT_STATUSES.IN_PROGRESS;
      return fightCopy;
    }
    return fight;
  });
  return stateCopy;
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CURRENT_FIGHT:
      return updateCurrentFight(state, action.payload);
    case actionTypes.UPDATE_FIGHT_CODE:
      return updateFightCode(state, action.payload);
    case actionTypes.UPDATE_SLIDE_COMPARE_FLAG:
      return updateSlideAndCompareFlag(state, action.payload);
    case actionTypes.RESET_FIGHT_CODE:
      return resetFightCode(state, action.payload);
    case actionTypes.SUBMIT_FIGHT:
      return submitFight(state, action.payload);
    default:
      return state;
  }
};
