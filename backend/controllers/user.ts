import express, { Express, Request, Response, Router } from 'express';
import * as UserModels from '../models/user';

const UserController = {
    getCurrentEmoji: (user: UserModels.UserModel) => {
        const hexFromCodePoint = parseInt(`0x${user.currentEmoji}`, 16)
        const emoji = String.fromCodePoint(hexFromCodePoint)
        return emoji;
    }
};

export default UserController;