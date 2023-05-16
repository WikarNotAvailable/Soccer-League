export interface Goal {
  id: number;
  minute: number;
  playerID: number;
  matchID: number;
  clubID: number;
}

export interface POSTGoalBody {
  minute: number;
}

export interface PUTGoalBody {
  id: number;
  minute: number;
}

export interface POSTGoalParams {
  playerID: number;
  matchID: number;
  clubID: number;
}

export interface PUTGoalParams {
  playerID: number;
  matchID: number;
  clubID: number;
}
