const currencyFormat = (num, prefix) => {
  return  `${prefix}  ${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
}
const trim = (string, limit) => {
  return `${string.substring(0, limit)}...`
}

export {
  currencyFormat,
  trim
}