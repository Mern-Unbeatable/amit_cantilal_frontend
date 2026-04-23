import axios from 'axios'
import type {AxiosError, AxiosResponse} from 'axios';
import type { ApiError } from '@/@types/api.ts'
import { REQUEST_HEADER_AUTH_KEY, TOKEN_TYPE } from '@/constants/api'

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 15_000,
})

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('access_token');
    if (token) {
      config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${token}`
    }
    return config;
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiError>) => {
    const status = error.response?.status
    const requestUrl = error.config?.url ?? ''

    if (status === 401 && !requestUrl.includes('auth/login')) {
      sessionStorage.removeItem('access_token')
      sessionStorage.removeItem('auth-storage')
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export function unwrap<T>(response: AxiosResponse<{ data: T }>): T {
  return response.data.data;
}
