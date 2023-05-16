import React from "react";
import { POSTMatchBody } from "../types/Matches";

interface AddMatchAction {
  type: string;
  payload: any;
}

export const addMatchReducer = (state: any, action: AddMatchAction) => {
  if (action.type === "DATE_CHANGE") {
    return {
      ...state,
      matchDate: action.payload
    };
  } else if (action.type === "SCORE_CHANGE") {
    return {
      ...state,
      score: action.payload
    };
  } else if (action.type === "PLAYERS_CHANGE") {
    return {
      ...state,
      playerIDs: action.payload
    };
  } else if (action.type === "HOMECLUB_CHANGE") {
    return {
      ...state,
      homeClubID: +action.payload
    };
  } else if (action.type === "AWAYCLUB_CHANGE") {
    return {
      ...state,
      awayClubID: +action.payload
    };
  }
  return {
    matchDate: "",
    score: "",
    playerIDs: [null],
    homeClubID: null,
    awayClubID: null
  };
};
