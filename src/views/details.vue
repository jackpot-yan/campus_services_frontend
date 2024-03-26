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
                <h1 style="font-size: 20px; font-family: 'PingFang SC'; color: black;">{{ info.title }}</h1>
                <div style="color: black;">
                    {{ info.describe }}
                </div>
                <div>
                    <span style="color: rgb(255, 79, 0);">¥</span>
                    <span style="color: rgb(255, 79, 0); font-family: 'PingFangSC-Regular'; font-size: 38px;">{{
                price
            }}</span>
                </div>
                <div>
                    <span style="color: black;">购买数量：</span>
                    <el-input-number v-model="num" min="1" size="small" @change="numberChange" />
                </div>
                <div style="margin-top: 4%;">
                    <span style="color: black;">配送到：</span>
                    <el-select v-model="defaultAddress" :disabled="addressNo" placeholder="您还没有默认收货地址"
                        style="width: 500px">
                        <el-option v-for="item in addressList" :key="item.value" :label="item.value"
                            :value="item.value" />
                    </el-select>
                </div>
                <div style="margin-top: 4%">
                    <el-button
                        style="background: linear-gradient(90deg, rgb(255, 119, 0), rgb(255, 73, 0)); border-top-left-radius:34px;border-bottom-left-radius: 34px;color: white;"
                        @click="buy">立即购买</el-button>
                    <el-button
                        style="background:linear-gradient(90deg, rgb(255, 203, 0), rgb(255, 148, 2)); border-top-right-radius:34px; border-bottom-right-radius: 34px;color: white;">添加购物车</el-button>
                </div>
            </div>
        </div>
    </div>
    <el-dialog v-model="buyDialog" style="display: flex; justify-content: center;">
        <template #header="{ titleId, titleClass }">
            <div class="my-header">
                <h4 :id="titleId" :class="titleClass">请确认订单</h4>
            </div>
        </template>
        <el-form center>
            <el-form-item label="商品">{{ info.title }}</el-form-item>
            <el-form-item label="数量">{{ num }}</el-form-item>
            <el-form-item label="总计">{{ price }}</el-form-item>
            <el-form-item label="配送至">{{ defaultAddress }}</el-form-item>
            <el-form-item label="扫码支付">
                <img style="width: 80%; height: 80%" src="../assets/QR.png" />
            </el-form-item>
            <el-form-item>
                <el-button @click="finishBuy">完成</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script lang="ts" setup>
import { onBeforeMount, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAddress } from '../api/address.js'
import { ElMessage } from 'element-plus'
const route = useRouter()
const info = ref()
const num = ref<number>(1)
const price = ref<string>('')
const defaultAddress = ref<string>('')
const buyDialog = ref<boolean>(false)
const addressNo = ref<boolean>(false)
const addressList = ref<any[]>([])
const retrunHome = () => {
    route.push({
        path: '/home'
    })
}
const numberChange = () => {
    if (num.value != 1) {
        const unit = parseFloat(info.value.price)
        const total = unit * num.value
        price.value = String(total)
    }
}
const buy = () => {
    buyDialog.value = true
}
const finishBuy = () => {
    buyDialog.value = false
    ElMessage({
    message: '购买完成',
    type: 'success',
  })
}
onBeforeMount(() => {
    const data = localStorage.getItem('details')
    if (data != null) {
        info.value = JSON.parse(data)
        price.value = info.value.price
    }
})

onMounted(async () => {
    const idCard = localStorage.getItem('id')
    await getAddress(idCard).then(res => {
        let cityList = new Array
        if (res.data.length == 0) {
            addressNo.value = true
        } else {
            res.data.forEach((item, _) => {
                if (defaultAddress.value === '') {
                    defaultAddress.value = item.city + '-' + String(item.phone) + '-' + item.name
                }
                cityList.push({ 'value': item.city + '-' + String(item.phone) + '-' + item.name, 'label': item.city + '-' + String(item.phone) + '-' + item.name })
            })
        }
        console.log(cityList)
        addressList.value = cityList
    })
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