/*
 * @Author: fengbozhang
 * @Date: 2019-10-09 10:37:31
 * @LastEditors: fengbozhang
 * @LastEditTime: 2019-10-09 10:37:31
 */
import axios from 'axios'

/**
 * 创建请求
 * @param {string} URL 请求地址
 */
export function axiosGet (URL) {
  return new Promise((resolve, reject) => {
    axios.get(URL)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
/**
 * 创建请求
 * @param {string} URL 请求地址
 */
export function axiosPost (URL, params) {
  return new Promise((resolve, reject) => {
    axios.post(URL, params)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
