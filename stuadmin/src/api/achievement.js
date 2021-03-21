//查询成绩
import axios from './axios'

export default{
    getAchieByStuIdSname(params){
        return axios.get('/achievement/nameAndId',params);
    },
    getAllAchieve(){
        return axios.get('achievement/all');
    }
}