<template>
  <div id="userInfo">
    <div id="infoMenu">
      <el-menu default-active="1" class="el-menu-vertical-demo" @select="showContent">
        <el-menu-item index="1">
          <span>个人资料</span>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            订单相关
          </template>
          <el-menu-item index="2-1">已购订单</el-menu-item>
          <el-menu-item index="2-2">正在出售</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="3">
          <span>历史浏览</span>
        </el-menu-item>
        <el-sub-menu index="4">
          <template #title>
            兼职相关
          </template>
          <el-menu-item index="4-1">任务目录</el-menu-item>
          <el-menu-item index="4-2">已发布任务</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="5">商品收藏</el-menu-item>
      </el-menu>
    </div>
    <div id="infoContent">
      <el-form v-if="showCode === '1'" :model="baseInfo">
        <el-form-item label="昵称:">
          <span v-if="modifyName == false" style="color: black;">{{ baseInfo.userName }}</span>
          <el-input style="width: 300px" v-if="modifyName == true" :placeholder="baseInfo.userName"
            v-model="modifyUserName"></el-input>
          <el-link v-if="modifyName == false" style="margin-left: 30%;" @click="modifyTrue">修改</el-link>
          <el-button style="margin-left: 20px" v-if="modifyName == true" @click="pushModifyName">确定</el-button>
          <el-button style="margin-left: 20px" v-if="modifyName == true" @click="cancelModify" type="warning">取消
          </el-button>
        </el-form-item>
        <el-form-item label="绑定学号">
          <span style="color: black;">{{ baseInfo.idCard }}</span>
        </el-form-item>
        <el-form-item label="绑定电话">
          <span v-if="modifyPhone == false" style="color: black">{{ baseInfo.phone }}</span>
          <el-input style="width: 300px" v-if="modifyPhone == true" :placeholder="baseInfo.phone"
            v-model="modifyUserPhone"></el-input>
          <el-link v-if="modifyPhone == false" style="margin-left: 30%;" @click="modifyPhoneTrue">修改</el-link>
          <el-button style="margin-left: 20px" v-if="modifyPhone == true" @click="pushModifyPhone">确定</el-button>
          <el-button style="margin-left: 20px" v-if="modifyPhone == true" @click="cancelModifyPhone" type="warning">
            取消
          </el-button>
        </el-form-item>
        <el-form-item label="收货地址">
          <el-select v-model="defaultAddress" :disabled="addressNo" placeholder="您还没有默认收货地址" style="width: 500px">
            <el-option v-for="item in addressList" :key="item.value" :label="item.value" :value="item.value" />
          </el-select>
          <el-button style="margin-left: 10%; margin-top: 20px" type="primary" @click="addAddress">新增地址</el-button>
        </el-form-item>
      </el-form>
      <el-table v-if="showCode === '3'" :data="historyData" stripe style="width: 100%" max-height="600">
        <el-table-column>
          <template #default="scope">
            <img :src="scope.row.page" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="名称" width="180" />
        <el-table-column prop="single" label="单价" width="180" />
        <el-table-column>
          <template #default="scope">
            <el-link @click="jumpCommod(scope.row)">跳转对应链接</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-if="showCode == '2-1'" :data="buyData" stripe style="width: 100%" max-height="600">
        <el-table-column label="商品名称" prop="name" />
        <el-table-column prop="time" label="购买时间" />
        <el-table-column label="购买数量" prop="num" />
        <el-table-column>
          <template #default="scope">
            <div style="display: flex; flex-direction: row;;">
              <el-button type="primary" :icon="Edit" />
              <el-button type="danger" :icon="Delete" @click="removeHistory(scope.row)" />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-if="showCode == '2-2'" :data="sellData" stripe style="width: 100%" max-height="600">
        <el-table-column label="商品名称" prop="title" />
        <el-table-column prop="addTime" label="上架时间" />
        <el-table-column label="当前状态">
          <template #default="scope">
            <el-tag v-if="scope.row.state == 0" type="info">待审核</el-tag>
            <el-tag v-if="scope.row.state == 1" type="primary">出售中</el-tag>
            <el-tag v-if="scope.row.state == 2" type="warning">审核失败</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-if="showCode == '4-1'" :data="partData" stripe style="width: 100%" max-height="600">
        <el-table-column label="任务" prop="name" />
        <el-table-column prop="idCard" label="发布者id" />
        <el-table-column prop="commission" label="佣金" />
        <el-table-column label="当前状态">
          <template #default="scope">
            <el-link v-if="scope.row.state == 1" @click="finish(scope.row)">点击结算</el-link>
            <el-tag v-if="scope.row.state == 3" type="info">进行中</el-tag>
            <el-tag v-if="scope.row.state == 4" type="warning">待结算</el-tag>
            <el-tag v-if="scope.row.state == 6" type="success">已完成</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-if="showCode == '4-2'" :data="releasePartData" stripe style="width: 100%" max-height="600">
        <el-table-column label="任务" prop="name" />
        <el-table-column prop="commission" label="佣金" />
        <el-table-column label="接取人ID" prop="recipient" />
        <el-table-column label="当前状态">
          <template #default="scope">
            <el-tag v-if="scope.row.state == 0">待接取</el-tag>
            <el-tag v-if="scope.row.state == 1" type="info">进行中</el-tag>
            <el-tag v-if="scope.row.state == 2" type="danger">审核未通过</el-tag>
            <el-link v-if="scope.row.state == 4" @click="settlement(scope.row)">结算</el-link>
            <el-tag v-if="scope.row.state == 6" type="success">已完成</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-if="showCode == '5'" :data="collectData" stripe style="width: 100%" max-height="600">
        <el-table-column label="商品名称" prop="title" />
        <el-table-column prop="stock" label="库存" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="warning" @click="deleteCollect(scope.row)">移出收藏</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <el-dialog v-model="addresDialog" center width="50%" height="30%" label-position="left" label-width="auto">
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">收货地址</h4>
      </div>
    </template>
    <el-form :model="addressForm">
      <el-form-item label="收件人">
        <el-input v-model="addressForm.name" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="addressForm.phone" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="所在省市区" max-wdith="100px">
        <el-cascader v-model="addressForm.city" :options="cityData" clearable />
      </el-form-item>
      <el-form-item label="具体街道">
        <el-input v-model="addressForm.street"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="newAddress">添加</el-button>
        <el-button>返回</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue"
