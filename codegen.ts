import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8090/',
  documents: 'src/utils/Graphql/docs/*.graphql',
  generates: {
    'src/utils/Graphql/index.ts': {
      plugins: [
        {
          add: {
            content:
              '/* eslint-disable @typescript-eslint/no-unused-vars */\n/* eslint-disable no-unused-vars */\n/* eslint-disable @typescript-eslint/ban-types */\n/* eslint-disable semi */\n/* eslint-disable prettier/prettier */'
          }
        },
        'typescript',
        'typescript-operations',
        'typescript-generic-sdk'
      ],
      config: {
        documentMode: 'string'
      }
    }
  }
}

export default config
