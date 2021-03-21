import axios from './axios'

export default{
    upload(params){
        return axios.post('/uploading',params)
    },
}