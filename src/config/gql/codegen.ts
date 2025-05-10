import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'src/config/gql/schema.graphql',
  generates: {
    'src/config/gql/types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};

export default config;
