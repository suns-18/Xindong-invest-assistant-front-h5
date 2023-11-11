import axios from 'axios'
import router from './router'

const instance = axios.create({
    baseURL: '/api/'
})
instance.interceptors.response.use(
    res => {
        if (res.status === 200 && res.data['code'] != 403) {
            return Promise.resolve(res)
        } else {
            return Promise.reject(res)
        }
    },
    async err => {
        if (err.response.status == 403 || err.response.status == 302) {
            await router.push('/login')
        }
        return Promise.reject(err.response)
    }
)
export default instance