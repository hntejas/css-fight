import * as actionTypes from "./userActionTypes";
import { DEFAULT_FIGHT_STATE, DEFAULT_CODE } from "../appConstants";

const updateUserLogin = (state, { isLoggedIn, name }) => {
  if (!isLoggedIn) {
    localStorage.removeItem("cssFightAuth");
  }
  return {
    ...state,
    isLoggedIn: isLoggedIn,
    name: isLoggedIn ? name : "",
  };
};

const syncUserFights = (state, { userFights }) => {
  return {
    ...state,
    fights: userFights,
  };
};

const updateCurrentFight = (state, { fightId }) => {
  const stateCopy = { ...state };

  stateCopy.currentFightId = fightId;

  const isFightStartedByUser = isFightStarted(stateCopy.fights, fightId);
  if (!isFightStartedByUser) {
    stateCopy.fights = stateCopy.fights.concat([
      {
        ...DEFAULT_FIGHT_STATE,
        fightId: fightId,
      },
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

const submitFight = (state, { fightId, fightCode, fightScores }) => {
  let stateCopy = { ...state };
  stateCopy.fights = stateCopy.fights.map((fight) => {
    if (fight.fightId === fightId) {
      return { ...fight, fightCode, ...fightScores };
    }
    return fight;
  });
  return stateCopy;
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_USER_LOGIN:
      return updateUserLogin(state, action.payload);
    case actionTypes.SYNC_USER_FIGHTS:
      return syncUserFights(state, action.payload);
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
