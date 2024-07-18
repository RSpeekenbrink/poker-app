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
    room: Room,
    user: User,
};
