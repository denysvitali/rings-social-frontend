export type Ring = {
    name: string;
    title: string;
    displayName: string;
    description: string;
    createdAt: string;
    nsfw: boolean;
    subscribers: number;
    primaryColor: string;
};

export type Author = {
    username: string;
    displayName: string;
    createdAt: string;
};

export type SimplePost = {
    id: number;
    createdAt: string;
    ringName: string;
    ringColor: string;
    authorUsername: string;
    title: string;
    body?: string;
    link: string;
    domain: string;
    score: number;
    commentsCount: number;
    ups: number;
    downs: number;
    nsfw: boolean;
};

export type Comment = {
    id: number;
    depth: number;
    createdAt: string;
    updatedAt: string;
    post_id: number;
    parent_id: number | null;
    author_id: string;
    author: Author;
    body: string;
    ups: number;
    downs: number;
    score: number;
    replies: Comment[] | null;
}


export type Post = {
    id: number;
    createdAt: string;
    updatedAt: string;
    ringName: string;
    ring: Ring;
    author_username: string;
    author: Author;
    body?: string;
    title: string;
    link: string;
    domain: string;
    score: number;
    commentsCount: number;
    ups: number;
    downs: number;
    nsfw: boolean;
};