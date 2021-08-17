import express from 'express';
import bodyParser from 'body-parser';
import EventRouter from './routes/event';
import UserRouter from './routes/user';
import { errorHandler } from './middlewares/error';
import database from './common/config/database';
import env from './common/config/env';

async function main() {
  await database.ensureInitialized();

  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use('/', UserRouter);
  app.use('/events', EventRouter);
  app.use(errorHandler);
  app.listen(env.port);
}

main().then(() => console.log('Starting app successfully.'));
