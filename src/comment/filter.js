/*
 * @Author: fengbozhang
 * @Date: 2019-10-16 11:21:44
 * @LastEditors: fengbozhang
 * @LastEditTime: 2019-10-16 11:46:25
 */
import Vue from 'vue'
// 去掉编辑器添加的html代码
export const removeHtml = Vue.filter('removeHtml', function (input) {
  if (typeof input === 'string') {
    return input && input.replace(/<(?:.|\n)*?>/gm, '')
      .replace(/(&rdquo;)/g, '\\"')
      .replace(/&ldquo;/g, '\\"')
      .replace(/&mdash;/g, '-')
      .replace(/&nbsp;/g, '')
      .replace(/&gt;/g, '>')
      .replace(/&lt;/g, '<')
      .replace(/<[\w\s"':=\\/]*/, '')
  } else {
    return ''
  }
})
