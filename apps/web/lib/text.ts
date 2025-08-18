const round = (value: number, precision: number = 2) => {
  return Math.round(value * 10 ** precision) / 10 ** precision
}

export const extractNumbers = (value: string) => {
  return value.replace(/[^0-9]/g, '')
}

export const extractDecimal = (value: string) => {
  return value.replace(/[^0-9.]/g, '')
}

export const extractLetters = (value: string) => {
  return value.replace(/[^a-zA-Z]/g, '')
}

export const formatDecimal = (value: string, options: { precision?: number } = {}): string => {
  try {
    const str = value + ''

    if (str === '') {
      return ''
    }

    const removedInvalidChar = str.replace(/[^\d.]/g, '')
    let dotCount = 0

    const keepOneDot = removedInvalidChar.split('').filter((item) => {
      if (dotCount > 0 && item === '.') {
        return false
      }
      if (item === '.') {
        ++dotCount
      }
      return true
    })

    const resultString = keepOneDot.join('')
    if (!resultString) {
      return ''
    }
    if (Number(resultString)) {
      return round(Number(resultString), options.precision ?? 2) + ''
    }
    return ''
  } catch (error) {
    return ''
  }
}