import { useRouter } from 'vue-router'
import { getBaseInfo, modifyUserInfo } from '../api/user.js'
import city from '../../src/assets/city.json'
import { addNewAddress, getAddress } from '../api/address.js'
import { getBuyHistory, deleteBuyHistory } from '../api/buyInfo.js'
import { getSell, getHistoryData } from '../api/commod.js'
import { getPartInfo, getAccept, changePart } from '../api/part.js'
import { ElMessage } from "element-plus";
import { getCollect, removeCollect } from '../api/collect.js'
import { Delete, Edit } from '@element-plus/icons-vue'
import { getUserReport } from '../api/report.js'

const route = useRouter()
const cityData = ref()
const modifyName = ref<boolean>(false)
const modifyUserName = ref<string>('')
const modifyPhone = ref<boolean>(false)
const modifyUserPhone = ref<string>('')
const baseInfo = reactive({
  userName: '',
  idCard: '',
  phone: '',
})
const sellData = ref<any[]>([])
const addressForm = reactive({
  name: '',
  phone: '',
  city: [],
  street: ''
})
const releasePartData = ref<any[]>([])
const collectData = ref<any[]>([])
const buyData = ref<any[]>([])
const partData = ref<any[]>([])
const addresDialog = ref<boolean>(false)
const addressList = ref<any[]>([])
const defaultAddress = ref<string>('')
const showCode = ref<string>('1')
const historyData = ref()
const addressNo = ref<boolean>(false)
const showContent = (index) => {
  showCode.value = index
}

const removeHistory = (row) => {
  const idCard = localStorage.getItem('idCard')
  deleteBuyHistory(row.id).then(res => {
    ElMessage.success('删除成功')
    getBuyHistory(idCard).then(res => {
      buyData.value = res.data
    })
  })
}

const modifyTrue = () => {
  modifyUserName.value = ''
  modifyName.value = true
}

const modifyPhoneTrue = () => {
  modifyUserPhone.value = ''
  modifyPhone.value = true
}

const deleteCollect = (row) => {
  const idCard = localStorage.getItem('idCard')
  const payload = { 'idCard': idCard, 'partId': row.id }
  removeCollect(payload).then(res => {
    ElMessage('删除收藏')
    getCollect(idCard).then(res => {
      collectData.value = res.data
    })
  })
}

const cancelModify = () => {
  modifyName.value = false
}

const cancelModifyPhone = () => {
  modifyPhone.value = false
}

const pushModifyPhone = () => {
  const idCard = localStorage.getItem('idCard')
  const payload = { 'idCard': idCard, 'modify': 'phone', 'modifyValue': parseInt(modifyUserPhone.value) }
  modifyUserInfo(payload).then(res => {
    ElMessage.success('修改成功,请刷新查看')
  })
}

