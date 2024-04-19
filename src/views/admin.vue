<template>
  <div id="admin">
    <div id="adminContent">
      <el-descriptions style="margin-left: 20px" title="管理员页面" :column="3" border>
        <el-descriptions-item label="网站注册人数" label-align="right" align="center" label-class-name="my-label"
          class-name="my-content" width="150px">kooriookami
        </el-descriptions-item>
        <el-descriptions-item label="待审核商品总数" label-align="right" align="center">18100000000
        </el-descriptions-item>
        <el-descriptions-item label="待审核兼职总数" label-align="right" align="center">Suzhou
        </el-descriptions-item>
      </el-descriptions>
      <div style="margin-top: 10px">
        <el-menu style="display: flex; justify-content: start; width: 100%; height: 95%;" default-active="6"
          class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="6">数据统计</el-menu-item>
          <el-menu-item index="1">待审核商品</el-menu-item>
          <el-menu-item index="2">待审核兼职</el-menu-item>
          <el-menu-item index="3">已审核商品</el-menu-item>
          <el-menu-item index="4">已审核兼职</el-menu-item>
          <el-menu-item index="5">商品反馈和举报</el-menu-item>
        </el-menu>
      </div>
      <el-table v-if="showCode == '1'" :data="notSellData" stripe style="width: 100%" max-height="600">
        <el-table-column label="商品名称" prop="title" />
        <el-table-column prop="addTime" label="上架时间" />
        <el-table-column label="上架人ID" prop="idCard" />
        <el-table-column label="操作">
          <template #default="scope">
            <div v-if="scope.row.state == 0">
              <el-button @click="successSell(scope.row.id)">通过</el-button>
              <el-button type="danger" @click="errorSell(scope.row.id)">退回</el-button>
            </div>
            <div v-if="scope.row.state == 1">
              <el-tag type="success">已通过</el-tag>
            </div>
            <div v-if="scope.row.state == 2">
              <el-tag type="warning">已退回</el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-if="showCode == '2'" :data="notPartData" stripe style="width: 100%" max-height="600">
        <el-table-column label="兼职标题" prop="name" />
        <el-table-column label="佣金" prop="commission" />
        <el-table-column label="工作地点" prop="local" />
        <el-table-column label="上架人ID" prop="idCard" />
        <el-table-column label="操作">
          <template #default="scope">
            <div v-if="scope.row.state == 0">
              <el-button @click="successPart(scope.row.id)">通过</el-button>
              <el-button type="danger" @click="errorPart(scope.row.id)">退回</el-button>
            </div>
            <div v-if="scope.row.state == 1">
              <el-tag type="success">已通过</el-tag>
            </div>
            <div v-if="scope.row.state == 2">
              <el-tag type="warning">已退回</el-tag>
            </div>
            <div v-if="scope.row.state == 6">
              <el-tag>兼职已完成</el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-if="showCode == '3'" :data="sellData" stripe style="width: 100%" max-height="600">
        <el-table-column label="商品名称" prop="title" />
        <el-table-column prop="addTime" label="上架时间" />
        <el-table-column label="上架人ID" prop="idCard" />
        <el-table-column label="操作">
          <template #default="scope">
            <div v-if="scope.row.state == 0">
              <el-button @click="successSell(scope.row.id)">通过</el-button>
              <el-button type="danger" @click="errorSell(scope.row.id)">退回</el-button>
            </div>
            <div v-if="scope.row.state == 1">
              <el-tag type="success">已通过</el-tag>
            </div>
            <div v-if="scope.row.state == 2">
              <el-tag type="warning">已退回</el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-if="showCode == '4'" :data="partData" stripe style="width: 100%" max-height="600">
        <el-table-column label="兼职标题" prop="name" />
        <el-table-column label="佣金" prop="commission" />
        <el-table-column label="工作地点" prop="local" />
        <el-table-column label="上架人ID" prop="idCard" />
        <el-table-column label="操作">
          <template #default="scope">
            <div v-if="scope.row.state == 0">
              <el-button @click="successPart(scope.row.id)">通过</el-button>
              <el-button type="danger" @click="errorPart(scope.row.id)">退回</el-button>
            </div>
            <div v-if="scope.row.state == 1">
              <el-tag type="success">已通过</el-tag>
            </div>
            <div v-if="scope.row.state == 2">
              <el-tag type="warning">已退回</el-tag>
            </div>
            <div v-if="scope.row.state == 6">
              <el-tag>兼职已完成</el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-if="showCode == '5'" :data="reportData" stripe style="width: 100%" max-height="600">
        <el-table-column label="商品编号" prop="commodId" />
        <el-table-column label="提交人id" prop="idCard" />
        <el-table-column label="举报内容" prop="content" />
        <el-table-column label="操作">
          <template #default="scope">
            <div v-if="scope.row.reply == ''">
              <el-button @click="replyReport(scope.row)">点击回复</el-button>
            </div>
            <div v-else>
              <el-tag>已回复</el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="showCode == '6'" style="display: flex; flex-direction: row;">
        <div id="college" style="width: 500px; height: 500px; margin-right: 100px"></div>
        <div id="user" style="width: 500px; height: 500px;"></div>
      </div>
    </div>
    <el-dialog v-model="replyDialog">
      <el-input type="textarea" placeholder="输入内容" v-model="reply" />
      <el-button style="margin-top: 30px" type="primary" @click="pushReport">提交</el-button>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive, onBeforeMount } from 'vue'
