import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:1234/api'
})
instance.interceptors.request.use(req=>{
    return {
        ...req,
    }
},err=>{
    Promise.reject(err)
})
instance.interceptors.response.use(resp=>{
    if(resp.data.status === 'fail'){
        return Promise.reject(resp)
    }else{
        return resp.data.data;
    }
},err=>{
    Promise.reject(err)
})
export default instance;