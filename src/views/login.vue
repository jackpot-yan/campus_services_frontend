<template>
  <div id="login">
    <div id="top">
      <div id="name">校园综合服务平台</div>
    </div>
    <div id="buttom">
      <div id="loginInfo">
        <el-form :model="loginFrom" label-position="left" label-width="auto" style="margin: 10%;">
          <el-form-item :label="idType">
            <el-input v-model="loginFrom.id"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="loginFrom.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-link type="primary" style="margin-right: 50%;" @click="typeChange">{{ loginType }}</el-link>
            <el-link type="warning" @click="forgetPassword">忘记密码?</el-link>
          </el-form-item>
          <el-form-item>
            <el-button style="margin-right: 20%;margin-left: 20%;" type="primary" @click="loginSuccess">登录</el-button>
            <el-button @click="registerSuccess">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
  <el-dialog v-model="forgetPasswordDialog" style="width: 40%;">
    <div style="margin-bottom: 10%;">如您忘记密码,可
      <el-link type="primary">点击此处</el-link>
      修改密码
    </div>
  </el-dialog>
  <el-dialog v-model="registerDialog" style="width: 40%;">
    <el-form :model="registerFrom" label-position="left" label-width="auto" max-width="40%">
      <el-form-item label="学生证号">
        <el-input v-model="registerFrom.id"/>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="registerFrom.userName"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="registerFrom.password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="registerEvent">注册</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts" setup>
import {reactive, ref} from "vue"
import {useRouter} from 'vue-router'
import {register, login} from '../api/user.js'
import {ElMessage} from "element-plus";

const loginFrom = reactive({
  id: '',
  password: '',
  userType: 0
})
const registerDialog = ref<boolean>(false)
const registerFrom = reactive({
  userName: '',
  id: '',
  password: '',
  userType: 0
})
const idType = ref<string>('学生证号')
const route = useRouter()
const loginType = ref<string>('管理员登录')
const loginTypeCode = ref<number>(0)
const forgetPasswordDialog = ref<boolean>(false)
const typeChange = () => {
  if (loginType.value == '管理员登录') {
    loginType.value = "普通用户登录"
    idType.value = '管理员ID'
    loginTypeCode.value = 1
  } else {
    loginType.value = '管理员登录'
    idType.value = '学生证号'
    loginTypeCode.value = 0
  }
}
const registerEvent = () => {
  if (registerFrom.id === '' || registerFrom.userName === '' || registerFrom.password === '') {
    alert('关键字段为空')
  } else {
    register(registerFrom).then(res => {
      const {code, msg} = res.data
      if (code != 0) {
        alert(msg)
      } else {
        alert('注册成功!')
        localStorage.setItem('idCard', registerFrom.id)
        route.replace({
          path: '/home'
        })
      }
    }).catch(err => {
      alert(err)
    })
  }
}
const forgetPassword = () => {
  forgetPasswordDialog.value = true
}
const registerSuccess = () => {
  registerDialog.value = true
}
const loginSuccess = () => {
  if (loginFrom.password === '' || loginFrom.id === '') {
    alert('缺少关键字段填写!')
  } else {
    loginFrom.userType = loginTypeCode.value
    if (loginFrom.userType === 1) {
      login(loginFrom).then(res => {
        const {msg, code} = res.data
        if (code == 0) {
          route.push('/admin')
        } else {
          ElMessage.error(msg)
        }
      })
    } else {
      login(loginFrom).then(res => {
        const {msg, code} = res.data
        if (code != 0) {
          alert(msg)
        } else {
          alert('登录成功!')
          localStorage.setItem('idCard', loginFrom.id)
          if (loginTypeCode.value === 0) {
            route.replace({
              path: '/home'
            })
          }
        }
      }).catch(err => {
        alert(err)
      })
    }
  }
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
}
</style>