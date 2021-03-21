//课程表
const Curriculum = require('../models/Curriculum')
const validate = require('validate.js')
const Teacher = require('../models/Teacher')
const Major = require('../models/Major')
exports.addCurriculum = async function(CurriculumObj){//√
    validate.validators.teacherExits = async function(value){
        const t = Teacher.findByPk(value);
        if(t){
            return
        }else return 'is not exist'
    }
    validate.validators.majorExits = async function(value){
        const m = Major.findByPk(value);
        if(m){
            return
        }else return 'is not exist'
    }
    const rule = {
        name:{
            presence: false,
            type: 'string',
        },
        credit:{
            presence: false,
            type: 'string',
        },
        TeacherId:{
            presence: true,
            type: 'string',
            teacherExits: true,
        },
        MajorId:{
            presence: true,
            type: 'string',
            majorExits: true,
        },
    }
    await validate.async(CurriculumObj, rule)
    const result = await Curriculum.create(CurriculumObj);
    if(result){
        return result.toJSON();
    }else return null
}

exports.updateCurriculum = async function(id, CurriculumObj){//√
    return await Curriculum.update(CurriculumObj,{
        where:{
            id,
        }
    })
}

exports.deleteCurriculum = async function(CurriculumObj){//√
    return await Curriculum.destroy({
        where:{
            id: CurriculumObj,
        }
    });
}

exports.getCurriculum = async function(){//√
    const res = await Curriculum.findAndCountAll();
    if(res){
        return {
            total: res.count,
            datas: JSON.parse(JSON.stringify(res.rows))
        }
    }else return null;
}

exports.getCurriculumByMajorId = async function(MajorId){ //√
    //通过专业id找课表
    const res = await Curriculum.findAndCountAll({
        where:{
            MajorId,
        }
    })
    if(res){
        return {
            total: res.count,
            data: JSON.parse(JSON.stringify(res.rows)),
        }
    }else return null;
}
