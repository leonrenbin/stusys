import axios from './axios'

export default{
    authorizationStu(params){
        return axios.get('/otherreq/authorizationStu/'+params.id)
    },
    authorizationTeacher(params){
        return axios.get('/otherreq/authorizationTeacher/'+params.id)
    },
    upload(params){
        return axios.post('/otherreq/upload',params)
    },
    getNews(){
        return axios.get('/otherreq/news');
    },
    getNewsByName(params){
        return axios.get('/otherreq/getnewsbyname',params);
    },
    getPublist(){
        return axios.get('/otherreq/public')
    },
    getPubsByName(params){
        return axios.get('/otherreq/getpubsbyname',params);
    },
    getPubsById(params){
        return axios.get('/otherreq/getpubsbyid/'+params.id);
    },
    postPub(params){
        return axios.post('/otherreq/publish',params)
    },
    getSchool(){
        return axios.get('/otherreq/school')
    },
    deleteNews(params){//news
        return axios.delete('/otherreq/news/'+params.id)
    },
    deletePubs(params){//pubs
        return axios.delete('/otherreq/publist/'+params.id)
    },
    getCode(params){
        return axios.get('/otherreq/vcode', params)
    },
}
