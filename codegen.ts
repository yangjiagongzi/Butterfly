import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8090/',
  generates: {
    'src/type/graphql/index.ts': {
      plugins: [
        {
          add: {
            content:
              '/* eslint-disable semi */\n/* eslint-disable @typescript-eslint/ban-types */\n/* eslint-disable prettier/prettier */'
          }
        },
        'typescript',
        'typescript-resolvers'
      ]
    }
  }
}

export default config
