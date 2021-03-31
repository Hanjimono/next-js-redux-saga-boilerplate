export const getCurrencySign = (code) => {
  switch (code) {
    case "USD":
      return "\u0024"
      break;
    case "CENT":
      return "\u00a2"
      break;
    case "GBP":
      return "\u00a3"
      break;
    case "YEN":
      return "\u00a5"
      break;
    case "LIRA":
      return "\u20a4"
      break;
    case "WON":
      return "\u20a9"
      break;
    case "EUR":
      return "\u20ac"
      break;
    case "RUBLE":
      return "\u20bd"
      break;
    case "PERCENT":
      return "%"
      break;
    default:
      return "$"
  }
}

export const numberFormatter = value => {
  let formattedValue = value+'' || ''
  if (!(formattedValue.replace instanceof Function))
    return formattedValue
  formattedValue = formattedValue.replace(/^00/g, '0')
  if (formattedValue.length > 1) {
    formattedValue = formattedValue.replace(/^0/g, '')
  }
  return formattedValue.replace(/[^\d]/g, '')  
}

export const floatFormatter = value => {
  let formattedValue = value+'' || ''
  if (!(formattedValue.replace instanceof Function))
    return formattedValue
  formattedValue = formattedValue.replace(/^00/g, '0')  
  formattedValue = formattedValue.replace(/^-00/g, '-0')
  if (formattedValue.length > 1) {
    formattedValue = formattedValue.replace(/^-0/g, '-')
    formattedValue = formattedValue.replace(/^-\./g, '-0.')
    formattedValue = formattedValue.replace(/^0/g, '')
    formattedValue = formattedValue.replace(/^\./g, '0.')
  }
  return formattedValue.replace(/[^-0-9.]/g, '').replace(/(\..*)\./g, '$1')
}

export const minFormatter = (value, min) => {
  let formattedValue = value+'' || ''
  if (!(formattedValue.replace instanceof Function))
    return formattedValue
  let minValue = Math.floor(min)
  if (formattedValue < minValue) {
    formattedValue = minValue
  }
  return formattedValue
}

export const maxFormatter = (value, max) => {
  let formattedValue = value+'' || ''
  if (!(formattedValue.replace instanceof Function))
    return formattedValue
  let maxValue = Math.floor(max)
  if (parseFloat(formattedValue) > maxValue) {
    formattedValue = maxValue
  }
  return formattedValue
}

export const numberLengthFormatter = (value, min, max) => {
  let formattedValue = value+'' || ''
  if (!(formattedValue.replace instanceof Function))
    return formattedValue
  formattedValue = numberFormatter(formattedValue)
  formattedValue = minFormatter(formattedValue, min)
  formattedValue = maxFormatter(formattedValue, max)
  return formattedValue  
}

export const floatLengthFormatter = (value, min, max) => {
  let formattedValue = value+'' || ''
  if (!(formattedValue.replace instanceof Function))
    return formattedValue
  formattedValue = floatFormatter(formattedValue)
  formattedValue = minFormatter(formattedValue, min)
  formattedValue = maxFormatter(formattedValue, max)
  return formattedValue  
}

export const moneyFormatted = (value) => {
  let formattedValue = value+'' || ''
  if (!(formattedValue.replace instanceof Function))
    return formattedValue
  formattedValue = floatFormatter(formattedValue)
  formattedValue = maxFormatter(formattedValue, Number.MAX_SAFE_INTEGER)
  formattedValue = minFormatter(formattedValue, 0)
  let tokens = formattedValue.toString().match(/\d+(\.\d{0,2})?/);
  formattedValue = tokens && tokens[0] ? tokens[0] : '';
  // formattedValue = (parseFloat(formattedValue)).toFixed(2)
  // formattedValue = formattedValue.replace(/(*\.\d{2})\./g, '$1')
  if (isNaN(formattedValue))
    return ""
  formattedValue = formattedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return formattedValue
}

export const moneyPrintFormatted = (value, currency = '') => {
  let formattedValue = value+'' || ''
  if (!(formattedValue.replace instanceof Function))
    return formattedValue
  formattedValue = floatFormatter(formattedValue)
  let isNegative = parseFloat(formattedValue) < 0
  formattedValue = maxFormatter(formattedValue, Number.MAX_SAFE_INTEGER)
  let tokens = formattedValue.toString().match(/\d+(\.\d{0,2})?/);
  formattedValue = tokens && tokens[0] ? tokens[0] : '';
  // formattedValue = (parseFloat(formattedValue)).toFixed(2)
  // formattedValue = formattedValue.replace(/(*\.\d{2})\./g, '$1')
  if (isNaN(formattedValue))
    return ""
  formattedValue = formattedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  if (currency) {
    let currencySign = getCurrencySign(currency)
    formattedValue = currencySign + "\u00A0" + formattedValue
  }
  if (isNegative) {
    formattedValue = "-"+formattedValue
  }
  return formattedValue
}

export const currencyTransferAmount = (amount, oldCurrency, newCurrency, currencyDict) => {  
  let oldCurrencyCourse = 1
  let newCurrencyCourse = 1
  let newCurrencySign = ""
  let formattedAmount = amount
  currencyDict.map((currency) => {
    if (currency.value == newCurrency){
      newCurrencyCourse = currency.course
      newCurrencySign = currency.label
    }
    if (currency.value == oldCurrency)
      oldCurrencyCourse = currency.course
  })
  formattedAmount = parseFloat(floatFormatter(amount)) * oldCurrencyCourse / newCurrencyCourse
  formattedAmount = moneyFormatted(formattedAmount)
  return {sign: newCurrencySign, amount: formattedAmount}
}

export const percentFormatter = value => {
  return floatFormatter(value) + "%"
}

export const percentLengthFormatter = (value, min, max) => {
  return floatLengthFormatter(value, min, max) + "%"
}

export const countDecimals = (num) => {
  if(Math.floor(num.valueOf()) === num.valueOf()) return 0;
  return num.toString().split(".")[1].length || 0; 
}

export const roundFloatToTemplate = (amount, template) => {
  const decimals = countDecimals(template)
  const changer = Math.pow(10, decimals)
  return Math.round((amount + Number.EPSILON) * changer) / changer
}

export const roundWithOffset = (number, increment, offset) => {
  return roundFloatToTemplate(Math.ceil((number - offset) / increment ) * increment + offset, increment);
}

export const customParseInt = (value) => {
  return value ? parseInt(value) : null
}

export const customParseFloat = (value) => {
  return value ? parseFloat(value) : null
}

export const currencyToStringFormatter = (value) => {
  if (value && value.id){
    return value.id
  }
  return value
}