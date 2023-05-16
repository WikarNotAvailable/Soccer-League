import { Goal } from "./Goals";
import { Match } from "./Matches";
import { Player } from "./Players";

export interface Club {
  id: number;
  name: string;
  country: string;
  foundationDate: string;
  trainer: string;
  players: Player[];
  homeMatches: Match[];
  awayMatches: Match[];
  goals: Goal[];
}

export interface POSTClubBody {
  name: string;
  country: string;
  foundationDate: string;
  trainer: string;
}

export interface PUTClubBody {
  id: number;
  name?: string;
  country?: string;
  foundationDate?: string;
  trainer?: string;
}
