<template>
    <div id="home">
        <div id="homeTop">
            <div style="margin-top: 1%;margin-left: 2%">
                <img style="width: 300px;" src="../../public/logo.png" />
            </div>
            <div style="margin-top: 1%;font-size: x-large;">
                欢迎来到校园服务门户!
            </div>
            <div>
                <el-menu style="max-width: 2000px" default-active="0" mode="horizontal" @select="handleSelect"
                    text-color="#black" active-text-color="blue" :ellipsis="false">
                    <el-menu-item index="1" @click="route.push({'path': '/commod'})">我要出售</el-menu-item>
                    <el-menu-item index="2" @click="route.push({'path': '/part'})">兼职相关</el-menu-item>
                    <el-menu-item index="3" @click="jumpPre">个人中心</el-menu-item>
                </el-menu>
            </div>
        </div>
        <div id="homeButtom">
           <commodity v-if="select == 0" />
        </div>
        <el-backtop :right="100" :bottom="100" />
    </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router';
import commodity from '../components/commodity.vue'

const select = ref<number>(0)
const route = useRouter()
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const jumpPre = () => {
    route.push({
        path: '/center'
    })
}
</script>
<style scoped>
#home {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-image: url('../src/assets/background.png');
    /* background-color: #DDD; */
}

#homeTop {
    width: 90%;
    height: 8%;
    display: flex;
    margin-left: 3.5em;
    flex-direction: row;
    /* background-color: white; */
    justify-content: space-between;
    /* box-shadow: 5px 5px 5px #eee; */
    padding: 1em 0.8em;
    border-radius: 5px;
    margin-bottom: 2em;
}

#homeButtom {
    width: 90%;
    height: 80%;
    display: flex;
    margin-left: 3.5em;
    flex-direction: row;
    /* background-color: white; */
    justify-content: space-between;
    /* box-shadow: 5px 5px 5px #eee; */
    padding: 1em 0.8em;
    border-radius: 5px;
}

.el-menu {
    background-color: transparent;
    border-bottom: none;
    text-decoration: none;
    justify-content: flex-end;
}

.el-menu-item {
    background-color: transparent !important;
}

.el-menu-item:hover {
    background-color: transparent !important;
}
</style>
