<template>
  <div>
    <h2>main {{ counterStore.count }}</h2>
    <button @click="incrementCounter">修改count</button>
    <button @click="incrementCounter">修改count</button>
    <button @click="incrementCounter">修改count</button>
  </div>
</template>

<script setup lang="ts">
import useCounterStore from '@/store/counter'
import { onMounted } from 'vue';
const counterStore = useCounterStore()

function incrementCounter() {
  counterStore.increment(200)
}


</script>

<style lang="less" scoped></style>
