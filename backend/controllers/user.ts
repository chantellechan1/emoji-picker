import * as UserModels from '../models/user';
import users from '../data/user';

// common useful utility functions
const emojiFromCodePoint = (codePoint: string): string => {
    const hexFromCodePoint = parseInt(`0x${codePoint}`, 16)
    const emoji = String.fromCodePoint(hexFromCodePoint);
    return emoji;
}

export const addUser = (firstName: string, currentEmoji: string): UserModels.UserModel => { 
    return users.addUser(firstName, currentEmoji);
}

export const getCurrentEmoji = (firstName: string): string => {
    let emoji: string;

    const userFromData = users.getUser(firstName);

    // if either the user does not exist or the user emoji is not set
    // return empty string
    if (typeof userFromData !== 'undefined' && userFromData.hasOwnProperty('currentEmoji')) {
        emoji = emojiFromCodePoint(userFromData.currentEmoji as string);
    } else {
        emoji = '';
    }
    return emoji;
};

export const setCurrentEmoji = (firstName: string, current_emoji: string): void => {
    const userFromData = users.getUser(firstName);
    if (typeof userFromData !== 'undefined') {
        userFromData.currentEmoji = current_emoji;
        users.setUserEmoji(userFromData);
    }
};

// TODO: move this into it's own controller, dealing with groups of users
export const getAllUsers = (): UserModels.Users => {
    const allUsers = users.getAllUsers();

    // map codePoints for emojis to actual emoji characters
    return allUsers.map((user: UserModels.UserModel) => {
        let userWithEmojiChar = {...user};
        if (typeof user.currentEmoji != 'undefined') {
            userWithEmojiChar.currentEmoji = emojiFromCodePoint(user.currentEmoji);
        }
        return userWithEmojiChar;
    });
}