import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { readFileSync } from 'fs';
import { gql } from 'graphql-tag';
import express from 'express';
import userResolvers from '../../components/user/user.resolvers';
import { IDBUser } from '../../components/user/user.types';
import passport, { handlePassportErrors } from '../../config/auth/passport';
import authController from '../../components/auth/auth.controller';
import scalars from '../../common/gql/types';
import habitDefinitionResolvers from '../../components/habit-definition/habit-definition.resolvers';
import habitInstanceResolvers from '../../components/habit-instance/habit-instance.resolvers';

async function startApolloServer() {
  const typeDefs = gql(
    readFileSync('src/config/gql/schema.graphql', {
      encoding: 'utf-8',
    })
  );
  interface IContext {
    user?: IDBUser;
  }

  const app = express();
  app.use(express.json());
  app.use('/auth', authController);
  app.use(
    passport.authenticate('jwt', { session: false }),
    handlePassportErrors
  );

  const server = new ApolloServer<IContext>({
    typeDefs,
    resolvers: {
      ...userResolvers,
      ...habitDefinitionResolvers,
      ...habitInstanceResolvers,
      ...scalars,
    },
  });
  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => ({ user: req.user }),
    })
  );

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/graphql`);
  });
}

export default startApolloServer;
