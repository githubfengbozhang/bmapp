<template>
  <div class='secondpage'>
    <van-cell-group>
      <van-uploader :after-read="onRead" :accept="'image/*'" :max-count="1">
        <van-cell title="头像" right-icon="arrow" value="内容" >
          <van-image
            ref="goodsImg"
            slot="default"
            round
            width="3rem"
            height="3rem"
            :src="file"
          />
          <van-icon
            slot="right-icon"
            name="arrow"
            style="line-height: inherit;"
          />
        </van-cell>
      </van-uploader>
    </van-cell-group>
    <van-cell-group>
      <van-icon name="search" class="idCardIcon" @click="idCardSearch()"/>
      <van-field
        v-model="cIdCard"
        label="身份证号"
        placeholder="请输入考生身份证号码"
        clearable
        required
        disabled
        @touchstart.native.stop="numberShow = true"
      />
      <van-number-keyboard
        v-model="cIdCard"
        :show="numberShow"
        extra-key="x"
        :maxlength="18"
        safe-area-inset-bottom = true
        @blur="numberShow = false"
      />
      <van-field
        readonly
        clickable
        :value="cExamTypeText"
        label="考生类别"
        placeholder="请选择考生类别"
        @click="openPicker('cExamType')"
        required
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
        clickable
        :value="cOccupationText"
        label="职业"
        placeholder="请选择职业"
        @click="openPicker('cOccupation')"
        required
      />
      <van-field
        v-model="cStudentNo"
        label="学号"
        placeholder="请输入学生证学号"
        clearable
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
        clearable
        required
      />
      <van-field
        v-model="cWorkUnit"
        label="工作单位"
        placeholder="请输入工作单位"
        clearable
        required
      />
      <van-field
        v-model="cBranchName "
        label="部门"
        placeholder="请输入部门"
        clearable
        required
      />
      <van-field
        v-model="cSchoolName"
        label="所在院系"
        placeholder="请输入所在院系"
        clearable
      />
      <van-field
        readonly
        clickable
        :value="cExamGradeText"
        label="报考级别"
        placeholder="请选择报考级别"
        @click="openPicker('cExamGrade')"
      />
      <van-field
        v-model="nZipCode"
        label="邮编"
        placeholder="请输入邮编"
        clearable
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
      v-model="cexamAddress"
      label="考试场地"
      disabled
      />
      <van-field v-show="ninSchoolStudentPriceShow"
      v-model="ninSchoolStudentPrice"
      label="报名费"
      disabled
      />
      <van-field v-show="nnotInSchoolStudentPriceShow"
      v-model="nnotInSchoolStudentPrice"
      label="报名费"
      disabled
      />
     <van-field v-show="ninSchoolWorkersPriceShow"
      v-model="ninSchoolWorkersPrice"
      label="报名费"
      disabled
      />
   </van-cell-group>
   <van-button type="info" :loading = 'loadingShow' loading-text="报名进行中..." size='large' @click="save()">考试报名</van-button>
   <!-- <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      @select="onSelect"
      @cancel="onCancel"
    /> -->
  </div>
