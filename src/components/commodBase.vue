<template>
  <div id="commodInfo">
    <el-form
        ref="form"
        :model="commodForm"
        label-width="auto"
        label-position="left"
        size="large"
    >
      <el-form-item label="商品名">
        <el-input v-model="commodForm.title"/>
      </el-form-item>
      <el-form-item label="商品介绍">
        <el-input
            v-model="commodForm.introduce"
            style="width: 240px"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="Please input"
        />
      </el-form-item>
      <el-form-item label="剩余库存">
        <el-input v-model="commodForm.stock"/>
      </el-form-item>
      <el-form-item label="单价">
        <el-input v-model="commodForm.single"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
    <el-upload
        style="margin-left: 30px"
        v-model:file-list="fileList"
        class="upload-demo"
        action="http://127.0.0.1:3000/getImage"
        headers="headers"
        method="post"
        list-type="picture"
        :on-success='getPath'
    >
      <el-button type="primary">点击上传图片</el-button>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500kb
        </div>
      </template>
    </el-upload>
  </div>
</template>
<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {ElMessage, UploadUserFile} from 'element-plus'
import {addCommod} from '../api/commod.js'

const commodForm = reactive({
  title: '',
  introduce: '',
  stock: 0,
  single: 0,
  idCard: 0,
  page: ''
})

const headers = {
  'Content-Type': 'multipart/form-data;charseutf-8',
}

const fileList = ref<UploadUserFile>()

const getPath = (response: any) => {
  commodForm.page = response.msg
}

const onSubmit = () => {
  const id = localStorage.getItem('idCard') || ''
  commodForm.idCard = parseInt(id)
  addCommod(commodForm).then(res => {
    ElMessage('提交成功，等待管理员审核')
  })
}
</script>
<style scoped>
#commodInfo {
  width: 80%;
  margin: 2%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
</style>