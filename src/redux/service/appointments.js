// import { config } from '../utils/config'
import api from './api'

export const appointmentsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAppointments: build.query({
      query: () => ({})
    })
  })
})

export const {
  useGetAppointmentsQuery
} = appointmentsApi
