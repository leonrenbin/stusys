const Student = require('../models/Student')
const {pick} = require('../util/propertyHelper')
const validate = require('validate.js');
const md5 = require('md5');
const Class = require('../models/Class')
const Teacher = require('../models/Teacher')
const Major = require('../models/Major')
const { Op } = require('sequelize');

const modelsAchi = require('../models/Achievement')

exports.addStudent = async function(stuObj){
    // console.log(stuObj);
    // stuObj = pick(stuObj, 'sNo','loginId','loginPwd','native','name','birthday','sex','mobile','address','ClassId','TeacherId','MajorId','CollegeId','SchoolId','position');
    // validate.validators.classExits = async function(value){//value是classId
    //     const c = await Class.findByPk(value);
    //     if(c)return
    //     else return 'is not exist'
    // }
    // const rule = {
    //     //验证规则
    //     id:{
    //         presence:{
    //             allowEmpty: true,
    //         },
    //     },
    //     sNo:{
    //         presence:true,
    //         type: 'string',
    //     },
    //     loginId:{
    //         presence:{
    //             allowEmpty: true,
    //         },
    //         type: 'string',
    //     },
    //     loginPwd:{
    //         presence:{
    //             allowEmpty: true,
    //         },
    //         type: 'string',
    //     },
    //     address:{
    //         presence: false,
    //         type: 'string',
    //     },
    //     native:{
    //         presence:{
    //             allowEmpty: false,
    //         },
    //         type: 'string',
    //     },
    //     name: {
    //         presence:{
    //             allowEmpty: false,
    //         },
    //         type: 'string',
    //     },
    //     birthday:{
    //         presence:{
    //             allowEmpty: false,
    //         },
    //     },
    //     sex:{
    //         presence: false,
    //         type: 'boolean',
    //     },
    //     mobile:{
    //         presence: {
    //             allowEmpty: false,
    //         },
    //         format: /1\d{10}/,
    //     },
    //     position:{
    //         presence:{
    //             allowEmpty: false,
    //         },
    //     },
    //     TeacherId:{
    //         presence:{
    //             allowEmpty: false,
    //         },
    //     },
    //     ClassId:{
    //         presence: true,
    //         numericality:{
    //             onlyInteger: true,
    //             strict: false,//不严格
    //         },
    //         classExits: true, //自定义查询
    //     },
    //     MajorId:{
    //         presence: true,
    //     },
    //     CollegeId:{
    //         presence: true,
    //     },
    //     SchoolId:{
    //         presence: true,
    //     },
    // }
    // await validate.async(stuObj,rule);//async方式是异步验证，如果验证通过，啥都不会做，验证失败报错
    const ins = await Student.create(stuObj);
    if(ins){
        return ins.toJSON();
    }else{
        return{
            msg: '请正确填写信息',
        }
    }
}

exports.deleteStudent = async function(stuId){ //√
    return await Student.destroy({
        where:{
            id: stuId,
        }
    })
}

exports.updateStudent = async function(id, stuObj={}){ //√
    if(stuObj.loginPwd){
        stuObj.loginPwd = md5(stuObj.loginPwd);
    }
    const res = await Student.update(stuObj,{
        where:{
            id,
        }
    })
    if(res == 1){
        return res;
    }else{
        return null;
    }
}
//通过id查找
exports.getStudentById = async function(id){ //√
    const res = await Student.findByPk(id)
    if(res){
        return res.toJSON()
    }else return null;
}
//所有学生
exports.getStudents = async function(page,limit){ //√
    const res = await Student.findAndCountAll({
        attributes: ['id','sNo','loginId','native','loginPwd','address','name','sex','mobile','birthday',
        'position','TeacherId','ClassId','MajorId','CollegeId','SchoolId'],//指定查询的数据
        offset: (page - 1) * limit,
        limit: +limit,
    })
    return{
        total: res.count,
        datas: JSON.parse(JSON.stringify(res.rows))
    }
}
//登录
exports.login = async function(loginId, loginPwd){
    if((typeof loginPwd) == 'string'){
        loginPwd = md5(+loginPwd)
    }else{
        loginPwd = md5(loginPwd)
    }
    const res = await Student.findOne({
        where:{
            loginId,
            loginPwd,
        },
    })
    if(res){
        return res.toJSON();
    }else return null;
}
//通过学号查找
exports.getbySno = async function(sNo){ //√
    const res = await Student.findOne({
        where:{
            sNo,
        }
    })
    if(res){
        return res.toJSON()
    }else return null;
}
//某个学生成绩
exports.getStuAchievement = async function(id){
    const res = await Student.findOne({
        id,
        include:[
            {
                model: modelsAchi,
            }
        ],
    })
    if(res){
        return res.toJSON();
    }else return null;
}

//所有学生的成绩
exports.getAllStuAchieve = async function(page,limit){ //√
    const res = await Student.findAndCountAll({
        offset: (page - 1) * limit,
        limit: +limit,
        include:[
            {
                model: modelsAchi,
                attributes: {
                    exclude: ['StudentId']
                }
            }
        ],
    })
    return{
        total: res.count,
        datas: JSON.parse(JSON.stringify(res.rows))
    }
}