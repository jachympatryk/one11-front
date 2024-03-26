// Definicje typów pomocniczych, jeśli istnieją specyficzne typy dla pól
enum FunctionaryRoleType {
    Coach = 'COACH',
    Assistant = 'ASSISTANT',
}

interface Team {
    id: number;
}

interface Club {
    id: number;
}

export interface FunctionaryModel {
    id: number;
    name: string;
    surname: string;
    role: FunctionaryRoleType;
    created_at: Date;
    teamId?: number;
    team?: Team;
    clubId?: number;
    club?: Club;
}
