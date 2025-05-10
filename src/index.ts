import db from './config/db/db';
import startApolloServer from './config/gql/gql';
import 'dotenv/config';

async function start() {
  await db.connect();
  startApolloServer();
}

start();
