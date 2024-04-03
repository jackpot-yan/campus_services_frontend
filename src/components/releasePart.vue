<template>
  <div id="release">
    <el-form
        ref="form"
        :model="partForm"
        label-position="left"
        size="large"
        label-width="100px"
    >
      <el-form-item label="任务名">
        <el-input v-model="partForm.name"/>
      </el-form-item>
      <el-form-item label="大致介绍">
        <el-input
            v-model="partForm.introduce"
            style="width: 500px"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="简单介绍工作内容"
        />
      </el-form-item>
      <el-form-item label="要求">
        <el-input
            v-model="partForm.require"
            style="width: 500px"
            :autosize="{ minRows: 2, maxRows: 3 }"
            type="textarea"
            placeholder="简短描述要求"
        />
      </el-form-item>
      <el-form-item label="工作地点">
        <el-input v-model="partForm.local"/>
      </el-form-item>
      <el-form-item label="佣金">
        <el-input v-model="partForm.commission"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import {reactive} from "vue";
import {addPart} from '../api/part.js'
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

const route = useRouter()
const partForm = reactive({
  name: '',
  introduce: '',
  local: '',
  commission: '',
  require: '',
  idCard: 0
})

const onSubmit = () => {
  partForm.idCard = parseInt(localStorage.getItem('idCard'))
  addPart(partForm).then(res => {
    ElMessage.success('发布成功，等待管理员审核')
    route.push({'path': '/part'})
  }).catch(err => {
    ElMessage.error(err)
  })
}
</script>
<style scoped>
#release {
  margin-left: 20px;
}
</style>