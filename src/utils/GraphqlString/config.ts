import { ConfigKey, ConfigValue } from '~/constant/config'

export const getConfig = () => {
  return {
    source: `#graphql
      query Config {
        config {
          AppearanceTheme
          MaxmumConcurrentRequests
          DelayBetweenRequests
        }
      }`
  }
}

export const updateConfig = <K extends ConfigKey>(key: K, value: ConfigValue<K>) => {
  return {
    source: `#graphql
      mutation Mutation($key: String, $value: ConfigValue) {
        config {
          updateConfig (key: $key,value: $value) {
            successful
            message
          }
        }
      }`,
    variableValues: {
      key,
      value
    }
  }
}
