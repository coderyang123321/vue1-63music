import axios from "axios"

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  timeout:5000
})

instance.interceptors.request.use(config => {
  return config
}, err => {   
    return Promise.reject(err)
})
 
instance.interceptors.response.use(response => {
  return response.data
}, err => {
    return Promise.reject(err)
})

export default instance