export interface TableModel {
  rank: number;
  name: string;
  matches: number;
  points: number;
  wins: number;
  draws: number;
  losses: number;
  goalsForAgainst: string;
  homeWins: number;
  homeDraws: number;
  homeLosses: number;
  homeGoalsForAgainst: string;
  awayWins: number;
  awayDraws: number;
  awayLosses: number;
  awayGoalsForAgainst: string;
}

export interface MatchWeekModel {
  homeTeam: string;
  awayTeam: string;
  score: string;
  dateTime: number;
}

export interface MatchWeeksModel {
  weekInfo: string;
  matches: MatchWeekModel[];
}
