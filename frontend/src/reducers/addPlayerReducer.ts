import React from "react";
import { POSTPlayerBody } from "./../types/Players";

interface AddPlayerAction {
  type: string;
  payload: string;
}

export const addPlayerReducer = (
  state: POSTPlayerBody,
  action: AddPlayerAction
) => {
  if (action.type === "FIRSTNAME_CHANGE") {
    return {
      ...state,
      firstName: action.payload
    };
  } else if (action.type === "SURNAME_CHANGE") {
    return {
      ...state,
      surname: action.payload
    };
  } else if (action.type === "NATIONALITY_CHANGE") {
    return {
      ...state,
      nationality: action.payload
    };
  } else if (action.type === "DATE_CHANGE") {
    return {
      ...state,
      dateOfBirth: action.payload
    };
  } else if (action.type === "POSITION_CHANGE") {
    return {
      ...state,
      position: action.payload
    };
  }
  return {
    firstName: "",
    surname: "",
    dateOfBirth: "",
    nationality: "",
    position: ""
  };
};
