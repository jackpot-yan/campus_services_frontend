<template>
  <div id="commod">
    <div id="commodTop">
      <el-menu style="display: flex; justify-content: start; width: 50%; height: 95%;" :default-active="select" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1" @click="route.push({'path': '/home'})">返回首页</el-menu-item>
        <el-menu-item index="2">上架商品</el-menu-item>
      </el-menu>
    </div>
    <div id="commodContent">
      <commodBase  v-if="select === '2'"></commodBase>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import {useRouter} from "vue-router";
import commodBase from '../components/commodBase.vue'

const select = ref<string>('2')
const route = useRouter()
const handleSelect = (key: string, keyPath: string[]) => {
  select.value = key
}
</script>
<style scoped>
#commod {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e9ded8;
}

#commodTop {
  width: 70%;
  height: 5%;
  margin-top: 3%;
  flex-direction: row;
  background-color: white;
  padding: 1em 0.8em;
  border-radius: 40px;
}

#commodContent {
  width: 70%;
  height: 70%;
  display: flex;
  margin: 12px 50px;
  flex-direction: row;
  background-color: white;
  justify-content: flex-start;
  padding: 12px 0;
  border-radius: 24px;
}
</style>