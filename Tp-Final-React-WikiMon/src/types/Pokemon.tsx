export interface ApiStat {
    base_stat: number;
    stat: { name: string };
}

export interface ApiType {
    type: {
        name: string;
    };
}

export interface ApiMoveDetails {
    move: { name: string; url: string };
    version_group_details: Array<{
        level_learned_at: number;
        move_learn_method: {
            name: string;
        };
        version_group: {
            name: string;
        };
    }>;
}

export interface PokeApiResponse {
    id: number;
    name: string;
    height: number;
    weight: number;
    stats: ApiStat[];
    types: ApiType[];
    moves: ApiMoveDetails[];
}
