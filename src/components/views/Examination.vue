<template>
  <div class='secondpage'>
    <div></div>
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
      value="2019-08-24  15:00"
      label="考试时间"
      disabled
      />
      <van-field
      value="二教学楼"
      label="考试场地"
      disabled
      />
      <van-field
      value="￥60.00元"
      label="证书费用"
      disabled
      />
      <van-field
      value="￥60.00元"
      label="资料费用"
      disabled
      />
       <van-field
      value="￥60.00元"
      label="教材费用"
      disabled
      />
       <van-field
      value="￥60.00元"
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
import { Cell, CellGroup, Image, Field, Button, ActionSheet, Picker, Popup, Area, Toast } from 'vant'
import { axiosGet } from '../../comment/http'
import axios from 'axios'
import api from '../../comment/api'
Vue.use(Cell).use(CellGroup).use(Image).use(Field).use(Button).use(Picker).use(Popup).use(Area).use(Toast).use(ActionSheet)
export default {
  data () {
    return {
      value: '',
      picker: false,
      pickerArea: false,
      cAddress: '',
      cWorkUnit: '',
      cBranchName: '',
      cBirthplace: '',
      cDwellingplace: '',
      nZipCode: '',
      cStudentNo: '',
      cSexText: '',
      pickColumns: '',
      cName: '',
      cIdCard: '',
      cPhone: '',
      cNationNo: '',
      cOccupation: '',
      cSchoolName: '',
      cExamGrade: '',
      cExamGradeText: '',
      cBirthplaceText: '',
      cExamTypeText: '',
      cNationNoText: '',
      cOccupationText: '',
      cDwellingplaceText: '',
      pickerType: '',
      pickerAreaType: '',
      cExamTypeColumns: this.getgetDict('exam_type'),
      cSexColumns: this.getgetDict('exam_type'),
      cNationNoColumns: this.getgetDict('sign_nation'),
      cOccupationColumns: [
        {'keyId': 1, 'text': '学生'},
        {'keyId': 2, 'text': '老师'}
      ],
      cExamGradeColumns: this.getgetDict('sign_grade'),
      areaList: {
        province_list: {
          110000: '北京市',
          120000: '天津市'
        },
        city_list: {
          110100: '北京市',
          110200: '县',
          120100: '天津市',
          120200: '县'
        },
        county_list: {
          110101: '东城区',
          110102: '西城区',
          110105: '朝阳区',
          110106: '丰台区',
          120101: '和平区',
          120102: '河东区',
          120103: '河西区',
          120104: '南开区',
          120105: '河北区'
        }
      }
    }
  },
  methods: {
    getgetDict (type) {
      let arrayList = []
      return axiosGet(`${api.getDict}?dictType=${type}`)
        .then((data) => {
          if (data.code === 0) {
            let obj = {
              dictLabel: '',
              dictValue: ''
            }
            arrayList = data.data.map((item) => {
              obj.dictLabel = item.dictLabel
              obj.dictValue = item.dictValue
              return obj
            })
            switch (type) {
              case 'exam_type':
                this.cExamTypeColumns = arrayList
                break
              case 'sys_user_sex':
                this.cSexColumns = arrayList
                break
              case 'sign_nation':
                this.cNationNoColumns = arrayList
                break
              case 'cOccupation':
                this.cOccupationColumns = arrayList
                break
              case 'sign_grade':
                this.cExamGradeColumns = arrayList
                break
              default :
                return ''
            }
            return arrayList
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
    openPickerArea (type) {
      this.pickerArea = true
      this.pickerAreaType = type
    },
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
      this.value = value
      this.picker = false
      switch (this.pickerType) {
        case 'cExamType':
          this.cExamTypeText = picker.dictLabel
          this.cExamType = picker.dictValue
          break
        case 'cSex':
          this.cSexText = picker.dictLabel
          this.cSex = picker.dictValue
          break
        case 'cNationNo':
          this.cNationNoText = picker.dictLabel
          this.cNationNo = picker.dictValue
          break
        case 'cOccupation':
          this.cOccupationText = picker.dictLabel
          this.cOccupation = picker.dictValue
          break
        case 'cExamGrade':
          this.cExamGradeText = picker.dictLabel
          this.cExamGrade = picker.dictValue
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
    save () {
      axios.post(api.signUpSave, {})
    }
  }
}
</script>
<style lang="scss" scoped src="./index.scss">
</style>
