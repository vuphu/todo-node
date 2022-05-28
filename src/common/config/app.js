import express from 'express';
import bodyParser from 'body-parser';
import UserRouter from '../../routes/user';
import EventRouter from '../../routes/event';
import { errorHandler } from '../../middlewares/error';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/auth', UserRouter);
app.use('/events', EventRouter);
app.use(errorHandler);

export default app;
