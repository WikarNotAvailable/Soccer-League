import React from "react";
import { POSTGoalBody } from "../types/Goals";

interface AddGoalAction {
  type: string;
  payload: string;
}

export const addGoalReducer = (state: any, action: AddGoalAction) => {
  if (action.type === "MINUTE_CHANGE") {
    return {
      ...state,
      minute: +action.payload
    };
  } else if (action.type === "PLAYER_CHANGE") {
    return {
      ...state,
      playerID: +action.payload
    };
  } else if (action.type === "MATCH_CHANGE") {
    return {
      ...state,
      matchID: +action.payload
    };
  } else if (action.type === "CLUB_CHANGE") {
    return {
      ...state,
      clubID: +action.payload
    };
  }
  return { minute: "", playerID: null, matchID: null, clubID: null };
};
