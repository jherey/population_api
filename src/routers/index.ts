import { Router } from 'express';
import locationRouter from './location';

const app = Router();

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Population Management System!' });
});

app.use('/locations', locationRouter);

export default app;
