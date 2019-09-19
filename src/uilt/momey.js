export default function numberFormat (number, decimals, decPoint, thousandsSep) {
  /*
   * 参数说明：
   * number：要格式化的数字
   * decimals：保留几位小数
   * decPoint：小数点符号
   * thousandsSep：千分位符号
   * */
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  let n = !isFinite(+number) ? 0 : +number
  let prec = !isFinite(+decimals) ? 2 : Math.abs(decimals)
  let sep = thousandsSep ? ',' : thousandsSep
  let dec = decPoint ? '.' : decPoint
  const toFixedFix = function (n, prec) {
    let k = Math.pow(10, prec)
    return '' + Math.ceil(n * k) / k
  }

  let s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  let re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2')
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return `￥${s.join(dec)}`
}
