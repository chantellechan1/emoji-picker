export interface UserModel {
    id: number,
    firstName: string, // to limit complexity, we assume no users with same firstName
    //unicode value for a given emoji
    // maps to codePoint returned from emoji-api
    currentEmoji?: string 
}

export interface Users extends Array<UserModel> {};