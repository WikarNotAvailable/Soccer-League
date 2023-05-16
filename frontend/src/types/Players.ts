import { Goal } from "./Goals";
import { Match } from "./Matches";

export interface Player {
  id: number;
  firstName: string;
  surname: string;
  dateOfBirth: string;
  nationality: string;
  position: string;
  clubID: number;
  goals: Goal[];
  pmatches: Match[];
}

export interface POSTPlayerBody {
  firstName: string;
  surname: string;
  dateOfBirth: string;
  nationality: string;
  position: string;
}

export interface PUTPlayerBody {
  id: number;
  firstName?: string;
  surname?: string;
  dateOfBirth?: string;
  nationality?: string;
  position?: string;
}

export interface POSTPlayerParams {
  clubID: number;
}

export interface PUTPlayerParams {
  clubID: number;
}
