import express, { Express, Request, Response, Router } from 'express';
import * as UserController from '../controllers/user';

const UserRoutes: Router = express.Router();

UserRoutes.get('/current_emoji/:firstName', (req: Request, res: Response) => {
    const firstName = req.params.firstName;
    let currentEmoji = UserController.getCurrentEmoji(firstName);
    res.json({firstName, currentEmoji});
});

UserRoutes.post('/current_emoji', (req: Request, res: Response) => {
    const firstName = req.body.firstName;
    const currentEmoji = req.body.currentEmoji;
    UserController.setCurrentEmoji(firstName, currentEmoji);
    res.send(`success`);
});

UserRoutes.post('/', (req: Request, res: Response) => {
    const firstName = req.body.firstName;
    const currentEmoji = req.body.currentEmoji;
    const newUser = UserController.addUser(firstName, currentEmoji);
    res.json(newUser);
});

// TODO: move this into it's own router for routes with groups of users
UserRoutes.get('/all_users', (req: Request, res: Response) => {
    const allUsers = UserController.getAllUsers();
    res.json(allUsers);
});

export default UserRoutes;