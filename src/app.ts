import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';

import { API } from './router';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router
API(app);

app.use((error: Error , req: Request, res: Response, next: NextFunction) => { 
  if(error) 
    res.status(500).json({ message: error.message });
});

app.use((req: Request, res: Response) => {
  return res.status(404).json({ message: 'Not Fount!'});
});

export default app; 