import hyRequest from '../services'

export function getData() {
  return hyRequest.httpRequestGet('/test/demo', {})
}

