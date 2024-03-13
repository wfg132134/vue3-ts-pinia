<template>
  <div>
    <div class="logo">商品管理系统</div>
    <div class="menu">
      <el-menu default-active="2" class="el-menu-vertical-demo">
        <template v-for="item in userMenu">
          <div>
            <el-sub-menu :index="item.id + ''">
              <template #title>
                <el-icon>
                  <location />
                </el-icon>
                <span>{{ item.name }}</span>
              </template>
              <template v-for="itemSub in item.children">
                <el-menu-item :index="itemSub.id + ''" @click="handleItemChange(itemSub)">{{ itemSub.name }}</el-menu-item>
              </template>
            </el-sub-menu>
          </div>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

import router from '@/router';

import useLoginStore from '@/store/login'
const loginStore = useLoginStore()
const userMenu = loginStore.userMenu
function handleItemChange(itemSub) {
  const url = itemSub.url
  router.push(url)
}

</script>

<style lang="less" scoped>
.logo {
  font-size: 24px;
  font-weight: bold;
  line-height: 100px;
  text-align: center;
  color: #011110;
}

.menu {
  line-height: 30px;
  font-size: 18px;
  font-weight: 600;
}
</style>