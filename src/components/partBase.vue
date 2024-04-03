<template>
  <div id="partBase">
    <el-table :data="partData" style="width: 100%;height: 100%">
      <el-table-column fixed>
        <template #default="scope">
          <h3>{{ scope.row.name }}</h3>
          <p>{{ scope.row.require }}</p>
          <p>{{ scope.row.commission }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="introduce"/>
      <el-table-column fixed="right" width="120">
        <template #default="scope">
          <el-button
              link
              v-if="scope.row.recipient === 0"
              type="primary"
              size="small"
              @click="acceptClick(scope.row)"
          >
            接取任务
          </el-button>
          <el-tag v-else type="success">已被接取</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import {ref, onMounted} from 'vue'
import {getPart, accept} from '../api/part.js'
import {ElMessage} from "element-plus";

const now = new Date()
const partData = ref<any[]>([])

onMounted(() => {
  getPart(1).then(res => {
    partData.value = res.data
  })
})


const acceptClick = (row) => {
  const idCard = localStorage.getItem('idCard')
  const payload = {'id': row.id, 'idCard': idCard}
  accept(payload).then(res => {
    ElMessage.success('接取成功')
    getPart(1).then(res => {
      partData.value = res.data
    })
  })
}

</script>
<style scoped>
#partBase {
  width: 90%;
  height: 100%
}
</style>
