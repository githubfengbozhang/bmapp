/*
 * @Author: fengbozhang
 * @Date: 2019-10-17 14:37:54
 * @LastEditors: fengbozhang
 * @LastEditTime: 2019-10-17 15:13:33
 */

const setSession = function (sessinObjec) {
  let session = sessinObjec || {}
  let sessionStorage = window.sessionStorage
  for (let item in session) {
    let value = session[item] || ''
    sessionStorage.setItem(item, value)
  }
}
export default setSession

export const sessionStorage = window.sessionStorage
