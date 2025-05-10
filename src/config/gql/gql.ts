import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { gql } from 'graphql-tag';
import UserResolvers from '../../components/user/user.resolvers';

async function startApolloServer() {
  const typeDefs = gql(
    readFileSync('src/config/gql/schema.graphql', {
      encoding: 'utf-8',
    })
  );

  const server = new ApolloServer<any>({
    typeDefs,
    resolvers: UserResolvers.resolvers,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 },
  });
  console.log(`
    Server running on port ${url}
  `);
}

export default startApolloServer;
