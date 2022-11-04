export const EnvEnum = {
  dev: 'dev',
  prod: 'prod'
} as const

export const EnvName = {
  [EnvEnum.dev]: 'development',
  [EnvEnum.prod]: 'production'
} as const

export const DATABASE_PATH = {
  [EnvEnum.dev]: 'database.dev.db',
  [EnvEnum.prod]: 'database.db'
} as const

export type EnvConfig<T> = {
  [K in Values<typeof EnvEnum>]: T
}

export default {
  ENV_NAME: EnvName,
  REQUEST_TIMEOUT: 15000,
  LOADING_TIMEOUT: 10000,
  REQUEST_RETRY: 1,
  REQUEST_RETRY_DELAY: 5000,
  DATABASE_PATH: DATABASE_PATH,
  LOG_LEVEL: 'debug' // none, debug, warn, error
} as const
