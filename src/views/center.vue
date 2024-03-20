<template>
    <div id="center">
        <div id="centerTop">
            <el-menu style="display: flex; justify-content: start; width: 50%; height: 95%;" :default-active="select" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1" @click="retHome">返回首页</el-menu-item>
                <el-menu-item index="2">个人信息</el-menu-item>
            </el-menu>
        </div>
        <div id="bommom">
            <useBase v-if="select === '2'"></useBase>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import useBase from '../components/useBase.vue'
import { useRouter } from 'vue-router';

const tabsName = ref<string>('first')
const select = ref<string>('2')
const route = useRouter()
const handleSelect = (key: string, keyPath: string[]) => {
    select.value = key
}
const retHome = () => {
    route.push({
        path: '/home'
    })
}
</script>
<style scoped>
#center {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #e9ded8;
}

#centerTop {
    width: 70%;
    height: 5%;
    margin-top: 3%;
    flex-direction: row;
    background-color: white;
    padding: 1em 0.8em;
    border-radius: 40px;
}

#bommom {
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