export type VotingOption = '☕' | '1' | '2' | '3' | '5' | '8' | '13' | '20' | '?';

export type Votes = {
    [key: string]: VotingOption;
}

export type VotingEvent = {
    user_id: string;
    vote: VotingOption;
    room_votes: Votes;
}

export interface Room {
    slug: string;
    name: string;
    votes: Votes;
}

export interface User {
    id: string;
    name: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    room?: Room;
    user?: User;
};
