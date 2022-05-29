export interface User {
    id?: number,
    firstName: string,
    currentEmoji?: string
}

export interface ApiEmoji {
    slug: string,
    character: string,
    unicodeName: string,
    codePoint: string,
    group: string,
    subGroup: string
}

export interface UserArr extends Array<User> {};
export interface EmojiArr extends Array<ApiEmoji> {};