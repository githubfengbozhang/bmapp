// const server = 'http://121.196.200.183:8080/school'
const server = 'http://172.99.247.116:9292'
const api = {
  signUpSave: `${server}/api/school/sign/save`, // 新增报名信息
  querySignUp: `${server}/api/school/sign/querySignUp`, // 报名信息查询
  getArea: `${server}/api/school/area/getArea`, // 根据区域code查询区域省、市、县信息
  getAreaChild: `${server}/api/school/area/getAreaChild`, // 根据父节点查询所有子节点信息
  upload: `${server}/api/school/common/upload`, // 上传
  getDict: `${server}/api/system/dict/getType`, // 数据字典
  checkExam: `${server}/api/school/exam/checkExam`, // 校验当前是否可以报考(暂时弃用)
  checkExamDetail: `${server}/api/school/exam/detail`, // 获取当前可报考的考试计划
  noticeDetail: `${server}/api/system/notice/detail`, // 查询公告信息
  noticeList: `${server}/api/system/notice/list`, // 查询公告信息
  examDetail: `${server}/api/school/exam/detail`, // 报名基础信息
  createOrder: `${server}/api/school/order/createOrder`, // 获取订单号
  allExam: `${server}/api/school/exam/allExam`, // 获取全部考试计划下拉选项
  querySignUpByCardId: `${server}/api/school/sign/querySignUpByCardId` // 通过身份证号码查询报名信息
}
export default api
