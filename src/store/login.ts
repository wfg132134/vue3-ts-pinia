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
    userMenu: [
      {
          "sort": 1,
          "type": 1,
          "url": "/main/analysis",
          "name": "菜单管理",
          "children": [
              {
                  "name": "功能1",
                  "sort": 106,
                  "parentId": 38,
                  "type": 2,
                  "url": "/main/analysis/one",
                  "id": "111"
              }
          ],
          "id": "001"
      },
      {
          "sort": 2,
          "type": 1,
          "url": "/main/settings",
          "name": "系统设置",
          "children": [
              {
                  "name": "个人设置",
                  "sort": 106,
                  "parentId": 38,
                  "type": 2,
                  "url": "/main/settings/one",
                  "id": "112"
              }
          ],
          "id": "002"
      },
      {
          "sort": 3,
          "type": 1,
          "url": "/main/department",
          "id": "003",
          "name": "部门管理",
          "children": [
              {
                  "name": "我的部门",
                  "sort": 106,
                  "parentId": 38,
                  "type": 2,
                  "url": "/main/department/one",
                  "id": "113"
              }
          ]
      }
    ]
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
      // const userMenuRes = await getUserInfoById(1)

      // 4.数据缓存
      // this.userMenu = userMenuRes
      

      // 页面跳转
      router.push('/main')
    },
  }
})
export default useLoginStore
