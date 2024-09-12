import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
  },
})

export const ApiService = {
  get(resource: string) {
    return api.get(resource)
  },

  post(resource: string, data: any) {
    return api.post(resource, data)
  },

  put(resource: string, data: any) {
    return api.put(resource, data)
  },

  delete(resource: string) {
    return api.delete(resource)
  },
}

export default ApiService
