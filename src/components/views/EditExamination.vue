<!--
 * @Author: fengbozhang
 * @Date: 2019-10-09 10:37:31
 * @LastEditors: fengbozhang
 * @LastEditTime: 2019-10-31 15:11:53
 -->
<template>
  <div class='secondpage'>
    <simple-cropper :initParam="uploadParam" :successCallback="uploadHandle" ref="cropper">
    <van-cell title="头像" right-icon="arrow" value="内容" >
      <van-image
        slot="default"
        width="2.25rem"
        height="3rem"
        :src="file"
        @click="upload"
      />
      <van-icon
        slot="right-icon"
        name="arrow"
        style="line-height: inherit;"
      />
    </van-cell>
    <!-- <img :src="file" @click="upload"> -->
  </simple-cropper>
    <van-cell-group>
    </van-cell-group>
    <van-cell-group>
      <!-- <van-icon name="search" class="idCardIcon" @click="idCardSearch()"/> -->
      <van-field
        class = 'inputSearch'
        v-model="cIdCard"
        label="身份证号"
        placeholder="请输入考生身份证号码"
        required
        disabled
      />
      <!-- <van-number-keyboard
        v-model="cIdCard"
        :show="numberShow"
        extra-key="x"
        :maxlength="18"
        :safe-area-inset-bottom = "true"
        @blur="numberShow = false"
      /> -->
      <van-field
        v-model="cExamTypeText"
        label="考生类别"
        placeholder="请选择考生类别"
        required
        disabled
      />
      <van-popup v-model="picker" position="bottom">
        <van-picker
        show-toolbar
        :columns="pickColumns"
        @cancel="picker = false"
        @confirm="onConfirm"
        />
      </van-popup>
      <van-field
        v-model="cName"
        label="考生姓名"
        placeholder="请输入考生姓名"
        clearable
        required
      />
      <van-field
        readonly
        clickable
        :value="cSexText"
        label="考生性别"
        placeholder="请选择考生性别"
        @click="openPicker('cSex')"
        required
      />
      <van-field
        v-model="cPhone"
        label="考生电话"
        placeholder="请输入考生联系电话"
        clearable
        type='tel'
        required
      />
      <van-field
        readonly
        clickable
        :value="cNationNoText"
        label="民族"
        placeholder="请选择民族"
        @click="openPicker('cNationNo')"
        required
      />
      <van-field
        readonly
        :value="cOccupationText"
        label="职业"
        placeholder="请选择职业"
        required
        disabled
      />
      <van-field
        v-model="cStudentNo"
        :label="this.GlobalVariable.ANDROID_APP === 'teacher' ? '工号' : '学号'"
        :placeholder="this.GlobalVariable.ANDROID_APP === 'teacher' ? '请输入工号' : '请输入学生证学号'"
        clearable
        :readonly='isReadonly'
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        readonly
        :value="cBirthplaceText"
        clickable
        label="出生地区"
        placeholder="请选择出生地区"
        @click="openPickerArea('cBirthplace')"
        required
      />
      <van-popup v-model="pickerArea" position="bottom">
        <van-area
        ref="area"
        value="110000"
        :area-list="areaList"
        @confirm="pickerAreaConfirm"
        @cancel="pickerArea = false"
        />
      </van-popup>
      <van-field
        readonly
        :value="cDwellingplaceText"
        clickable
        label="现居住地"
        placeholder="请选择现居住地"
        @click="openPickerArea('cDwellingplace')"
        required
      />
      <van-field
        v-model="cAddress"
        label="地址"
        placeholder="请输入地址"
        type='textarea'
        maxlength='30'
        clearable
        :autosize='true'
        required
      />
      <van-field
        v-model="cWorkUnit"
        :label="this.GlobalVariable.ANDROID_APP === 'teacher' ? '工作单位' : '学校名称'"
        :placeholder="this.GlobalVariable.ANDROID_APP === 'teacher' ? '请输入工作单位(身份证上地址要求不超30个字)' : '请输入学校名称'"
        clearable
        maxlength='30'
        :autosize='true'
        type='textarea'
        :readonly='isReadonly'
        required
      />
      <van-field
        v-model="cBranchName "
        :label="this.GlobalVariable.ANDROID_APP === 'teacher' ? '部门' : '所属院系'"
        :placeholder="this.GlobalVariable.ANDROID_APP === 'teacher' ? '请输入部门' : '请输入所属院系'"
        clearable
        required
      />
      <van-field  v-if="this.GlobalVariable.ANDROID_APP === 'teacher'"
        v-model="cSchoolName "
        label="所属院系"
        placeholder="请输所属院系"
        clearable
      />
      <!-- <van-field
        readonly
        clickable
        :value="cExamGradeText"
        label="报考级别"
        placeholder="请选择报考级别"
        @click="openPicker('cExamGrade')"
      /> -->
      <van-field
        v-model="nZipCode"
        maxlength='6'
        label="邮编"
        placeholder="请输入邮编"
        clearable
      />
    </van-cell-group>
   <van-button type="info" :loading = 'loadingShow' loading-text="报名进行中..." size='large' @click="save()">确认修改</van-button>
   <!-- <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      @select="onSelect"
      @cancel="onCancel"
    /> -->
  <van-popup v-model="overlayShow"><van-loading size="24px">加载中...</van-loading></van-popup>
  </div>
