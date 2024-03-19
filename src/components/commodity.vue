<template>
  <div id="commodity">
    <div id="search">
      <div><el-link @clik="timeSort">最新上架</el-link></div>
      <div><el-link @click="saleSort">价格排序</el-link></div>
    </div>
    <el-scrollbar>
      <div id="content">
        <div v-for="(index, items) in data" style="max-width: 18%; margin: 1%;">
          <el-card shadow="hover" @click="details(index)">
            <img :src="index.png" style="width: 100%;height: 60%;" />
            <p style="text-overflow: ellipsis; color: #666; white-space: nowrap; overflow: hidden;">{{ index.title }}</p>
            <p style="color: #f50;">¥ {{ index.price }}</p>
            <p>销量: <span style="color: #f50;">{{ index.sales }}</span></p>
            <p>上架时间: <span style="color: #f50;">{{ index.add_time }}</span></p>
          </el-card>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import jsonData from '../../src/assets/data.json'
import { useRouter } from 'vue-router'
import { addHistroy } from '../api/user.js'

const data = ref()
const route = useRouter()

const timeSort = () => {
  data.value.sort((a, b) => {
    return Date.parse(a.add_time) < Date.parse(b.add_time)
  })
}

const saleSort = () => {
  data.value.sort((a, b) => {
    return parseFloat(a.price) < parseFloat(b.price) ? -1 : 1
  })
}

const details = (index) => {
  if (!localStorage.getItem('history')) {
    localStorage.setItem('history', String(index.comm))
  } else {
    const history = localStorage.getItem('history')
    localStorage.setItem('history', history + ',' + String(index.comm))
  }
  const comm = localStorage.getItem('history')
  localStorage.setItem('details', JSON.stringify(index))
  addHistroy({'id': localStorage.getItem('id'), 'comm': comm})
  route.push({
    path: '/details',
  })
}
onMounted(() => {
  data.value = jsonData.data
})
</script>
<style scoped>
#commodity {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#search {
  width: 90%;
  height: 5%;
  display: flex;
  margin-left: 3.5em;
  flex-direction: row;
  background-color: white;
  justify-content: space-around;
  padding: 1em 0.8em;
  border-radius: 5px;
}

#content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: auto;
  margin-top: 3%;
}
</style>