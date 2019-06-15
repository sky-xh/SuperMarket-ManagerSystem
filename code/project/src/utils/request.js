// 引入axios,qs
import axios from 'axios'
import qs from 'qs'

// 设置默认服务器域名
axios.defaults.baseURL='http://127.0.0.1:3000';

export default {
    get(url, params = {}){
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params,
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            })
        })
    },
    post(url, params = {}){
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify( params ))
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
        })
    }
}