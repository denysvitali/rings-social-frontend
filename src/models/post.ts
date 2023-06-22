export type Post = {
    id: number,
    posted_on: string,
    ring_name: string,
    ring_color: string,
    author_username: string,
    title: string,
    link: string,
    domain: string,
    score: number,
    commentsCount: number,
    ups: number,
    downs: number,
    nsfw: boolean,

    body?: string,
};
