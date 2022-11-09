import { GraphQLError, GraphQLScalarType, Kind } from 'graphql'

export const GraphQLDate = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    if (value instanceof Date) {
      return value
    } else if (typeof value === 'number') {
      return new Date(value)
    } else {
      throw new TypeError(`Value is not an instance of Date or number: ${value}`)
    }
  },
  parseValue(value) {
    const date = new Date(value as string)
    if (Number.isNaN(date.getTime())) {
      throw new TypeError(`Value is not a valid Date: ${value}`)
    }
    return date
  },
  parseLiteral(valueAST) {
    if (valueAST.kind !== Kind.INT && valueAST.kind !== Kind.FLOAT) {
      throw new GraphQLError(`Can only parse numbers but got a: ${valueAST.kind}`)
    }
    const result = new Date(Number(valueAST.value))
    if (Number.isNaN(result.getTime())) {
      throw new GraphQLError(`Value is not a valid Date: ${valueAST.value}`)
    }
    return result
  }
})
