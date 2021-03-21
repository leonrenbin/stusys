import axios from './axios'

export default{
    login(params){//post
        //loginid, loginpwd
        return axios.post('/teacher/login',params)
    },
    addTeacher(params){
        return axios.post('/teacher/add',{params})
    },

    deleteTeacher(id){//delete
        return axios.delete(`/teacher/:${id}`)
    },
    updateTeacher(params){//put
        return axios.put('/teacher/'+params.id, params)
    },

    //get
    getTeacherById(params){
        return axios.get(`/teacher/`+params.id)
    },
    getTeacher(params){
        //page，limit
        return axios.get('/teacher/',{params})
    },
    getClass(params){
        return axios.get(`/teacher/class/`+params.id)
    },
    getStudents(id){
        return axios.get('/teacher/whoami',{id})
    },
    getAchievement(params){
        return axios.get('/teacher/achievement/'+params.id)
    },
    getbyLoginId(params){
        return axios.get('/teacher/loginid',params)
    },
    getTeacherByName(params){
        return axios.get('/teacher/byname',params)
    },
}