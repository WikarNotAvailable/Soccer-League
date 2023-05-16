import { Goal } from "./Goals";
import { Player } from "./Players";

export interface Match {
  id: number;
  matchDate: string;
  score: string;
  homeClubID: number;
  awayClubID: number;
  goals: Goal[];
  mplayers: Player[];
}

export interface POSTMatchBody {
  matchDate: string;
  score: string;
  playerIDs: number[];
}

export interface PUTMatchBody {
  id: number;
  matchDate?: string;
  playerIDs: number[];
}

export interface POSTMatchParams {
  homeClubID: number;
  awayClubID: number;
}

export interface PUTMatchParams {
  homeClubID: number;
  awayClubID: number;
}
