import * as UserModels from '../models/user';

class UsersClass {
    users: UserModels.Users;

    constructor(users = []) {
        this.users = users;
    }

    addUser(firstName: string, currentEmoji: string): UserModels.UserModel {
        // TODO: check that user doesn't already exist
        // (make sure first name isn't reused)

        // sort users by ID
        this.users.sort((a, b) => a.id - b.id);

        // create userID for new
        let lastID: number;
        if (this.users.length > 0) {
            const lastUsedIndex = this.users.length - 1;
            lastID = this.users[lastUsedIndex].id;
        } else {
            lastID = 0;
        }

        // create new user
        const newUser: UserModels.UserModel = {
            id: lastID + 1,
            firstName,
            currentEmoji
        }

        // add new user
        this.users.push(newUser);

        // return the new user
        return newUser;
    }

    getUser(firstName: string) {
        return this.users.find((user: UserModels.UserModel) => user.firstName == firstName);
    };

    getAllUsers() {
        return this.users;
    }

    setUserEmoji(user: UserModels.UserModel) {
        const userFromArr = this.getUser(user.firstName);

        if (user.hasOwnProperty('currentEmoji') && typeof userFromArr !== 'undefined') {
            userFromArr.currentEmoji = user.currentEmoji;
        }
    }
}

const users = new UsersClass();

export default users;