<template>
    <div id="details">
        <div id="detailsTop">
            <el-link @click="retrunHome">返回首页</el-link>
            <el-button>咨询客服</el-button>
        </div>
        <div id="detailsContent">
            <div>
                <img :src="info.png" style="width: 400px; height: 550px; margin-left: 3%;" />
            </div>
            <div style="margin-left: 20px; display: flex; flex-direction: column;">
                <h1 style="font-size: 20px; font-family: 'PingFang SC';">{{ info.title }}</h1>
                <div>
                    {{ info.describe }}
                </div>
                <div>
                    <span style="color: rgb(255, 79, 0);">¥</span>
                    <span style="color: rgb(255, 79, 0); font-family: 'PingFangSC-Regular'; font-size: 38px;">{{ info.price
                    }}</span>
                </div>
                <div style="margin-top: 100px;">
                    <el-button
                        style="background: linear-gradient(90deg, rgb(255, 119, 0), rgb(255, 73, 0)); border-top-left-radius:34px;border-bottom-left-radius: 34px;color: white;">立即购买</el-button>
                    <el-button style="background:linear-gradient(90deg, rgb(255, 203, 0), rgb(255, 148, 2)); border-top-right-radius:34px; border-bottom-right-radius: 34px;color: white;">添加购物车</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
const route = useRouter()
const info = ref()
const retrunHome = () => {
    route.push({
        path: '/home'
    })
}
onBeforeMount(() => {
    const data = localStorage.getItem('details')
    if (data != null) {
        info.value = JSON.parse(data)
    }
    console.log(info.value)
})
</script>
<style scoped>
#details {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #e9ded8;
}

#detailsTop {
    width: 70%;
    height: 5%;
    display: flex;
    margin-top: 3%;
    flex-direction: row;
    background-color: white;
    justify-content: space-around;
    padding: 1em 0.8em;
    border-radius: 40px;
}

#detailsContent {
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