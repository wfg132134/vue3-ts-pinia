<template>
  <div>
    <h2>main {{ counterStore.count }}</h2>
    <button @click="handleExitClick">退出登录</button>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants';
import router from '@/router';
import useCounterStore from '@/store/counter'
const counterStore = useCounterStore()

function handleExitClick() {
  // 1.删除token
  localStorage.removeItem(LOGIN_TOKEN)
  // 2.跳转到登录页
  router.push('./login')
}


</script>

<style lang="less" scoped></style>
