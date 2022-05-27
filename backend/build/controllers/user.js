"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController = {
    getCurrentEmoji: (user) => {
        const hexFromCodePoint = parseInt(`0x${user.currentEmoji}`, 16);
        const emoji = String.fromCodePoint(hexFromCodePoint);
        return emoji;
    }
};
exports.default = UserController;
