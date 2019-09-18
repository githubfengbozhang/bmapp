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
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMkAAADJCAMAAAC+GOY3AAADAFBMVEVHcEzqoirujB3qqTXkoSexix/rsTzhmCXrsTbqni3umSHtmCPquzjujyHquznstkHujSHtnSfuih/vhRzqwTzuniDssTTrtjbunyPruTfsqzHvph3sqzDruzjtpCz648zqwTzsuz3xqg741b7rvzvqvzvtnCnvhBvunyHumSbtpyrvhx3ukiPqwDzqvzr3zKz1w5rJqJz3z6bwphDsrTLrtzfrujnruDfqwDv0q3zxrhLxsRLrvDn2wZjujSHwsg/ssTPujiDwsx/zxKzrujnqvjvtliXsqzDsqS/tnyrujyHrtTbspi7rtjfujSDrszXrtzftmSfruTjtoCvtoizuix/rsjTukyTruznrsTTviR7tlybqvTrrsDPvhx3tmCbtmijtmyjtnCnrrzPrtDbukiPrtDXtnSntoSvukSPqwTz78fLsoyzsrjL78vTulCTspC3srTLsrDHspy756+345en45+qYUCiCQyv56ezqvzuzXiWpWSb77/GsWyb34eXvgxv89vf89PXukCN4Piz67O735OfukCKKSCqQSymSTCmFRSr23+OIRir30Vn67e+bUSj402B/QiuiVSekViemVyf2zU99QSt6QCz23uL73oTvhRz1xz774Yr+9/j95JV1PCz0xTn0wi3zviLyvBv0xDPspS2NSiqMSSqUTimLSSqTTSmdUyiVTin++vqcUiieUyj3zlVzPC341Gb23OGgVCf41Wn51m352HD//v752XT62nf2ykf623v2y0r63H6uXCawXSX1yUP24eTxtw384o/zvyjxuhbrXl3+6aTxuRP95Zr12t/+5p3uiZK/bifRiSz1xpnDeClyOy3JgCv2z67ztG/yslL33NXxp0r208Pcmi/wmTP1wWTxpUDwq2H87uP2wFPh0M3tblbhoDCrhn31xoPxozbytZLtem6pZSqPYVb71o7mqjKGUUGec2i5mJD3xnL1vjm1cjDVwLvHqp+eXSvvil3zuCrOtK+aY0jvlHnytiK6kHXtez7xtA0z/A38AAAARHRSTlMALlYkEAM6CEcchWRsv35brHKX8/yztuOeo9HcmZDw/uje5eXVtc7axPDB6ePzy8OE8JjL9/nuxcbs8Pn6xNL+787737uwzQAAABFhSURB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"
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
        v-model="cStudentNo"
        label="学号"
        placeholder="请输入学生证学号"
        clearable
        required
      />
      <van-field
        v-model="cIdCard"
        label="身份证号"
        placeholder="请输入考生身份证号码"
        clearable
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
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="cSchoolName"
        label="所在院系"
        placeholder="请输入所在院系"
        clearable
        required
      />
      <van-field
        readonly
        clickable
        :value="cExamGradeText"
        label="报考级别"
        placeholder="请选择报考级别"
        @click="openPicker('cExamGrade')"
        required
      />
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
        v-model="cWorkUnit "
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
        v-model="nZipCode"
        label="邮编"
        placeholder="请输入邮编"
        clearable
        required
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
      v-model="detail.cexamAddress"
      label="考试场地"
      disabled
      />
      <van-field
      v-model="baseDate.cexamAddress"
      label="证书费用"
      disabled
      />
      <van-field
      v-model="baseDate.cexamAddress"
      label="资料费用"
      disabled
      />
      <van-field
      v-model="baseDate.cexamAddress"
      label="教材费用"
      disabled
      />
       <van-field
      v-model="baseDate.cexamAddress"
      label="其他费用"
      disabled
      />
   </van-cell-group>
   <van-button type="info" size='large' @click="save()">提交并支付</van-button>
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
import { Cell, CellGroup, Image, Field, Button, ActionSheet, Picker, Popup, Area, Toast, Icon, Uploader } from 'vant'
import { axiosGet } from '../../comment/http'
import axios from 'axios'
import api from '../../comment/api'
import qs from 'qs'
Vue.use(Cell).use(CellGroup).use(Image).use(Field).use(Button).use(Picker).use(Popup).use(Area).use(Toast).use(Icon).use(Uploader).use(ActionSheet)
export default {
  data () {
    return {
      // 报名基础信息
      baseDate: {
        ninSchoolStudentPrice: '0',
        nnotInSchoolStudentPrice: '0',
        nsocialWorkersPrice: '0',
        ninSchoolWorkersPrice: '0',
        texamBeginTime: '0',
        cexamAddress: '0'
      },
      // 单项选择器弹窗是否显示
      picker: false,
      // 区域选择器弹窗是否显示
      pickerArea: false,
      // 提交的数据
      cAddress: '',
      cWorkUnit: '',
      cBranchName: '',
      cBirthplace: '',
      cDwellingplace: '',
      nZipCode: '',
      cStudentNo: '',
      pickColumns: '',
      cName: '',
      cIdCard: '',
      cPhone: '',
      cNationNo: '',
      cOccupation: '',
      cSchoolName: '',
      cExamGrade: '',
      // 图片
      file: '',
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
    console.log(this.detail)
  },
  methods: {
    // 获取省
    getAreaList (code) {
      axiosGet(`${api.getArea}?code=${code}`)
        .then((data) => {
          data.data.map((item, index) => {
            this.areaList.province_list[item.areaCode] = item.areaName
            this.getCityList(item.areaCode)
          })
        })
    },
    // 获取市级
    getCityList (code) {
      axiosGet(`${api.getArea}?code=${code}`)
        .then((data) => {
          data.data.map((item, index) => {
            this.areaList.city_list[item.areaCode] = item.areaName
            this.getCountyList(item.areaCode)
          })
        })
    },
    // 获取乡
    getCountyList (code) {
      axiosGet(`${api.getArea}?code=${code}`)
        .then((data) => {
          data.data.map((item, index) => {
            this.areaList.county_list[item.areaCode] = item.areaName
          })
        })
    },
    // 上传图片
    onRead (file) {
      this.file = file
      // 将原图片显示为选择的图片
      this.$refs.goodsImg.src = file.content
      console.log(file)
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
                this.cExamTypeColumns = arrayList
                this.cOccupationColumns = arrayList
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
      } else if (!this.cWorkUnit) {
        this.$toast('工作单位不能为空')
        return false
      } else if (!this.cDwellingplace) {
        this.$toast('工作单位不能为空')
        return false
      } else if (!this.nZipCode) {
        this.$toast('工作单位不能为空')
        return false
      } else if (!this.cStudentNo) {
        this.$toast('工作单位不能为空')
        return false
      } else if (!this.cName) {
        this.$toast('工作单位不能为空')
        return false
      } else if (!this.cIdCard) {
        this.$toast('工作单位不能为空')
        return false
      } else if (!this.cPhone) {
        this.$toast('工作单位不能为空')
        return false
      } else if (!this.cNationNo) {
        this.$toast('工作单位不能为空')
        return false
      } else if (!this.cOccupation) {
        this.$toast('工作单位不能为空')
        return false
      } else if (!this.cSchoolName) {
        this.$toast('工作单位不能为空')
        return false
      } else if (!this.cExamGrade) {
        this.$toast('工作单位不能为空')
        return false
      } else {
        return true
      }
    },
    // 提交
    save () {
      if (!this.verification()) {
        return
      }
      let file = this.file
      let formData = new FormData()
      formData.append('file', file.content)
      axios.post(`${api.upload}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      axios.post(api.signUpSave, qs.parse({
        cAddress: this.cAddress,
        cWorkUnit: this.cWorkUnit,
        cBranchName: this.cBranchName,
        cBirthplace: this.cBirthplace,
        cDwellingplace: this.cDwellingplace,
        nZipCode: this.nZipCode,
        cStudentNo: this.cStudentNo,
        cName: this.cName,
        cIdCard: this.cIdCard,
        cPhone: this.cPhone,
        cNationNo: this.cNationNo,
        cOccupation: this.cOccupation,
        cSchoolName: this.cSchoolName,
        cExamGrade: this.cExamGrade
      }))
    }
  }
}
</script>
<style lang="scss" scoped src="./index.scss">
</style>
