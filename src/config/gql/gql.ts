import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { readFileSync } from 'fs';
import { gql } from 'graphql-tag';
import express from 'express';
import cors from 'cors';
import { IDBUser } from '../../components/user/user.types';
import passport, { handlePassportErrors } from '../../config/auth/passport';
import authController from '../../components/auth/auth.controller';
import scalars from '../../common/gql/types';
import userResolvers from '../../components/user/user.resolvers';
import habitDefinitionResolvers from '../../components/habit-definition/habit-definition.resolvers';
import habitInstanceResolvers from '../../components/habit-instance/habit-instance.resolvers';
import habitLogResolvers from '../../components/habit-log/habit-log.resolvers';
import cookieParser from '../../common/middlewares/cookie-parser';

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
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser);
  app.use('/auth', authController);
  app.use(
    passport.authenticate('jwt', { session: false }),
    handlePassportErrors
  );

  const server = new ApolloServer<IContext>({
    typeDefs,
    resolvers: {
      Query: {
        ...userResolvers.Query,
        ...habitInstanceResolvers.Query,
        ...habitLogResolvers.Query,
      },
      Mutation: {
        ...habitDefinitionResolvers.Mutation,
        ...habitInstanceResolvers.Mutation,
        ...habitLogResolvers.Mutation,
      },
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
