import moment from 'moment'
import { maxShow } from '~/constant/dictionary'

export type NumberGenerateOption = {
  isRandom: boolean
  from: string
  to: string
  step: string
  howMany: number
  isHex: boolean
  minIntegerDigits: number
  maxIntegerDigits: number
  minFractionDigits: number
  maxFractionDigits: number
}

const formatNumber = (item: number, options: NumberGenerateOption) => {
  const value = Number(item.toFixed(options.isHex ? undefined : options.maxFractionDigits))
  const [integer = '0', fraction = ''] = `${value}`.split('.')
  let integerFormat = Number(integer).toString(options.isHex ? 16 : 10)
  if (integerFormat.length > options.maxIntegerDigits) {
    integerFormat = integerFormat.slice(integerFormat.length - options.maxIntegerDigits)
  }
  if (integerFormat.length < Math.max(options.minIntegerDigits, 1)) {
    integerFormat = `0000000000${integerFormat}`.slice(
      10 + integerFormat.length - Math.max(options.minIntegerDigits, 1)
    )
  }

  if (options.isHex) {
    return integerFormat
  }

  let fractionFormat = fraction
  if (fractionFormat.length > options.maxFractionDigits) {
    fractionFormat = fractionFormat.slice(0, options.maxFractionDigits)
  }
  if (fractionFormat.length < options.minFractionDigits) {
    fractionFormat = `${fractionFormat}0000000000`.slice(0, options.minFractionDigits)
  }
  const fullFormat = `${integerFormat}${fractionFormat.length ? `.${fractionFormat}` : ''}`

  return fullFormat
}

export const payloadGenerateForNumber = (options: NumberGenerateOption) => {
  const min = Math.min(Number(options.to), Number(options.from))
  const max = Math.max(Number(options.to), Number(options.from))
  const result: string[] = []

  if (options.isRandom) {
    while (result.length < options.howMany && result.length < maxShow) {
      const format = formatNumber(Math.random() * (max - min) + min, options)
      if (!result.includes(format)) {
        result.push(format)
      }
    }
  } else {
    const step = Number(options.step)
    if (Number.isNaN(step) || step <= 0) {
      return []
    }
    let start = min
    while (start <= max && result.length < maxShow) {
      const format = formatNumber(start, options)
      if (!result.includes(format)) {
        result.push(format)
      }
      start = start + step
    }
  }

  return result
}

export const DateStep = {
  days: {
    id: 'days',
    name: '天'
  },
  weeks: {
    id: 'weeks',
    name: '周'
  },
  months: {
    id: 'months',
    name: '月'
  },
  years: {
    id: 'years',
    name: '年'
  }
} as const

export type DateGenerateOption = {
  fromYear: number
  fromMonth: number
  fromDay: number
  toYear: number
  toMonth: number
  toDay: number
  step: number
  stepType: Values<typeof DateStep>['id']
  format: string
}

export const payloadGenerateForDate = (options: DateGenerateOption) => {
  const from = moment(`${options.fromYear}/${options.fromMonth}/${options.fromDay}`, 'YYYY/M/D')
  const to = moment(`${options.toYear}/${options.toMonth}/${options.toDay}`, 'YYYY/M/D')

  const result: string[] = []

  let start = from
  while (start.isSameOrBefore(to) && result.length < maxShow) {
    const formatStr = start.format(options.format)
    if (!result.includes(formatStr)) {
      result.push(formatStr)
    }
    start = start.add(options.step, options.stepType)
  }

  return result
}

export const payloadGenerateForCharacter = (character: string, length: number) => {
  const characterLength = character.length
  const result: string[] = []
  const point: number[] = new Array(length).fill(0)

  while (point.every(item => item < characterLength) && result.length < maxShow) {
    const str = point.map(item => character[item]).join('')
    result.push(str)

    let pointIdx = length - 1
    while (pointIdx >= 0) {
      const pointValue = point[pointIdx]
      if (pointValue + 1 < characterLength || pointIdx === 0) {
        point[pointIdx] = pointValue + 1
        pointIdx = -1
      } else {
        point[pointIdx] = 0
        pointIdx = pointIdx - 1
      }
    }
  }
  return result
}
