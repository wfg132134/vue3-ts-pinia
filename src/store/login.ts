import { getAccountData } from '@/api'
import type { IAccount } from '@/types'
import { defineStore } from 'pinia'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    username: '',
    password: '',
    token: ''
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginRes = await getAccountData(account)
      this.id = loginRes.data.id
      this.username = loginRes.data.username
      this.password = loginRes.data.password
      this.token = loginRes.data.token
      console.log('loginRes', loginRes)
    }
  }
})
export default useLoginStore
