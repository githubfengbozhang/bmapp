<!--
 * @Author: fengbozhang
 * @Date: 2019-10-15 12:54:12
 * @LastEditors: fengbozhang
 * @LastEditTime: 2019-10-17 14:34:51
 -->
<template>
  <div class="v-simple-cropper">
    <slot>
      <button @click="upload">上传图片</button>
    </slot>
    <input class="file" ref="file" type="file" accept="image/*" @change="uploadChange">
    <div class="v-cropper-layer" ref="layer">
      <div class="layer-header">
        <!-- <button class="cancel" @click="cancelHandle">取消</button>
        <button class="confirm" @click="confirmHandle">裁剪</button> -->
        <van-row type="flex" justify="space-between">
          <van-col span="6"><van-button type="primary" @click="cancelHandle">取消</van-button></van-col>
          <van-col span="6"><van-button :loading='loading' type="primary" loading-text="裁剪中..." @click="confirmHandle">裁剪</van-button></van-col>
        </van-row>
      </div>
      <img ref="cropperImg">
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'
import { Button, Row, Col } from 'vant'
import axios from 'axios'
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
      loading: false
    }
  },
  mounted () {
    this.init()
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
    // 初始化裁剪插件
    init () {
      let cropperImg = this.$refs['cropperImg']
      this.cropper = new Cropper(cropperImg, {
        aspectRatio: 12 / 16,
        dragMode: 'move',
        viewMode: 1,
        movable: true, // 是否允许可以移动后面的图片
        touchDragZoom: true, // 是否允许通过触摸移动来缩放图片。
        zoomable: true, // 是否允许放大图像。
        cropBoxResizable: false
      })
    },
    // 点击上传按钮
    upload () {
      this.$refs['file'].click()
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
