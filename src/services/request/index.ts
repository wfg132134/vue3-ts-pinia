import axios from 'axios'

import type { AxiosInstance, AxiosRequestConfig } from 'axios'

class HYRequest {
  axiosInstance: AxiosInstance
  public static config: AxiosRequestConfig;

  constructor(config: AxiosRequestConfig) {
    HYRequest.config = config
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  private static axiosInstance = axios.create(HYRequest.config)

  private httpInterceptorsRequest() {
    // 请求拦截
    HYRequest.axiosInstance.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  private httpInterceptorsResponse() {
    // 响应拦截
    HYRequest.axiosInstance.interceptors.response.use(
      (config) => {
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  public httpRequestGet(url: string, params?:AxiosRequestConfig) {
    url = HYRequest.config.baseURL + url
    return HYRequest.axiosInstance.get(url, params).then((res) => res.data).catch()
  }

  public httpRequestPost(url: string, params:AxiosRequestConfig) {
    url = HYRequest.config.baseURL + url
    return HYRequest.axiosInstance.post(url, params).then((res) => res.data).catch()
  }
}

export default HYRequest
