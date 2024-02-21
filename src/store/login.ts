import { getAccountData } from '@/api'
import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
import type { IAccount } from '@/types'
import { defineStore } from 'pinia'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    username: '',
    password: '',
    token: localStorage.getItem(LOGIN_TOKEN) ?? '',
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 账号登录，获取tokens等信息
      const loginRes = await getAccountData(account)
      this.id = loginRes.data.id
      this.username = loginRes.data.username
      this.password = loginRes.data.password
      this.token = loginRes.data.token

      // 进行本地缓存
      localStorage.setItem(LOGIN_TOKEN, this.token)

      // 页面跳转
      router.push('/main')
    }
  }
})
export default useLoginStore
