export const S4 = () => {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}

export const genUuid = (uids) => {
  let uuid = S4()
  while (uids.includes(uuid)) {
    uuid = S4()
  }
  return uuid
}

export const formatThousandAmount = (amount) => {
  return (amount / 1000).toFixed(0) + "K"
}

export const findItemFromDictByValue = (dict, value) => {
  let result = null
  dict.map((item) => {
    if (item.value == value){
      result = item
    }
  })
  return result
}

export const findCaptionFromDictByValue = (dict, value) => {
  let result = findItemFromDictByValue(dict, value)
  if (result)
    return result.caption
  return ""
}

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

export function getCookie(name, cookie = "") {
  
  if (typeof document !== "undefined"){
    cookie = document.cookie
  }
  var matches = cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ))
  return matches ? decodeURIComponent(matches[1]) : undefined
}