</template>
<script>
import Vue from 'vue'
// import _ from 'lodash'
import SimpleCropper from '../views/cropper'
// import setSession, { sessionStorage } from '@comment/sessionStorage'
// import Cropper from 'cropperjs'
// import 'cropperjs/dist/cropper.min.css'
// // import VueCropper from 'vue-cropper'
// import lrz from 'lrz'
import { Cell, CellGroup, Image, Field, Button, ActionSheet, Picker, Popup, Area, Toast, Icon, Uploader, Dialog, NumberKeyboard } from 'vant'
import { axiosGet } from '@comment/http'
import axios from 'axios'
import api from '@comment/api'
import qs from 'qs'
Vue.use(Cell).use(CellGroup).use(Image).use(Field).use(Button).use(Picker).use(Popup).use(Area).use(Toast).use(Icon).use(Uploader).use(Dialog).use(NumberKeyboard).use(ActionSheet)
export default {
  data () {
    return {
      uploadParam: {
        uploadURL: `${api.upload}`, // 上传地址
        scale: 1 // 相对手机屏幕放大的倍数: 4倍
      },
      // 图片显示
      file: require('../../assets/touxiang.png'),
      overlayShow: false,
      // 键盘显示
      numberShow: false,
      // 按钮是否加载中
      loadingShow: false,
      // 根据学生类别下拉显示不同缴费
      ninSchoolStudentPriceShow: '',
      nnotInSchoolStudentPriceShow: '',
      ninSchoolWorkersPriceShow: '',
      nExamId: '',
      // 报名基础信息
      ninSchoolStudentPrice: '',
      nnotInSchoolStudentPrice: '',
      ninSchoolWorkersPrice: '',
      cexamAddress: '',
      cexamTitle: '',
      userid: '',
      texamBeginTime: '',
      cStudentNo: '',
      texamEndTime: '',
      // 学号是否可编辑（老师端可以编辑true，学生端不可以编辑false）
      isReadonly: '',
      // 学生端是否是在校生
      inSchStudent: '',
      // 单项选择器弹窗是否显示
      picker: false,
      // 区域选择器弹窗是否显示
      pickerArea: false,
      // 下拉赋值
      pickColumns: '',
      // 提交的数据
      cAddress: '',
      cSex: '',
      cWorkUnit: '',
      cBranchName: '',
      cBirthplace: '',
      cDwellingplace: '',
      nZipCode: '',
      cName: '',
      cIdCard: '',
      cPhone: '',
      cNationNo: '',
      cOccupation: '',
      cSchoolName: '',
      // cExamGrade: '',
      // 图片
      cIdCardImg: '',
      cExamType: '',
      // 下拉显示的值
      cSexText: '',
      // cExamGradeText: '',
      cBirthplaceText: '',
      cExamTypeText: '',
      cNationNoText: '',
      cOccupationText: '',
      cDwellingplaceText: '',
      // 选择器的类别
      pickerType: '',
      pickerAreaType: '',
      // 选择器的下拉值
      cExamTypeColumns: this.getDict('exam_type'),
      cSexColumns: this.getDict('sys_user_sex'),
      cNationNoColumns: this.getDict('sign_nation'),
      cOccupationColumns: this.getDict('exam_type'),
      // cExamGradeColumns: this.getDict('sign_grade'),
      areaList: {
        province_list: {},
        city_list: {},
        county_list: {}
      },
      province_list: {},
      city_list: {},
      county_list: {},
      // 计划详情
      detail: {},
      data: {}
    }
  },
  mounted () {
    document.title = '编辑报名信息'
    this.data = this.$route.params
    this.getAreaList('0')
    this.isReadonly = this.GlobalVariable.ANDROID_APP === 'student'
    // this.detail = this.$route.params
    this.inSchStudent = sessionStorage.getItem('inSchStudent')
    // this.inSchStudent = 'true' // 测试用的数据
    this.cexamAddress = sessionStorage.getItem('cexamAddress')
    this.cexamTitle = sessionStorage.getItem('cexamTitle')
    this.nExamId = sessionStorage.getItem('nexamId')

    this.cStudentNo = sessionStorage.getItem('userid')
    this.cWorkUnit = this.GlobalVariable.ANDROID_APP === 'student' ? '重庆工业职业技术学院' : ''
    this.idCardSearch()
  },
  create () {
    alert(this.person.age)
  },
  methods: {
    // 上传头像
    upload () {
      Dialog.confirm({
        title: '提示',
        message: `请上传规范的蓝底或白底免冠证件照！`
      })
        .then(() => this.$refs['cropper'].upload())
        .catch(() => {})
    },
    // 上传头像成功回调
    uploadHandle (data, img) {
      if (data.code === 0) {
        this.cIdCardImg = data.fileName
        this.file = img
      }
    },
    // 下拉默认值渲染cExamType
    pickerCExamTypeValue (value) {
      let newData = this.cExamTypeColumns.find((item) => {
        if (item.value === value) {
          return item
        }
      })
      return newData
    },
    pickerCSexValue (value) {
      let newData = this.cSexColumns.find((item) => {
        if (item.value === value) {
          return item
        }
      })
      return newData
    },
    pickerCNationNoValue (value) {
      let newData = this.cNationNoColumns.find((item) => {
        if (item.value === value) {
          return item
        }
      })
      return newData
    },
    pickerPlaceValue (area, city, province) {
      console.log(this.county_list)
      // console.log(this.areaList.city_list[city])
      // console.log(this.areaList.county_list[area])
      // console.log(this.areaList.province_list[province])
      let provinceList = this.province_list[province] || ''
      let cityList = this.city_list[city] || ''
      console.log(this.city_list, city, cityList)
      let countyList = this.county_list[area] || ''
      return provinceList + cityList + countyList
    },
    // 身份证查询信息
    idCardSearch () {
      Toast.loading({
        mask: true,
        duration: 0,
        message: '加载中...'
      })
      axios.post(`${api.querySignUpByCardId}?cIdCard=${this.data.cidCard}&nExamId=${this.data.nexamId}`)
        .then((data) => {
          if (data.data.code === 0) {
            Toast.loading({
              mask: true,
              duration: 3000,
              message: '加载中...'
            })
            this.overlayShow = false
            this.cAddress = data.data.data.caddress
            this.cSexText = this.pickerCSexValue(data.data.data.csex).text
            this.cSex = data.data.data.csex
            this.cWorkUnit = data.data.data.cworkUnit
            this.cBranchName = data.data.data.cbranchName
            this.cBirthplace = `${data.data.data.cbirthProvince} ${data.data.data.cbirthCity} ${data.data.data.cbirthArea}`
            this.cDwellingplace = `${data.data.data.cnowProvince} ${data.data.data.cnowCity} ${data.data.data.cnowArea}`
            this.nZipCode = data.data.data.nzipCode
            this.cStudentNo = data.data.data.cstudentNo
            this.cName = data.data.data.cname
            this.cIdCard = data.data.data.cidCard
            this.cPhone = data.data.data.cphone
            this.cNationNoText = this.pickerCNationNoValue(data.data.data.cnationNo).text
            this.cNationNo = data.data.data.cnationNo
            this.cOccupation = data.data.data.coccupation
            this.cOccupationText = data.data.data.coccupation // 职业返回的是文字
            this.cSchoolName = data.data.data.cschoolName
            // this.cExamGrade = data.data.data.cexamGrade
            this.cIdCardImg = data.data.data.cidCardImg
            this.file = data.data.data.cidCardImg
            this.cExamType = data.data.data.cexamType
            this.cExamTypeText = this.pickerCExamTypeValue(data.data.data.cexamType).text
            this.cBirthArea = data.data.data.cbirthArea
            this.cBirthCity = data.data.data.cbirthCity
            this.cBirthProvince = data.data.data.cbirthProvince
            this.cBirthplaceText = this.pickerPlaceValue(data.data.data.cbirthArea, data.data.data.cbirthCity, data.data.data.cbirthProvince)
            this.cNowArea = data.data.data.cnowArea
            this.cNowCity = data.data.data.cnowCity
            this.cNowProvince = data.data.data.cnowProvince
            this.cDwellingplaceText = this.pickerPlaceValue(data.data.data.cnowArea, data.data.data.cnowCity, data.data.data.cnowProvince)
          } else {
            Toast.loading({
              mask: true,
              duration: 2000,
              message: '未查询到信息'
            })
          }
        })
    },
    // 获取省
    getAreaList (code) {
      axiosGet(`${api.getArea}?code=${code}`)
        .then((data) => {
          data.data.map((item, index) => {
            this.areaList.province_list[item.areaCode] = item.areaName
            // this.province_list[item.areaCode] = item.areaName
            this.$set(this.province_list, item.areaCode, item.areaName)
            this.getAreaChild(item.areaCode)
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getAreaChild (code) {
      axiosGet(`${api.getAreaChild}?code=${code}`)
        .then((data) => {
          data.data.map((item, index) => {
            this.areaList.city_list[item.id] = item.name
            // this.city_list = Object.assign({}, item)
            // this.city_list[item.id] = item.name
            this.$set(this.city_list, item.id + '', item.name)
            this.$forceUpdate()
            this.getCountyList(item.children ? item.children : [])
          })
        })
    },
    // 获取乡
    getCountyList (children) {
      children.map((item, index) => {
        this.areaList.county_list[item.id] = item.name
        this.$set(this.county_list, item.id + '', item.name)
        this.$forceUpdate()

        // this.county_list[item.id] = item.name
      })
      // console.log(_.cloneDeep(this.areaList.county_list))
    },
    // 枚举下拉
    getDict (type) {
      return axiosGet(`${api.getDict}?dictType=${type}`)
        .then((data) => {
          if (data.code === 0) {
            let arrayList = []
            data.data.map((v, i) => {
              arrayList.push({'text': v.dictLabel, 'value': v.dictValue})
            })
            switch (type) {
              case 'exam_type':
                // 学生端(在校生和非在校生)和老师端选择的内容不同
                // 学号是否可编辑（老师端可以编辑true，学生端不可以编辑false）
                this.cExamTypeColumns = arrayList
                this.cOccupationColumns = arrayList
                break
              case 'sys_user_sex':
                this.cSexColumns = arrayList
                break
              case 'sign_nation':
                this.cNationNoColumns = arrayList
                break
              // case 'sign_grade':
              //   this.cExamGradeColumns = arrayList
              //   break
              default :
                return ''
            }
          } else {
            Toast.fail({mask: true}, '服务器出错请联系管理员')
          }
        }).catch(() => {

        })
    },
    // 单类选择器
    openPicker (type) {
      this.pickerType = type
      this.picker = true
      switch (type) {
        case 'cExamType':
          this.pickColumns = this.cExamTypeColumns
          break
        case 'cSex':
          this.pickColumns = this.cSexColumns
          break
        case 'cNationNo':
          this.pickColumns = this.cNationNoColumns
          break
        case 'cOccupation':
          this.pickColumns = this.cOccupationColumns
          break
        // case 'cExamGrade':
        //   this.pickColumns = this.cExamGradeColumns
        //   break
        default :
          this.pickColumns = []
      }
    },
    // 打开区域选择器
    openPickerArea (type) {
      this.pickerArea = true
      this.pickerAreaType = type
    },
    // 选择区域确认
    pickerAreaConfirm (picker, value, index) {
      this.pickerArea = false
      let areaName = ''
      let areaCode = ''
      let pickerData = picker.filter(item => item !== undefined)
      for (var i = 0; i < pickerData.length; i++) {
        areaName = areaName + pickerData[i].name + ' '
        areaCode = areaCode + pickerData[i].code + ' '
      }
      switch (this.pickerAreaType) {
        case 'cBirthplace':
          this.cBirthplaceText = areaName
          this.cBirthplace = areaCode
          break
        case 'cDwellingplace':
          this.cDwellingplaceText = areaName
          this.cDwellingplace = areaCode
          break
        default :
          return ''
      }
    },
    // 单类选择器
    onConfirm (picker, value, index) {
      this.picker = false
      switch (this.pickerType) {
        case 'cExamType':
          this.cExamTypeText = picker.text
          this.cExamType = picker.value
          this.showPrice(picker.value)
          break
        case 'cSex':
          this.cSexText = picker.text
          this.cSex = picker.value
          break
        case 'cNationNo':
          this.cNationNoText = picker.text
          this.cNationNo = picker.value
          break
        case 'cOccupation':
          this.cOccupationText = picker.text
          // this.cOccupation = picker.value
          this.cOccupation = picker.text
          break
        // case 'cExamGrade':
        //   this.cExamGradeText = picker.text
        //   this.cExamGrade = picker.value
        //   break
        default :
          return ''
      }
    },
    showPrice (value) {
      switch (value) {
        case '1':
          this.ninSchoolStudentPriceShow = true
          this.nnotInSchoolStudentPriceShow = false
          this.ninSchoolWorkersPriceShow = false
          break
        case '2':
          this.ninSchoolStudentPriceShow = false
          this.nnotInSchoolStudentPriceShow = true
          this.ninSchoolWorkersPriceShow = false
          break
        case '4':
          this.ninSchoolStudentPriceShow = false
          this.nnotInSchoolStudentPriceShow = false
          this.ninSchoolWorkersPriceShow = true
          break
        default:
          break
      }
    },
    zhifu () {
      this.show = true
    },

    onSelect (item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false
    },
    verification () {
      if (!this.cAddress) {
        this.$toast('地址不能为空')
        return false
      } else if (!this.cWorkUnit) {
        this.$toast('工作单位不能为空')
        return false
      } else if (!this.cBranchName) {
        this.$toast('部门名称不能为空')
        return false
      } else if (!this.cDwellingplaceText) {
        this.$toast('现居住地不能为空')
        return false
      } else if (!this.cBirthplaceText) {
        this.$toast('出生地区不能为空')
        return false
      } else if (!this.cName) {
        this.$toast('工作单位不能为空')
        return false
      } else if (!this.cIdCard) {
        this.$toast('身份证号不能为空')
        return false
      } else if (!this.cPhone) {
        this.$toast('手机号不能为空')
        return false
      } else if (!this.cNationNo) {
        this.$toast('民族不能为空')
        return false
      } else if (!this.cOccupation) {
        this.$toast('职业不能为空')
        return false
      } else if (!this.cExamType) {
        this.$toast('考生类型不能为空')
        return false
      } else if (this.nZipCode && !(/\d{6}/.test(this.nZipCode))) {
        this.$toast('请输入正确的邮政编号')
        return false
      } else {
        return true
      }
    },
    save () {
      if (!this.verification()) {
        return
      }
      this.loadingShow = true
      axios.post(api.signUpSave, qs.stringify({
        cSex: this.cSex,
        cAddress: this.cAddress,
        cExamType: this.cExamType,
        cWorkUnit: this.cWorkUnit,
        cBranchName: this.cBranchName,
        cBirthProvince: this.cBirthplace.split(' ')[0],
        cBirthCity: this.cBirthplace.split(' ')[1],
        cBirthArea: this.cBirthplace.split(' ')[2],
        cNowProvince: this.cDwellingplace.split(' ')[0],
        cNowCity: this.cDwellingplace.split(' ')[1],
        cNowArea: this.cDwellingplace.split(' ')[2],
        nZipCode: this.nZipCode,
        cStudentNo: this.cStudentNo,
        cName: this.cName,
        cIdCard: this.cIdCard,
        cPhone: this.cPhone,
        cNationNo: this.cNationNo,
        cOccupation: this.cOccupationText,
        cSchoolName: this.cSchoolName,
        // cExamGrade: this.cExamGrade,
        cIdCardImg: this.cIdCardImg,
        nExamId: this.data.nexamId
      }))
        .then((data) => {
          if (data.data.code !== 0) {
            this.$toast(data.data.msg)
          } else {
            Toast('您已修改成功！')
            this.loadingShow = false
            setTimeout(() => {
              this.$router.push({ name: 'QueryResult' })
            }, 2000)
          }
        })
    }
  },
  components: {
    SimpleCropper
  }
}
</script>
<style>
  .van-field__control:disabled {
    color: #2a2a2a !important;
    -webkit-text-fill-color: #2a2a2a !important;
  }
</style>
<style lang="scss" scoped src="./index.scss">
</style>
