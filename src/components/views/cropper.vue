<!--
 * @Author: fengbozhang
 * @Date: 2019-10-15 12:54:12
 * @LastEditors: fengbozhang
 * @LastEditTime: 2019-11-06 18:43:50
 -->
<template>
  <div class="v-simple-cropper">
    <slot>
      <button @click="upload">上传图片</button>
    </slot>
    <input class="file" ref="file" type="file" accept="image/*" @change="uploadChange">
    <div class="v-cropper-layer" ref="layer" id='layer'>
      <div class="layer-header">
        <!-- <button class="cancel" @click="cancelHandle">取消</button>
        <button class="confirm" @click="confirmHandle">裁剪</button> -->
        <van-row type="flex" justify="space-between">
          <van-col span="6"><van-button type="primary" @click="cancelHandle">取消</van-button></van-col>
          <van-col span="6"><van-button :loading='loading' type="primary" loading-text="裁剪中..." @click="confirmHandle">裁剪</van-button></van-col>
        </van-row>
      </div>
      <img ref="cropperImg" :src='defalutsrc'>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'
import { Button, Row, Col } from 'vant'
import axios from 'axios'
import api from '@comment/api'
import Vue from 'vue'
Vue.use(Button).use(Row).use(Col)
export default {
  name: 'v-simple-cropper',
  props: {
    initParam: Object,
    successCallback: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      cropper: {},
      filename: '',
      loading: false,
      isAndroid: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1,
      isiOS: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      defalutsrc: require('../../assets/touxiang.png')
    }
  },
  mounted () {
    this.init()
    console.log(this.GlobalVariable.ANDROID_APP)
  },
  methods: {
    // base64转为二进制流
    dataURLtoBlob (baseurl, filename) {
      let arr = baseurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      // return new Blob([u8arr], {
      //   type: mime
      // })
      return new File([u8arr], filename, { type: mime })
    },

    getBase64Image (img) {
      var canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      var ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, img.width, img.height)
      var ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
      var dataURL = canvas.toDataURL('image/' + ext)
      return dataURL
    },
    dataURLtoFile (dataurl, filename) {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, {type: mime})
    },
    // 初始化裁剪插件
    init () {
      let cropperImg = this.$refs['cropperImg']
      this.cropper = new Cropper(cropperImg, {
        // aspectRatio: 12 / 16,
        dragMode: 'move',
        viewMode: 0,
        movable: true, // 是否允许可以移动后面的图片
        scalable: true, // 是否允许通过触摸移动来缩放图片。
        zoomOnTouch: true,
        zoomable: true, // 是否允许放大图像。
        cropBoxResizable: false,
        minCropBoxWidth: 390,
        minCropBoxHeight: 567
        // minCanvasWidth: 390,
        // minCanvasHeight: 567,
      })
      // this.cropper.setCropBoxData({'width': 390, 'height': 567})
    },
    barcodeCallback () {
      console.log('返回摄像1')
      window.jsBridge.bind('CLIENT_CHOOSE_IMAGE_RESULT', function (object) {
        var json = JSON.stringify(object)
        console.log(json + '返回摄像2')
      })
    },
    barcodeOpen () {
      console.log('调用摄像头')
      var param = {
        'show': 1,
        'tools': [{'name': 'cx_image', 'info': {'camera': 3}},
          {'name': 'cx_camera', 'info': {'camera': 3}}
          // {'name': 'cx_video', 'info': {'camera': 3}}
        ]
      }
      let jsBridge = (object) => {
        console.log('本机')
        let file = JSON.parse(object['files'])
        this.filename = file[0]['name']
        let URL = window.URL || window.webkitURL
        this.$refs['layer'].style.display = 'block'
        let dataURL = ''
        console.log('本机img')
        axios.get(`${api.imgtobase64}?imgurl=http://p.ananas.chaoxing.com/star3/origin/${file[0]['objectid']}.${file[0]['type']}`)
          .then((data) => {
            if (data.data.code === 0) {
              dataURL = this.dataURLtoFile(data.data.msg, this.filename)
              this.cropper.replace(URL.createObjectURL(dataURL))
            }
          })
      }
      window.jsBridge.postNotification('CLIENT_SELECT_OPTION_BAR', param)
      try {
        window.jsBridge.bind('CLIENT_CHOOSE_IMAGE_RESULT', function (object) {
          // var json = JSON.stringify(object)
          jsBridge(object)
        })
      } catch (e) {}
    },
    // 点击上传按钮
    upload () {
      if (this.isAndroid && this.GlobalVariable.ANDROID_APP === 'teacher') {
        this.barcodeOpen()
      } else if (this.isiOS || this.GlobalVariable.ANDROID_APP !== 'teacher') {
        this.$refs['file'].click()
      }
    },
    // 选择上传文件
    uploadChange (e) {
      let file = e.target.files[0]
      this.filename = file['name']
      let URL = window.URL || window.webkitURL
      this.$refs['layer'].style.display = 'block'
      this.cropper.replace(URL.createObjectURL(file))
    },
    // 取消上传
    cancelHandle () {
      this.cropper.reset()
      this.$refs['layer'].style.display = 'none'
      this.$refs['file'].value = ''
    },
    // 确定上传
    confirmHandle () {
      this.loading = true
      let cropBox = this.cropper.getCropBoxData()
      let scale = this.initParam['scale'] || 1
      let cropCanvas = this.cropper.getCroppedCanvas({
        width: cropBox.width * scale,
        height: cropBox.height * scale
      })
      let imgData = cropCanvas.toDataURL('image/jpeg')
      let formData = new window.FormData()
      formData.append('avatar', this.dataURLtoBlob(imgData))
      axios.post(this.initParam['uploadURL'],
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(res => {
        this.loading = false
        this.successCallback(res.data, imgData)
        this.cancelHandle()
      })
    }
  }
}
</script>

<style lang="scss">
.v-simple-cropper {
  .file {
    display: none;
  }
  .v-cropper-layer {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 99999;
    display: none;
    .layer-header {
    //   position: absolute;
      top: 0;
      left: 0;
      z-index: 99999;
      background: #fff;
      width: 100%;
      height: 5rem;
      padding: 1.5rem .2rem;
      box-sizing: border-box;
    }
    .cancel,
    .confirm {
      line-height: .8rem;
      font-size: 1rem;
      background: inherit;
      border: 0;
      outline: 0;
      float: left;
    }
    .confirm {
      float: right;
    }
    img {
      position: inherit!important;
      border-radius: inherit!important;
      float: inherit!important;
    }
  }
}
</style>
