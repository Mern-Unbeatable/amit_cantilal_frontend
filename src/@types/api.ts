/* ===API Response Wrappers ===*/
export interface ApiSuccess<T = unknown> {
  message: string
  data: T
}

export interface ApiError {
  message: string
  errors?: Record<string, Array<string>>
  status?: number
}
