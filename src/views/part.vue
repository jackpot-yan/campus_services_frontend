<template>
  <div id="part">
    <div id="partTop">
      <el-menu style="display: flex; justify-content: start; width: 50%; height: 95%;" :default-active="select"
               class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1" @click="route.push({'path': '/home'})">返回首页</el-menu-item>
        <el-menu-item index="2">兼职列表</el-menu-item>
        <el-menu-item index="3">发布任务</el-menu-item>
      </el-menu>
    </div>
    <div id="partContent">
      <partList v-if="select === '2'"></partList>
      <releaseList v-if="select === '3'"></releaseList>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
import {useRouter} from "vue-router";
import partList from '../components/partBase.vue'
import releaseList from '../components/releasePart.vue'

const select = ref<string>('2')
const route = useRouter()
const handleSelect = (key: string, keyPath: string[]) => {
  select.value = key
}
</script>
<style scoped>
#part {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e9ded8;
}

#partTop {
  width: 70%;
  height: 5%;
  margin-top: 3%;
  flex-direction: row;
  background-color: white;
  padding: 1em 0.8em;
  border-radius: 40px;
}

#partContent {
  width: 70%;
  height: 80%;
  display: flex;
  margin: 12px 50px;
  flex-direction: row;
  background-color: white;
  justify-content: center;
  padding: 12px 0;
  border-radius: 24px;
}
</style>