const pushModifyName = () => {
  const idCard = localStorage.getItem('idCard')
  const payload = { 'idCard': idCard, 'modify': 'name', 'modifyValue': modifyUserName.value }
  modifyUserInfo(payload).then(res => {
    ElMessage.success('修改成功,请刷新查看')
  })
}
const jumpCommod = (item) => {
  localStorage.setItem('details', JSON.stringify(item))
  route.push({
    path: '/details',
  })
}
const addAddress = () => {
  addresDialog.value = true
}

const finish = (row) => {
  const idCard = localStorage.getItem('idCard')
  const payload = { 'id': row.id, 'state': 4 }
  changePart(payload).then(res => {
    ElMessage.success('申请成功，等待发布者结算')
    getAccept(idCard).then(res => {
      partData.value = res.data
    })
  })
}

const settlement = (row) => {
  const idCard = localStorage.getItem('idCard')
  const payload = { 'id': row.id, 'state': 6 }
  changePart(payload).then(res => {
    ElMessage.success('结算成功')
    getPartInfo(idCard).then(res => {
      releasePartData.value = res.data
    })
  })
}
const newAddress = () => {
  const id = localStorage.getItem('idCard')
  addressForm['id'] = id
  if (!parseInt(addressForm.phone)) {
    alert('手机号格式不正确')
  } else {
    const req = {
      'id': id,
      'city': addressForm['city'].join('/'),
      'name': addressForm.name,
      'phone': parseInt(addressForm.phone),
      'street': addressForm.street
    }
    addNewAddress(req).then(res => {
      const { code, msg } = res.data
      if (code != 0) {
        alert(msg)
      } else {
        alert('添加成功!')
        location.reload()
      }
    }).catch(err => {
      alert(err)
    })
  }
}
onMounted(async () => {
  const idCard = localStorage.getItem('idCard')
  let data = []
  let historyList = []
  await getBaseInfo(idCard).then(res => {
    baseInfo.userName = res.data.name
    baseInfo.idCard = res.data.idCard
    baseInfo.phone = res.data.phone
    const history = res.data.history.split(',')
    history.sort(function (a, b) {
      return a - b
    })
    historyList = history
  })
  const payload = { 'historyList': historyList }
  await getHistoryData(payload).then(res => {
    data = res.data.msg
  })
  await getAddress(idCard).then(res => {
    let cityList: any[] = []
    if (res.data.length == 0) {
      addressNo.value = true
    } else {
      res.data.forEach((item, _) => {
        if (defaultAddress.value === '') {
          defaultAddress.value = item.city + '-' + String(item.phone) + '-' + item.name
        }
        cityList.push({
          'value': item.city + '-' + String(item.phone) + '-' + item.name,
          'label': item.city + '-' + String(item.phone) + '-' + item.name
        })
      })
    }
    addressList.value = cityList
  })
  historyData.value = data
  const cityJson = city
  let selectCity: any[] = []
  for (let key in cityJson) {
    if (cityJson[key]['市辖区'] == undefined) {
      let children: any[] = []
      let child: any[] = []
      for (let childrenKey in cityJson[key]) {
        cityJson[key][childrenKey].forEach((item, _) => {
          child.push({ 'label': item, 'value': item })
        })
        children.push({ 'label': childrenKey, 'value': childrenKey, 'children': child })
      }
      selectCity.push({ 'label': key, 'value': key, 'children': children })
    } else {
      let data = {}
      let children: any[] = []
      cityJson[key]['市辖区'].forEach((item, _) => {
        children.push({ 'value': item, 'label': item })
      })
      data['value'] = key
      data['label'] = key
      data['children'] = children
      selectCity.push(data)
    }
  }
  cityData.value = selectCity
  await getBuyHistory(idCard).then(res => {
    buyData.value = res.data
  })
  await getSell(idCard).then(res => {
    sellData.value = res.data
  })
  await getPartInfo(idCard).then(res => {
    releasePartData.value = res.data
  })
  await getAccept(idCard).then(res => {
    partData.value = res.data
  })
  await getCollect(idCard).then(res => {
    collectData.value = res.data
  })
  await getUserReport(idCard).then(res => {
    console.log(res.data)
  })
})
</script>
<style scoped>
#userInfo {
  width: 80%;
  margin: 2%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

#infoMenu {
  height: 100%;
  width: 25%;
}

#infoContent {
  height: 100%;
  width: 70%;
}
</style>