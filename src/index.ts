import 'dotenv/config';
import db from './config/db/db';
import startApolloServer from './config/gql/gql';

async function start() {
  await db.connect();
  startApolloServer();
}

start();
