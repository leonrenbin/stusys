const Teacher = require('../models/Teacher')
const { pick } = require('../util/propertyHelper')
const validate = require('validate.js');
const md5 = require('md5');
const College = require('../models/College')
const { Op } = require('sequelize')

const modelClass = require('../models/Class')
const modelStudent = require('../models/Student')
const modelCollege = require('../models/College')
const modelSchool = require('../models/School')
const modelMajor = require('../models/Major')
const modelAchievement = require('../models/Achievement')
const modelCurriculum = require('../models/Curriculum')

exports.login = async function(loginId, loginPwd){//√
    if((typeof loginPwd) == 'string'){
        loginPwd = md5(+loginPwd)
    }else{
        loginPwd = md5(loginPwd)
    }
    // console.log(loginPwd === '6ac1e56bc78f031059be7be854522c4c');
    const res = await Teacher.findOne({
        where:{
            loginId,
            loginPwd,
        },
    })
    if(res){
        return res.toJSON()
    }else return null;
}

exports.addTeacher = async function(teacherObj){
    teacherObj = pick(teacherObj, 'tNo','loginId','loginPwd','name','birthday','sex','mobile','address','CollegeId');
    validate.validators.collegeExits = async (value)=>{//value是classId
        //查询学院是否存在
        const c = await College.findByPk(value);
        if(c){
            return
        }else{
            return 'is not exist'
        }
    }
    const rule = {
        //验证规则
        tNo:{
            presence: true,//可以为空仅限于{},[],""," ",
            // presence:{
            //     allowEmpty: false,//不允许为空,包括{},[],""," "
            // },
        },
        name: {
            presence:{
                allowEmpty: false,
            },
            type: 'string',//支持的类型array, integer, number, string, date, boolean,
        },
        birthday:{
            presence:{
                allowEmpty: false,
            },
            // datetime:{
            //     dateOnle: false, //只要日期，不要时分秒
            //     earliest: +moment.utc().subtract(100, 'y'),
            //     latest: +moment.utc().subtract(24, 'y'),
            // },
            // type: 'date'
        },
        sex:{
            presence: true,
            type: 'boolean',
        },
        mobile:{
            presence: {
                allowEmpty: false,
            },
            format: /1\d{10}/,
        },
        address:{
            presence: {
                allowEmpty: false,
            },
            type: 'string'
        },
        CollegeId:{
            presence: true,
            numericality:{//numericality不是很严格,只要是数字就行
                onlyInteger: true,//必须是整数
                strict: false,//不严格
            },
            collegeExits: true, //自定义查询
        },
    }
    await validate.async(teacherObj, rule);
    //async方式是异步验证，如果验证通过，啥都不会做，验证失败报错
    const res = await Teacher.create(teacherObj);
    if(res){
        return res.toJSON();
    }else return null;
}

exports.deleteTeacher = async function(teacherId){ //√
    return await Teacher.destroy({
        where:{
            id: teacherId,
        }
    })
}

exports.updateTeacher = async function(id, teacherObj={}){ //√
    if(teacherObj.loginPwd){
        teacherObj.loginPwd = md5(teacherObj.loginPwd);
    }
    return await Teacher.update(teacherObj,{
        where:{
            id,
        }
    })
}

exports.getTeacherById = async function(id){ //√
    const res = await Teacher.findByPk(id);
    if(res){
        return res.toJSON()
    }else return null;
}

exports.getTeacher = async function(page=1, limit=100){ //√
    const res = await Teacher.findAndCountAll({
        offset: (page - 1) * limit,
        limit : +limit,
    });
    if(res){
        return {
            total: res.count,
            datas: JSON.parse(JSON.stringify(res.rows))
        }
    }else return null;
}

exports.getTeacherByCollege = async function(CollegeId){//√
    const res = await Teacher.findAndCountAll({
        CollegeId,
        attributes: ['name','birthday','sex','address','mobile','CollegeId'],
    })
    if(res){
        return{
            total: res.count,
            datas: JSON.parse(JSON.stringify(res.rows))
        }
    }else return null;
}

exports.getTeacherByLoginId = async function(loginId){
    const res = await Teacher.findOne({
        where:{
            loginId,
        }
    })
    if(res){
        return res.toJSON();
    }else return null;
}

exports.getClass = async function(id){//√
    const res = await Teacher.findOne({
        id,
        include:[
            {
                model: modelStudent,
                attributes:['name','id','address','sNo','sex','native','position','mobile','birthday','ClassId'],
                include:[
                    {
                        model: modelClass,
                        attributes: ['name','id'],
                    }
                ],
                include:[
                    {
                        model: modelMajor,
                        attributes: ['name'],
                        include:[
                            {
                                model: modelCollege,
                                attributes: ['name'],
                                include:[
                                    {
                                        model: modelSchool,
                                        attributes: ['name'],
                                    }
                                ],
                            }
                        ],
                    }
                ],
            }
        ],
    })
    if(res){
        return res.toJSON();
    }else return null;
}

exports.getAchievement = async function(id){
    const res = await Teacher.findOne({
        id,
        include:[
            {
                model: modelCurriculum,
                attributes: ['name','id'],
            }
        ],
        include:[
            {
                model: modelStudent,
                attributes:['name','id'],
                include:[{
                    model: modelAchievement,
                }],
            }
        ],
    })
    if(res){
        return res.toJSON();
    }else return null;
}

exports.getTeacherByName = async function(name){
    const where = {}
    if(name){
        where.name = {
            [Op.like]: `%${name}%`
        }
    }
    const res = await Teacher.findAndCountAll({
        where,
        attributes: ['name','mobile','birthday','sex','CollegeId','position','SchoolId'],
        include:[{
            model: modelCollege,
            attributes: ['name'],
            include:[{
                model: modelSchool,
                attributes:['name']
            }]
        }],
    })
    if(res){
        return {
            total: res.count,
            datas: JSON.parse(JSON.stringify(res.rows))
        }
    }else return null;
}