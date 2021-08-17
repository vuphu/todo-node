import database from './common/config/database';
import env from './common/config/env';
import app from './common/config/app';

async function main() {
  await database.ensureInitialized();
  app.listen(env.port);
}

main().then(() => console.log('Starting app successfully.'));
