import React from "react";
import { POSTClubBody } from "./../types/Clubs";

interface AddClubAction {
  type: string;
  payload: string;
}

export const addClubReducer = (state: POSTClubBody, action: AddClubAction) => {
  if (action.type === "NAME_CHANGE") {
    return {
      ...state,
      name: action.payload
    };
  } else if (action.type === "COUNTRY_CHANGE") {
    return {
      ...state,
      country: action.payload
    };
  } else if (action.type === "DATE_CHANGE") {
    return {
      ...state,
      foundationDate: action.payload
    };
  } else if (action.type === "TRAINER_CHANGE") {
    return {
      ...state,
      trainer: action.payload
    };
  }
  return { name: "", country: "", foundationDate: "", trainer: "" };
};
