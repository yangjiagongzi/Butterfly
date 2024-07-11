import moment from 'moment'

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

export const payloadGenerateForNumber = (options: NumberGenerateOption) => {
  const min = Math.min(Number(options.to), Number(options.from))
  const max = Math.max(Number(options.to), Number(options.from))
  let result: number[]
  if (options.isRandom) {
    result = new Array(options.howMany)
      .fill('')
      .map((item, idx) => Math.random() * (max - min) + min)
  } else {
    const step = Number(options.step)
    if (Number.isNaN(step) || step <= 0) {
      return []
    }
    result = new Array(Math.floor((max - min) / step) + 1)
      .fill('')
      .map((item, idx) => min + idx * step)
  }

  const dedup: string[] = []

  result.forEach(item => {
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
      if (!dedup.includes(integerFormat)) {
        dedup.push(integerFormat)
      }
      return
    }
    let fractionFormat = fraction
    if (fractionFormat.length > options.maxFractionDigits) {
      fractionFormat = fractionFormat.slice(0, options.maxFractionDigits)
    }
    if (fractionFormat.length < options.minFractionDigits) {
      fractionFormat = `${fractionFormat}0000000000`.slice(0, options.minFractionDigits)
    }
    const string = `${integerFormat}${fractionFormat.length ? `.${fractionFormat}` : ''}`
    if (!dedup.includes(string)) {
      dedup.push(string)
    }
    return
  })

  return dedup
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
  while (start.isSameOrBefore(to)) {
    const formatStr = start.format(options.format)
    if (!result.includes(formatStr)) {
      result.push(formatStr)
    }
    start = start.add(options.step, options.stepType)
  }

  return result
}

export const payloadGenerateForCharacter = (character: string, length: number) => {
  if (length > 10 || length <= 0) {
    return []
  }

  const characterLength = character.length

  if (Math.pow(characterLength, length) > 1000000) {
    return []
  }

  const result: string[] = []
  const point: number[] = new Array(length).fill(0)

  while (point.every(item => item < characterLength)) {
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
