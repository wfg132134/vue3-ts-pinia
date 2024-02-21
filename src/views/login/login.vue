<template>
  <div class="login">
    <el-tabs type="border-card" class="tabs" :stretch="true" v-model="activeName">
      <el-tab-pane label="登录" name="login" v-model="account">
        <el-form ref="loginFormRef" :model="account" :rules="rules" label-position="right" label-width="80px" style="max-width: 460px" class="loginForm">
          <el-form-item label="用户名：" prop="username">
            <el-input v-model="account.username" />
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input v-model="account.password" type="password" :show-password="true" />
          </el-form-item>
          <el-row :gutter="24">
            <el-col :span="6" :offset="5">
              <el-checkbox class="checkBox" label="记住密码" name="type" v-model="isSavePassword" />
            </el-col>
          </el-row>
          <el-row :gutter="24" class="loginBtn">
            <el-col :span="10" :offset="7">
              <el-button type="primary" style="width: 120px" @click="submit">登录</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="注册" name="register">
        <el-form label-position="right" label-width="100px" style="max-width: 460px" class="registerForm">
          <el-form-item label="邮箱：">
            <el-input />
          </el-form-item>
          <el-form-item label="密码：">
            <el-input type="password" />
          </el-form-item>
          <el-form-item label="确认密码：">
            <el-input type="password" />
          </el-form-item>
          <el-form-item label="验证码：">
            <el-row>
              <el-input type="password" class="inpWidth" />
              <el-button type="primary" plain> 获取验证码 </el-button>
            </el-row>
          </el-form-item>
          <el-row>
            <el-checkbox class="checkBox" label="同意用户使用准则" name="type" />
          </el-row>
          <el-button type="primary" class="loginBtn"> 注册 </el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import useLoginStore from "@/store/login";
import type  { IAccount } from '@/types';


const activeName = ref('login');
const USER_NAME ='cmsusername';
const PASSWORD= 'cmspassword';
const IS_REM_PWD = 'isRemPwd'


const account = reactive<IAccount>({
  username: localStorage.getItem(USER_NAME) ?? '',
  password: localStorage.getItem(PASSWORD) ?? '',
  isSavePassword: true
})

interface RuleForm {
  username: string
  password: string
  isSavePassword: boolean
}

const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: 'Please input Activity name', trigger: 'trigger' },
  ],
  password: [
    { required: true, message: 'Please input Activity name', trigger: 'trigger' },
  ],
})

// 登录模块
const loginFormRef = ref<FormInstance>()
const loginStore = useLoginStore();
const isSavePassword = ref(Boolean(localStorage.getItem(IS_REM_PWD))?? false);
watch(isSavePassword, (newval) =>{
  if(newval) {
    localStorage.setItem(IS_REM_PWD,String(newval));
  } else {
    localStorage.removeItem(IS_REM_PWD);
  }
})

const submit = () => {
  loginFormRef.value?.validate(async (valid) => {
    if (valid) {
      // 获取用户输入的账号和密码
      const username = account.username.trim();
      const password = account.password.trim();
      // 发送网络请求
      loginStore.loginAccountAction({ username, password })
      // 是否是记住密码
      if (isSavePassword.value) {
        localStorage.setItem(USER_NAME, username)
        localStorage.setItem(PASSWORD, password)
      } else {
        localStorage.removeItem(USER_NAME)
        localStorage.removeItem(PASSWORD)
      }

      ElMessage.success('登录成功');
    } else {
      ElMessage.error('check your input')
      return false
    }
  })
}

</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .tabs {
    height: 400px;
    width: 380px;

    .loginForm {
      margin-top: 60px;

      .loginBtn {
      margin-top: 20px;
    }
    }
  }
}

</style>
