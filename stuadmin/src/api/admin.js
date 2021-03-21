import axios from './axios'

export default{
    login(params){
        return axios.post('/admin/login',params)
    },
    whoami(){
        return axios.get('/admin/whoami')
    },
    getAll(){
        return axios.get('admin/')
    },
    getAdminByLoginId(params){
        return axios.get('admin/loginId',params)
    },
    updateAdmin(params){
        return axios.put('admin/'+params.id,params)
    }
}