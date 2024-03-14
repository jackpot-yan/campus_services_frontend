<template>
    <div id="home">
        <div id="homeTop">
            <div style="margin-top: 1%;margin-left: 2%">
                <img style="width: 300px;" src="../../public/logo.png" />
            </div>
            <div style="margin-top: 1%;font-size: x-large;">
                欢迎来到校园服务门户!
            </div>
            <div style="margin-top: 1%;">
                <el-input style="width: 400px;" :prefix-icon="Search"></el-input>
            </div>
            <div>
                <el-menu style="max-width: 2000px" :default-active="0" mode="horizontal" @select="handleSelect"
                    text-color="#black" active-text-color="blue" :ellipsis="false">
                    <el-menu-item index="1">我要出售</el-menu-item>
                    <el-menu-item index="2">兼职相关</el-menu-item>
                    <el-menu-item index="3">个人中心</el-menu-item>
                </el-menu>
            </div>
        </div>
        <div id="homeButtom">
            <router-view v-slot="{ Component }">
                <transition name="scale" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
        <el-backtop :right="100" :bottom="100" />
    </div>
</template>
<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'

const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>
<style scoped>
#home {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* background-color: #DDD; */
}

#homeTop {
    width: 90%;
    height: 8%;
    display: flex;
    margin-left: 3.5em;
    flex-direction: row;
    background-color: white;
    justify-content: space-between;
    box-shadow: 5px 5px 5px #eee;
    padding: 1em 0.8em;
    border-radius: 5px;
    margin-bottom: 2em;
}

#homeButtom {
    width: 90%;
    height: 100%;
    display: flex;
    margin-left: 3.5em;
    flex-direction: row;
    background-color: white;
    justify-content: space-between;
    box-shadow: 5px 5px 5px #eee;
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
