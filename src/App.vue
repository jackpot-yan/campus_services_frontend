<template>
  <div id="main">
    <router-view></router-view>
    <!-- <router-view v-slot="{ Component }">
      <transition name="scale" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view> -->
  </div>
</template>
<script lang="ts" setup>
import {createAdmin} from './api/user.js'
import {onMounted} from "vue";

onMounted(() => {
  createAdmin()
})
</script>


<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  max-width: 100%;
  max-height: 100%;
}

#main {
  width: 100%;
  height: 100%;
}

#middle {
  width: 100%;
  height: 40%;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#bottom {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
}

#name {
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-menu {
  width: 70%;
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

el-image {
  max-height: 100%;
}

img {
  width: 100%;
  height: 100%;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}


.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>