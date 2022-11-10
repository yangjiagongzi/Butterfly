import { GraphQLScalarType } from 'graphql'

export const GraphQLConfigValueType = new GraphQLScalarType({
  name: 'ConfigValue',
  serialize(value) {
    if (
      typeof value === 'boolean' ||
      typeof value === 'number' ||
      typeof value === 'string' ||
      value instanceof Date
    ) {
      return value
    } else {
      throw new TypeError(
        `Value is not an instance of Date or boolean or number or string: ${value}`
      )
    }
  }
})
