import Axios, { AxiosError, AxiosInstance } from "axios";

const axios: AxiosInstance = Axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL })

axios.interceptors.request.use((config) => {
    // const token = getCookie('auth_token')
    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`
    // }
    return config
}, (error: AxiosError) => {
    Promise.reject(error)
})

axios.interceptors.response.use(response => {
    return response
}, (error: AxiosError) => { 
    if (error.response?.status === 401) {
        // removeCookie('auth_token')
        window.location.reload()
    }
    return Promise.reject(error)
})

export default axios