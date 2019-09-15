const server = 'http://121.196.200.183:8080/school'
const api = {
  signUpSave: `${server}/api/school/sign/save`, // 新增报名信息
  querySignUp: `${server}/api/school/sign/querySignUp`, // 报名信息查询
  getArea: `${server}/api/school/area/getArea`, // 根据区域code查询区域省、市、县信息
  upload: `${server}/api/school/common/upload`, // 上传
  getDict: `${server}/api/system/dict/getType`, // 数据字典
  checkExam: `${server}/api/school/exam/checkExam`, // 校验当前是否可以报考
  noticeDetail: `${server}/api/system/notice/detail`, // 查询公告信息
  noticeList: `${server}/api/system/notice/list`, // 查询公告信息
  examDetail: `${server}/api/school/exam/detail` // 报名基础信息
}
export default api
