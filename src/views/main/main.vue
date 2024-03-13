<template>
  <div class="main">
    <el-container class="container">
      <el-aside width="350px">
        <main-menu></main-menu>
      </el-aside>
      <el-container>
        <el-header>
          <main-header></main-header>
        </el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script setup lang="ts">
import  MainHeader from '@/components/layout/MainHeader.vue';
import  MainMenu from '@/components/layout/MainMenu.vue';
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

<style lang="less" scoped>
.main {
  height: 100%;

  .container {
    height: 100%;
    >.el-aside {
      background-color: #d3dce6;
      color: #333;
      text-align: center;
    }

    .el-header { 
      background-color: rgb(120, 225, 205);
      text-align: center;
      line-height: 50px;
    }

    .el-main { 
      background-color: rgb(80, 139, 211);
      text-align: center;
      line-height: 160px;
    }
  }
}
</style>
