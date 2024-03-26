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
                </el-form-item>
                <el-form-item label="绑定电话">
                    <span style="color: black">{{ baseInfo.phone }}</span>
                    <el-link style="margin-left: 30%;">修改</el-link>
                </el-form-item>
                <el-form-item label="收货地址">
                    <el-select v-model="defaultAddress" :disabled="addressNo" placeholder="您还没有默认收货地址" style="width: 500px">
                        <el-option v-for="item in addressList" :key="item.value" :label="item.value"
                            :value="item.value" />
                    </el-select>
                    <el-button style="margin-left: 10%;" type="primary" @click="addAddress">新增地址</el-button>
                </el-form-item>
            </el-form>
            <el-table v-if="showCode === '3'" :data="historyData" stripe style="width: 100%" max-height="600">
                <el-table-column>
                    <template #default="scope">
                        <img :src="scope.row.png" />
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="名称" width="180" />
                <el-table-column prop="price" label="单价" width="180" />
                <el-table-column>
                    <template #default="scope">
                        <el-link @click="jumpCommod(scope.row)">跳转对应链接</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
    <el-dialog v-model="addresDialog" center width="50%" height="30%" label-position="left" label-width="auto">
        <template #header="{ titleId, titleClass }">
            <div class="my-header">
                <h4 :id="titleId" :class="titleClass">收货地址</h4>
            </div>
        </template>
        <el-form :model="addressForm">
            <el-form-item label="收件人">
                <el-input v-model="addressForm.name" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input v-model="addressForm.phone" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="所在省市区" max-wdith="100px">
                <el-cascader v-model="addressForm.city" :options="cityData" clearable />
            </el-form-item>
            <el-form-item label="具体街道">
                <el-input v-model="addressForm.street"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="newAddress">添加</el-button>
                <el-button>返回</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue"
import { useRouter } from 'vue-router'
import { getBaseInfo } from '../api/user.js'
import jsonData from '../../src/assets/data.json'
import city from '../../src/assets/city.json'
import { addNewAddress, getAddress } from '../api/address.js'

const route = useRouter()
const cityData = ref()
const baseInfo = reactive({
    userName: '',
    idCard: '',
    phone: '',
})
const addressForm = reactive({
    name: '',
    phone: '',
    city: [],
    street: ''
})
const addresDialog = ref<boolean>(false)
const addressList = ref<any[]>([])
const defaultAddress = ref<string>('')
const showCode = ref<string>('1')
const historyData = ref()
const addressNo = ref<boolean>(false)
const showContent = (index) => {
    showCode.value = index
}
const jumpCommod = (item) => {
    localStorage.setItem('details', JSON.stringify(item))
    route.push({
        path: '/details',
    })
}
const addAddress = () => {
    addresDialog.value = true
}
const newAddress = () => {
    const id = localStorage.getItem('id')
    addressForm['id'] = id
    if (!parseInt(addressForm.phone)) {
        alert('手机号格式不正确')
    } else {
        const req = { 'id': id, 'city': addressForm['city'].join('/'), 'name': addressForm.name, 'phone': parseInt(addressForm.phone), 'street': addressForm.street }
        addNewAddress(req).then(res => {
            const { code, msg } = res.data
            if (code != 0) {
                alert(msg)
            } else {
                alert('添加成功!')
                location.reload()
            }
        }).catch(err => {
            alert(err)
        })
    }
}
onMounted(async () => {
    const idCard = localStorage.getItem('id')
    var data = new Array
    await getBaseInfo(idCard).then(res => {
        baseInfo.userName = res.data.name
        baseInfo.idCard = res.data.idCard
        baseInfo.phone = res.data.phone
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
    historyData.value = data
    const cityJson = city
    let selectCity = new Array
    for (let key in cityJson) {
        if (cityJson[key]['市辖区'] == undefined) {
            let children = new Array
            let child = new Array
            for (let childrenKey in cityJson[key]) {
                cityJson[key][childrenKey].forEach((item, _) => {
                    child.push({ 'label': item, 'value': item })
                })
                children.push({ 'label': childrenKey, 'value': childrenKey, 'children': child })
            }
            selectCity.push({ 'label': key, 'value': key, 'children': children })
        } else {
            let data = {}
            let children = new Array
            cityJson[key]['市辖区'].forEach((item, _) => {
                children.push({ 'value': item, 'label': item })
            })
            data['value'] = key
            data['label'] = key
            data['children'] = children
            selectCity.push(data)
        }
    }
    cityData.value = selectCity
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