<template>
    <div id="userInfo">
        <div id="infoMenu">
            <el-menu default-active="1" class="el-menu-vertical-demo" @select="showContent">
                <el-menu-item index="1">
                    <span>个人资料</span>
                </el-menu-item>
                <el-sub-menu index="2">
                    <template #title>
                        订单相关
                    </template>
                    <el-menu-item index="2-1">已购订单</el-menu-item>
                    <el-menu-item index="2-2">正在出售</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="3">
                    <span>历史浏览</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div id="infoContent">
            <el-form v-if="showCode === '1'" :model="baseInfo">
                <el-form-item label="昵称:">
                    <span style="color: black;">{{ baseInfo.userName }}</span>
                    <!-- <span>{{ baseInfo.userName }}</span> -->
                    <el-link style="margin-left: 30%;">修改</el-link>
                </el-form-item>
                <el-form-item label="绑定学号">
                    <span style="color: black;">{{ baseInfo.idCard }}</span>
                    <el-link style="margin-left: 30%;">修改</el-link>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="baseInfo.fix">
                        <el-radio value="1" size="large">男</el-radio>
                        <el-radio value="2" size="large">女</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <el-table v-if="showCode === '3'" :data="historyData" stripe style="width: 100%">
                <el-table-column prop="title" label="名称" width="180" />
                <el-table-column prop="price" label="单价" width="180" />
                <el-table-column prop="sales" label="数量" />
                <el-table-column>
                    <el-link>跳转对应链接</el-link>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue"
import { getBaseInfo } from '../api/user.js'
import jsonData from '../../src/assets/data.json'

const baseInfo = reactive({
    userName: '',
    idCard: '',
    fix: '1',
})
const showCode = ref<string>('')
const historyData = ref()
const showContent = (index) => {
    showCode.value = index
}
onMounted(async () => {
    const idCard = localStorage.getItem('id')
    var data = new Array
    await getBaseInfo(idCard).then(res => {
        baseInfo.userName = res.data.name
        baseInfo.idCard = res.data.idCard
        const history = res.data.history.split(',')
        history.sort(function (a, b) { return a - b })
        history.forEach((items, _) => {
            jsonData.data.forEach((item, _) => {
                if (String(item.comm) === String(items)) {
                    data.push(item)
                }
            })
        })
    })
    historyData.value = data
})
</script>
<style scoped>
#userInfo {
    width: 100%;
    margin: 2%;
    height: 100%;
    display: flex;
    flex-direction: row;
}

#infoMenu {
    height: 100%;
    width: 25%;
}

#infoContent {
    height: 100%;
    width: 70%;
}
</style>