import { getAllSell, changeSell } from '../api/commod.js'
import { getPart, changePart } from '../api/part.js'
import { getReport, closeReport } from '../api/report.js'
import { ElMessage } from 'element-plus';
import * as echarts from 'echarts';
import { getAddressEcharts } from '../api/address.js'
import { getUserEachrts } from '../api/user.js'



const showCode = ref<string>('6')
const sellData = ref<any[]>([])
const partData = ref<any[]>([])
const notSellData = ref<any[]>([])
const notPartData = ref<any[]>([])
const replyId = ref(0)
const reply = ref<string>('')
const reportData = ref<any[]>([])
const replyDialog = ref<boolean>(false)
const collegeChart = ref()

const collageOption = reactive({
  title: {
    text: '地址分布',
    subtext: '用户所在地址',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
});
const commodChart = ref()
const option = reactive({
  title: {
    text: '商品浏览统计',
    left: 'center'
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [],
      type: 'line',
      areaStyle: {}
    }
  ]
});

const handleSelect = (key) => {
  if (key == '6') {
    window.location.reload()
  } else {
    showCode.value = key
  }
}

const successSell = (row) => {
  let payload = { 'id': row, 'state': 1 }
  changeSell(payload).then(async res => {
    await getAllSell().then(res => {
      sellData.value = res.data
    })
  })
}

const errorSell = (row) => {
  let payload = { 'id': row, 'state': 2 }
  changeSell(payload).then(async res => {
    await getAllSell().then(res => {
      sellData.value = res.data
    })
  })
}

const successPart = (row) => {
  let payload = { 'id': row, 'state': 1 }
  changePart(payload).then(async res => {
    await getAllSell().then(res => {
      sellData.value = res.data
    })
  })
}

const errorPart = (row) => {
  let payload = { 'id': row, 'state': 2 }
  changePart(payload).then(async res => {
    await getAllSell().then(res => {
      sellData.value = res.data
    })
  })
}

const replyReport = (scope) => {
  replyId.value = scope.id
  replyDialog.value = true
}

const pushReport = () => {
  const payload = { 'id': replyId.value, 'reply': reply.value }
  closeReport(payload).then(res => {
    ElMessage.success('回复成功')
    replyDialog.value = false
  })
}

onMounted(async () => {
  await getAllSell().then(res => {
    res.data.forEach((item, _) => {
      if (item.state == 1) {
        sellData.value.push(item)
      } else {
        notSellData.value.push(item)
      }
    })
  })
  await getPart(5).then(res => {
    res.data.forEach((item, _) => {
      if (item.state == 0) {
        notPartData.value.push(item)
      } else {
        partData.value.push(item)
      }
    })
  })
  await getReport().then(res => {
    reportData.value = res.data
  })
  await getAddressEcharts().then(res => {
    collageOption.series[0].data = res.data
  })
  await getUserEachrts().then(res => {
    option.xAxis.data = res.data.x
    option.series[0].data = res.data.y
  })
  collegeChart.value = echarts.init(document.getElementById('college'));
  collageOption && collegeChart.value.setOption(collageOption);
  commodChart.value = echarts.init(document.getElementById('user'))
  option && commodChart.value.setOption(option)
})
</script>
<style scoped>
#admin {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e9ded8;
}

#adminContent {
  width: 70%;
  height: 90%;
  display: flex;
  margin: 12px 50px;
  flex-direction: column;
  background-color: white;
  justify-content: flex-start;
  padding: 12px 0;
  border-radius: 24px;
}
</style>