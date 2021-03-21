//成绩表
const Achievement = require('../models/Achievement')
const validate = require('validate.js')
const Student = require('../models/Student')
const Stu = require('../service/studentService')

const modelCurriculum = require('../models/Curriculum')
const modelStudent = require('../models/Student')
const modelMajor = require('../models/Major')


exports.addAchievement = async function(AchievementObj){ //√
    validate.validators.StudentExist = async function(value){
        const s = Student.findByPk(value);
        if(s){
            return
        }else return 'is not exist'
    }
    const rule = {
        sName:{
            presence: false,
            type: 'string',
        },
        sNo:{
            presence: true,
            type: 'string',
        },
        StudentId:{
            presence: false,
            type: 'string',
            StudentExist: true,
        },
        total:{
            presence: true,
            type: 'string',
        },
        rank:{
            presence: true,
            type: 'string',
        },
        avg:{
            presence: true,
            type: 'string',
        },
    }
    await validate.async(AchievementObj, rule)
    const result = await Achievement.create(AchievementObj);
    if(result){
        return result.toJSON();
    }else return null
}

exports.updateAchievement = async function(id, AchievementObj){//√
    //修改
    return await Achievement.update(AchievementObj,{
        where:{
            id,
        }
    })
}

exports.deleteAchievement = async function(AchievementId){//√
    //删除
    return await Achievement.destroy({
        where:{
            id: AchievementId,
        }
    });
}

exports.getAchievement = async function(){//√
    //得到所有成绩
    const res = await Achievement.findAndCountAll();
    if(res){
        return {
            total: res.count,
            data: JSON.parse(JSON.stringify(res.rows))
        }
    }else return null;
}

exports.getAchieByStuId = async function(StudentId){//√
    //通过学生id找成绩
    const res = await Achievement.findOne({
        where:{
            StudentId,
        }
    });
    if(res){
        return res.toJSON()
    }else return null;
}

exports.getAchieByStuIdSname = async function(StudentId, sName){//√
    //通过学生id+name找成绩
    const res = await Achievement.findAndCountAll({
        where:{
            StudentId,
            sName
        },
        attributes:{exclude:['StudentId','id','sName','sNo','avg','rank','total']},
        include:[
            {
                model: modelStudent,
                attributes:['id'],
                include:[
                    {
                        model: modelMajor,
                        attributes: ['id'],
                        include:[
                            {
                                model: modelCurriculum,
                                attributes:['name','credit']
                            }
                        ]
                    }
                ]
            }
        ]
    });
    if(res){
        return JSON.parse(JSON.stringify(res.rows))
    }else return null;
}