</template>
<script>
import Vue from 'vue'
import { Cell, CellGroup, Image, Field, Button, ActionSheet, Picker, Popup, Area, Toast, Icon, Uploader, Dialog, NumberKeyboard } from 'vant'
import { axiosGet } from '../../comment/http'
import numberFormat from '@uilt/momey'
import axios from 'axios'
import api from '../../comment/api'
import qs from 'qs'
Vue.use(Cell).use(CellGroup).use(Image).use(Field).use(Button).use(Picker).use(Popup).use(Area).use(Toast).use(Icon).use(Uploader).use(Dialog).use(NumberKeyboard).use(ActionSheet)
export default {
  data () {
    return {
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
      cStudentNo: '',
      cName: '',
      cIdCard: '652922199008036050',
      cPhone: '',
      cNationNo: '',
      cOccupation: '',
      cSchoolName: '',
      cExamGrade: '',
      cIdCardImg: '',
      cExamType: '',
      // 图片
      file: require('../../assets/touxiang.png'),
      // 下拉显示的值
      cSexText: '',
      cExamGradeText: '',
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
      cExamGradeColumns: this.getDict('sign_grade'),
      areaList: {
        province_list: {},
        city_list: {},
        county_list: {}
      },
      // 计划详情
      detail: {}
    }
  },
  mounted () {
    document.title = '立即报名'
    this.getAreaList('0')
    this.detail = this.$route.params
    this.ninSchoolStudentPrice = numberFormat(this.detail.ninSchoolStudentPrice)
    this.nnotInSchoolStudentPrice = numberFormat(this.detail.nnotInSchoolStudentPrice)
    this.ninSchoolWorkersPrice = numberFormat(this.detail.ninSchoolWorkersPrice)
    this.cexamAddress = this.detail.cexamAddress
    this.nExamId = this.detail.nexamId
  },
  methods: {
    // 下拉默认值渲染cExamType
    pickerCExamTypeValue (value) {
      let newData = this.cExamTypeColumns.filter((item) => {
        if (item.value === value) {
          return item
        }
      })
      console.log(newData)
      return newData
    },
    pickerCSexValue (value) {
      let newData = this.cSexColumns.filter((item) => {
        if (item.value === value) {
          return item
        }
      })
      console.log(newData)
      return newData
    },
    pickerCNationNoValue (value) {
      let newData = this.cNationNoColumns.filter((item) => {
        if (item.value === value) {
          return item
        }
      })
      console.log(newData)
      return newData
    },
    pickerPlaceValue (area, city, province) {
      console.log(this.areaList)
      let provinceList = this.areaList.province_list[province]
      let cityList = this.areaList.city_list[city]
      let countyList = this.areaList.county_list[area]
      return provinceList + cityList + countyList
    },
    // 身份证查询信息
    idCardSearch () {
      axios.post(`${api.querySignUpByCardId}?cIdCard=${this.cIdCard}&nExamId=${this.nExamId}`)
        .then((data) => {
          if (data.data.code === 0) {
            Dialog.confirm({
              title: '提示',
              message: '您已有该考试计划的报名信息，是否重新填写？'
            }).then(() => {
              this.cAddress = data.data.data.caddress
              this.cSexText = this.pickerCSexValue(data.data.data.csex)[0].text
              this.cSex = data.data.data.csex
              this.cWorkUnit = data.data.data.cworkUnit
              this.cBranchName = data.data.data.cbranchName
              this.cBirthplace = data.data.data.cAddress
              this.cDwellingplace = data.data.data.cdwellingplace
              this.nZipCode = data.data.data.nzipCode
              this.cStudentNo = data.data.data.cstudentNo
              this.cName = data.data.data.cname
              this.cIdCard = data.data.data.cidCard
              this.cPhone = data.data.data.cphone
              this.cNationNoText = this.pickerCNationNoValue(data.data.data.cnationNo)[0].text
              this.cNationNo = data.data.data.cnationNo
              this.cOccupation = data.data.data.coccupation
              this.cOccupationText = this.pickerCExamTypeValue(data.data.data.coccupation)[0].text
              this.cSchoolName = data.data.data.cschoolName
              this.cExamGrade = data.data.data.cexamGrade
              this.file = data.data.data.cidCardImg
              this.cExamType = data.data.data.cexamType
              this.cExamTypeText = this.pickerCExamTypeValue(data.data.data.cexamType)[0].text
              this.cBirthArea = data.data.data.cbirthArea
              this.cBirthCity = data.data.data.cbirthCity
              this.cBirthProvince = data.data.data.cbirthProvince
              this.cBirthplaceText = this.pickerPlaceValue(data.data.data.cbirthArea, data.data.data.cbirthCity, data.data.data.cbirthProvince)
              this.cDwellingplaceText = this.pickerPlaceValue(data.data.data.cnowArea, data.data.data.cnowCity, data.data.data.cnowProvince)
            }).catch(() => {
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
            this.getAreaChild(item.areaCode)
          })
        })
    },
    getAreaChild (code) {
      axiosGet(`${api.getAreaChild}?code=${code}`)
        .then((data) => {
          data.data.map((item, index) => {
            this.areaList.city_list[item.id] = item.name
            this.getCountyList(item.children ? item.children : [])
          })
        })
    },
    // 获取乡
    getCountyList (children) {
      children.map((item, index) => {
        this.areaList.county_list[item.id] = item.name
      })
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
                this.cExamTypeColumns = arrayList.filter(item => {
                  return item.value !== '3'
                })
                this.cOccupationColumns = arrayList.filter(item => {
                  return item.value !== '3'
                })
                break
              case 'sys_user_sex':
                this.cSexColumns = arrayList
                break
              case 'sign_nation':
                this.cNationNoColumns = arrayList
                break
              case 'sign_grade':
                this.cExamGradeColumns = arrayList
                break
              default :
                return ''
            }
          } else {
            Toast.fail({mask: true}, '服务器出错请联系管理员')
          }
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
        case 'cExamGrade':
          this.pickColumns = this.cExamGradeColumns
          break
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
      for (var i = 0; i < picker.length; i++) {
        areaName = areaName + picker[i].name + ' '
        areaCode = areaCode + picker[i].code + ' '
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
          this.cOccupation = picker.value
          break
        case 'cExamGrade':
          this.cExamGradeText = picker.text
          this.cExamGrade = picker.value
          break
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
      } else if (!this.cDwellingplace) {
        this.$toast('现居住地不能为空')
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
      } else {
        return true
      }
    },
    // base64转为二进制流
    dataURLtoBlob (baseurl) {
      let arr = baseurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], {
        type: mime
      })
    },
    // 上传图片
    onRead (file) {
      // 将原图片显示为选择的图片
      // this.$refs.goodsImg.src = file.content
      this.file = file.content
      let formData = new FormData()
      formData.append('avatar', this.dataURLtoBlob(file.content))
      axios.post(`${api.upload}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
        .then((data) => {
          if (data.data.code === 0) {
            this.cIdCardImg = data.data.fileName
          } else if (data.data.code !== 0) {
            Toast.fail({mask: true}, data.data.msg)
          }
        })
    },
    // 提交
    save () {
      console.log(this.detail.nexamId)
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
        cOccupation: this.cOccupation,
        cSchoolName: this.cSchoolName,
        cExamGrade: this.cExamGrade,
        cIdCardImg: this.cIdCardImg,
        nExamId: this.detail.nexamId
      }))
        .then((data) => {
          this.loadingShow = false
          if (data.data.code !== 0) {
            this.$toast(data.data.msg)
          } else {
            const payData = {
              cDataSrc: 'APP',
              cTradeNo: data.data.data.ctradeNo,
              nExamId: this.detail.nexamId,
              nPayAmt: data.data.data.npayAmt
            }
            this.$router.push({ name: 'Pay', params: payData })
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped src="./index.scss">
</style>
