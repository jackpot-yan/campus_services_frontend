<template>
  <div id="commodity">
    <div id="search">
      <div><el-link>最新上架</el-link></div>
      <div><el-link>价格排序</el-link></div>
    </div>
    <div id="content">
      <div v-for="(index, items) in data" style="max-width: 18%; margin: 1%;">
        <el-card shadow="hover" @click="details">
          <img :src="index.png" style="width: 100%;height: 60%;" />
          <p style="text-overflow: ellipsis; color: #666; white-space: nowrap; overflow: hidden;">{{ index.title }}</p>
          <p style="color: #f50;">¥{{ index.price }}</p>
          <p>销量: <p style="color: #f50;">{{ index.sales }}</p></p>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import jsonData from '../../src/assets/data.json'

const data = ref()

const details = () => {
  console.log('跳转详情')
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
}
</style>