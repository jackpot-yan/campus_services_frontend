<template>
  <div id="details">
    <div id="detailsTop">
      <el-link @click="retrunHome">返回首页</el-link>
      <el-button type="primary" @click="showComment">评论</el-button>
      <el-button type="danger" :icon="WarnTriangleFilled" @click="ReportClick">举报</el-button>
    </div>
    <div id="detailsContent">
      <div>
        <img :src="info.page" style="width: 400px; height: 550px; margin-left: 3%;" />
      </div>
      <div style="margin-left: 20px; display: flex; flex-direction: column;">
        <h1 style="font-size: 20px; font-family: 'PingFang SC'; color: black;">{{ info.title }}</h1>
        <div style="color: black;">
          {{ info.introduce }}
        </div>
        <div>
          <span style="color: rgb(255, 79, 0);">¥</span>
          <span style="color: rgb(255, 79, 0); font-family: 'PingFangSC-Regular'; font-size: 38px;">{{
        price
      }}</span>
        </div>
        <div>
          <span style="color: black;">购买数量：</span>
          <el-input-number v-model="num" min="1" size="small" @change="numberChange" />
        </div>
        <div style="margin-top: 4%;">
          <span style="color: black;">配送到：</span>
          <el-select v-model="defaultAddress" :disabled="addressNo" placeholder="您还没有默认收货地址" style="width: 500px">
            <el-option v-for="item in addressList" :key="item.value" :label="item.value" :value="item.value" />
          </el-select>
        </div>
        <div style="margin-top: 4%">
          <el-button
            style="background: linear-gradient(90deg, rgb(255, 119, 0), rgb(255, 73, 0)); border-top-left-radius:34px;border-bottom-left-radius: 34px;color: white;"
            @click="buy">立即购买
          </el-button>
          <el-button
            style="background:linear-gradient(90deg, rgb(255, 203, 0), rgb(255, 148, 2)); border-top-right-radius:34px; border-bottom-right-radius: 34px;color: white;"
            @click="Collect">添加收藏
          </el-button>
        </div>
        <el-table :data="commentData" style="margin-top: 10px" max-height="300" width="700">
          <template #empty>
            暂时没有评论~
          </template>
          <el-table-column>
            <template #default="scope">
              <div>ID: {{ scope.row.idCard }}</div>
              <div>评论时间： {{ scope.row.addTime }}</div>
            </template>
          </el-table-column>
          <el-table-column>
            <template #default="scope">
              <div>{{ scope.row.content }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
  <el-dialog v-model="buyDialog" style="display: flex; justify-content: center;">
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">请确认订单</h4>
      </div>
    </template>
    <el-form center>
      <el-form-item label="商品">{{ info.title }}</el-form-item>
      <el-form-item label="数量">{{ num }}</el-form-item>
      <el-form-item label="总计">{{ price }}</el-form-item>
      <el-form-item label="配送至">{{ defaultAddress }}</el-form-item>
      <el-form-item label="扫码支付">
        <img style="width: 80%; height: 80%" src="../assets/QR.png" />
      </el-form-item>
      <el-form-item>
        <el-button @click="finishBuy">完成</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog v-model="commentDialog">
    <el-input type="textarea" placeholder="输入内容" v-model="comment" />
    <el-button style="margin-top: 30px" type="primary" @click="pushComment">提交</el-button>
  </el-dialog>
  <el-dialog v-model="reportDialog">
    <el-input type="textarea" placeholder="输入内容" v-model="reportComment" />
    <el-button style="margin-top: 30px" type="primary" @click="pushReport">提交</el-button>
  </el-dialog>
</template>
<script lang="ts" setup>
import { onBeforeMount, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAddress } from '../api/address.js'
import { ElMessage } from 'element-plus'
import { addNewBuy } from '../api/buyInfo.js'
import { addCollect } from '../api/collect.js'
import { addComment, getComment } from '../api/comment.js'
import { addReport } from '../api/report.js'
import { WarnTriangleFilled } from '@element-plus/icons-vue'

const route = useRouter()
const info = ref()
const commentData = ref<any[]>([])
const num = ref<number>(1)
const commentDialog = ref<boolean>(false)
const price = ref<string>('')
const defaultAddress = ref<string>('')
const buyDialog = ref<boolean>(false)
const addressNo = ref<boolean>(false)
const reportDialog = ref<boolean>(false)
const comment = ref<string>('')
const reportComment = ref<string>('')
const addressList = ref<any[]>([])

const Collect = () => {
  const idCard = localStorage.getItem('idCard')
  const payload = { partId: info.value.id, 'idCard': idCard }
  addCollect(payload).then(res => {
    ElMessage.success('添加收藏成功')
  })
}

const pushComment = () => {
  const idCard = localStorage.getItem('idCard')
  const payload = { 'idCard': idCard, 'content': comment.value, 'partId': info.value.id }
  addComment(payload).then(res => {
    ElMessage.success('评论成功')
    commentDialog.value = false
  })
}

const pushReport = () => {
  const idCard = localStorage.getItem('idCard')
  const payload = { 'idCard': idCard, 'content': reportComment.value, 'commodId': info.value.id }
  addReport(payload).then(res => {
    ElMessage.success('反馈成功，等待管理员回应')
    reportDialog.value = false
  })
}

const retrunHome = () => {
  route.push({
    path: '/home'
  })
}

const ReportClick = () => {
  reportDialog.value = true
}

const showComment = () => {
  commentDialog.value = true
}
const numberChange = () => {
  if (num.value != 1) {
    const unit = parseFloat(info.value.single)
    const total = unit * num.value
    price.value = String(total)
  }
  if (num.value == 1) {
    price.value = info.value.single
  }
}
const buy = () => {
  buyDialog.value = true
}
const finishBuy = () => {
  const body = {
    'name': info.value.title,
    'idCard': localStorage.getItem('idCard'),
    'num': num.value,
    'total': price.value
  }
  console.log(body)
  addNewBuy(body).then(res => {
    ElMessage({
      message: '购买完成',
      type: 'success',
    })
    buyDialog.value = false
  })
}
onBeforeMount(() => {
  const data = localStorage.getItem('details')
  if (data != null) {
    info.value = JSON.parse(data)
    price.value = info.value.single
  }
})

onMounted(async () => {
  const idCard = localStorage.getItem('idCard')
  await getAddress(idCard).then(res => {
    let cityList = new Array
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
  await getComment(info.value.id).then(res => {
    commentData.value = res.data
  })
  console.log(commentData.value)
})
</script>
<style scoped>
#details {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e9ded8;
}

#detailsTop {
  width: 70%;
  height: 5%;
  display: flex;
  margin-top: 3%;
  flex-direction: row;
  background-color: white;
  justify-content: space-around;
  padding: 1em 0.8em;
  border-radius: 40px;
}

#detailsContent {
  width: 70%;
  height: 80%;
  display: flex;
  margin: 12px 50px;
  flex-direction: row;
  background-color: white;
  justify-content: flex-start;
  padding: 12px 0;
  border-radius: 24px;
}
</style>