import axios from './axios'

export default{
    getStudentById(params){
        return axios.get(`/student/getone/`+params.id)
    },
    getStudents(params){
        return axios.get('/student/',params)
    },
    getbysno(params){
        return axios.get('/student/sno',params)
    },
    getStuAchievement(params){
        return axios.get('/student/achievement/'+params.id)
    },
    
    login(params){//post
        return axios.post('/student/login',params)
    },
    addStudent(params){
        return axios.post('/student/add',params)
    },

    deleteStudent(params){//delete
        return axios.delete('/student/'+params.id)
    },
    updateStudent(params){//put
        return axios.put(`/student/`+params.id, params)
    },
    getAllStuAchieve(params){
        return axios.get('/student/allachievement',params)
    }
}