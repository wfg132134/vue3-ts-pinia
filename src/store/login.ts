import { getAccountData, getUserInfoById } from '@/api'
import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
import type { IAccount } from '@/types'
import { defineStore } from 'pinia'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: 2,
    username: '',
    password: '',
    token: localStorage.getItem(LOGIN_TOKEN) ?? '',
    userMenu: JSON.parse(localStorage.getItem('userMenu')) ?? []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录，获取tokens等信息
      const loginRes = await getAccountData(account)
      this.id = loginRes.data.id
      this.username = loginRes.data.username
      this.password = loginRes.data.password
      this.token = loginRes.data.token

      // 2.进行本地缓存
      localStorage.setItem(LOGIN_TOKEN, this.token)

      // 3.获取用户的详细信息（role）
      const userMenuRes = await getUserInfoById(1)

      // 4.数据缓存
      localStorage.setItem('userMenu', JSON.stringify(userMenuRes.data))
      this.userMenu = JSON.stringify(userMenuRes.data)

      // 页面跳转
      router.push('/main')
    },
  }
})
export default useLoginStore
