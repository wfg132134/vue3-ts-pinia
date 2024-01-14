import type { IAccount } from '@/types'
import hyRequest from '../services'

export function getData(params: any) {
  return hyRequest.httpRequestGet('/test/demo', { params })
}


export function getAccountData(params: IAccount) {
  return hyRequest.httpRequestGet('/cms/login', { params })
}

