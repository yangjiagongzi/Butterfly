import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8090/',
  generates: {
    'src/type/graphql/index.ts': {
      plugins: ['typescript', 'typescript-resolvers']
    }
  }
}

export default config
