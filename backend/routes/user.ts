import express, { Express, Request, Response, Router } from 'express';
import UserController from '../controllers/user';

const UserRoutes: Router = express.Router();

UserRoutes.get('/current_emoji', async (req: Request, res: Response) => {
    let currentEmoji = await UserController.getCurrentEmoji({id: 1, firstName: 'Chantelle', currentEmoji: '1F603'})
    res.send(`req to current_emoji ${currentEmoji}`);
})

export default UserRoutes;