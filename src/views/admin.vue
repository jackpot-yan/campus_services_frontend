<template>
  <div id="admin">
    <div id="adminContent">
      <el-descriptions style="margin-left: 20px" title="管理员页面" :column="3" border>
        <el-descriptions-item
            label="网站注册人数"
            label-align="right"
            align="center"
            label-class-name="my-label"
            class-name="my-content"
            width="150px"
        >kooriookami
        </el-descriptions-item
        >
        <el-descriptions-item label="待审核商品总数" label-align="right" align="center"
        >18100000000
        </el-descriptions-item
        >
        <el-descriptions-item label="待审核兼职总数" label-align="right" align="center"
        >Suzhou
        </el-descriptions-item
        >
      </el-descriptions>
      <div style="margin-top: 10px;margin-left: 10px">
        <el-menu style="display: flex; justify-content: start; width: 50%; height: 95%;" default-active="1"
                 class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">待审核商品</el-menu-item>
          <el-menu-item index="2">待审核兼职</el-menu-item>
        </el-menu>
      </div>
      <el-table v-if="showCode == '1'" :data="sellData" stripe style="width: 100%" max-height="600">
        <el-table-column label="商品名称" prop="title"/>
        <el-table-column prop="addTime" label="上架时间"/>
        <el-table-column label="上架人ID" prop="idCard"/>
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
      <el-table v-if="showCode == '2'" :data="partData" stripe style="width: 100%" max-height="600">
        <el-table-column label="兼职标题" prop="name"/>
        <el-table-column label="佣金" prop="commission"/>
        <el-table-column label="工作地点" prop="local"/>
        <el-table-column label="上架人ID" prop="idCard"/>
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
    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref, onMounted} from 'vue'
import {getAllSell, changeSell} from '../api/commod.js'
import {getPart, changePart} from '../api/part.js'

const showCode = ref<string>('1')
const sellData = ref<any[]>([])
const partData = ref<any[]>([])

const handleSelect = (key) => {
  showCode.value = key
}

const successSell = (row) => {
  let payload = {'id': row, 'state': 1}
  changeSell(payload).then(async res => {
    await getAllSell().then(res => {
      sellData.value = res.data
    })
  })
}

const errorSell = (row) => {
  let payload = {'id': row, 'state': 2}
  changeSell(payload).then(async res => {
    await getAllSell().then(res => {
      sellData.value = res.data
    })
  })
}

const successPart = (row) => {
  let payload = {'id': row, 'state': 1}
  changePart(payload).then(async res => {
    await getAllSell().then(res => {
      sellData.value = res.data
    })
  })
}

const errorPart = (row) => {
  let payload = {'id': row, 'state': 2}
  changePart(payload).then(async res => {
    await getAllSell().then(res => {
      sellData.value = res.data
    })
  })
}

onMounted(() => {
  getAllSell().then(res => {
    sellData.value = res.data
  })
  getPart(5).then(res => {
    partData.value = res.data
  })
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