export type VotingOption = '☕' | '1' | '2' | '3' | '5' | '8' | '13' | '20' | '?';

export interface Room {
    slug: string;
    name: string;
}

export interface User {
    id: string;
    name: string;
    currentVote?: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    room?: Room,
    user?: User,
};
