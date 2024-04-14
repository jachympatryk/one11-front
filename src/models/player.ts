interface Team {
  id: number;
}

interface Club {
  id: number;
}
export enum PlayerPosition {
  GOALKEEPER,
  DEFENDER,
  MIDFIELDER,
  STRIKER,
}

export interface PlayerModel {
  id: number;
  name: string;
  surname: string;
  date_of_birth: Date;
  number: number;
  active: boolean;
  created_at: Date;
  teamId?: number;
  team?: Team;
  clubId?: number;
  club?: Club;
  position: PlayerPosition;
}
