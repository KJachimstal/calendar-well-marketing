import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import config from '../../utils/config'

/* -------------------------------- baseQuery ------------------------------- */
const baseQuery = fetchBaseQuery({
  baseUrl: config.api.url,
  prepareHeaders: (headers) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = localStorage.getItem('token')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

/* ----------------------------------- API ---------------------------------- */
const api = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}),
})

export default api
