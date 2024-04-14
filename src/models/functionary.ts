enum FunctionaryRoleType {
  PRESIDENT,
  COACH,
  MANAGEMENT,
  OTHER,
  HEALTHCARE,
}

export interface FunctionaryModel {
  clubId?: number;
  created_at: Date;
  id: number;
  name: string;
  surname: string;
  role: FunctionaryRoleType;
  teamId?: number;
}
