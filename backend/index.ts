import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import UserRoutes from './routes/user';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

// register routes
app.use('/user', UserRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});