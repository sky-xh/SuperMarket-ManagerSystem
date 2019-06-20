// 引入axios,qs
import axios from 'axios'
import qs from 'qs'
import local from './localStorage'

// 设置默认服务器域名
// axios.defaults.baseURL='http://127.0.0.1:3000';
axios.defaults.baseURL='http://172.16.12.174:3000';

axios.interceptors.request.use(config => {
    const token = local.get('this_is_not_token');
    config.headers.authorization = `Bearer ${ token }`;
    return config;
})
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