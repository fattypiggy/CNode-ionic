export class Topic {
    author: Author;
    author_id: string;
    content: string;
    create_at: string;
    good: boolean;
    id: string;
    is_collect: boolean;
    last_reply_at: string;
    replies: Array<Reply>;
    reply_count: number;
    tab: Tab;
    title: string;
    top: boolean;
    visit_count: number;
}

export class Author {
    avatar_url: string;
    loginname: string;
}

export enum Tab {
    ALL = 'all',
    GOOD = 'good',
    SHARE = 'share',
    ASK = 'ask',
    JOB = 'job',
    DEV = 'dev'
}

export class Reply {
    author: Author;
    content: string;
    create_at: string;
    id: string;
    is_uped: boolean;
    reply_id: string;
    ups: Array<string>;
}
