<template>
  <div id="login">
    <div id="top">
      <div id="name">校园综合服务平台</div>
    </div>
    <div id="buttom">
      <div id="loginInfo">
        <el-form :model="loginFrom" label-position="left" label-width="auto" style="margin: 10%;">
          <el-form-item label="学生证号">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input></el-input>
          </el-form-item>
          <el-form-item>
            <el-link type="primary" style="margin-right: 50%;" @click="typeChange">{{ loginType }}</el-link>
            <el-link type="warning" @click="forgetPassword">忘记密码?</el-link>
          </el-form-item>
          <el-form-item>
            <el-button style="margin-right: 20%;margin-left: 20%;" type="primary" @click="loginSuccess">登录</el-button>
            <el-button>注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
  <el-dialog v-model="forgetPasswordDialog" style="width: 40%;">
    <div style="margin-bottom: 10%;">如您忘记密码,可<el-link type="primary">点击此处</el-link>修改密码</div>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue"
import { useRouter } from 'vue-router'

const loginFrom = reactive({
  userName: '',
  passWord: ''
})
const route = useRouter()
const loginType = ref<string>('管理员登录')
const loginTypeCode = ref<number>(0)
const forgetPasswordDialog = ref<boolean>(false)
const typeChange = () => {
  if (loginType.value == '管理员登录') {
    loginType.value = "普通用户登录"
    loginTypeCode.value = 0
  } else {
    loginType.value = '管理员登录'
    loginTypeCode.value = 1
  }
}
const forgetPassword = () => {
  forgetPasswordDialog.value = true
}
const loginSuccess = () => {
  route.push({
    path: '/home'
  })
}
</script>
<style>
#login {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-image: url("../src/assets/background.webp");
  background-size: cover;
  position: absolute;
}

#top {
  height: 30%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#name {
  color: #0FEEDF;
  font-size: 32px;
  font-weight: 600;
}

#buttom {
  height: 70%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
}

#loginInfo {
  width: 30%;
  height: 50%;
  background-color: white;
  border-radius: 10px;
}</style>