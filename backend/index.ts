import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import UserRoutes from './routes/user';

dotenv.config();

const app: Express = express();
app.use(express.json()) // for parsing application/json
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Emoji Picker API');
});

// register routes
app.use('/user', UserRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});