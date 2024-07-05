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
