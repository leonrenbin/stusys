const Class = require('../models/Class')
const { Op } = require('sequelize')
const validate = require('validate.js')
const Major = require('../models/Major')

exports.addClass = async function(classObj){ //√
    validate.validators.majorExist = async function(value){
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
        openDate:{
            presence: false,
            type: 'string',
        },
        stuNumber:{
            presence: true,
            type: 'string',
        },
        TeacherId:{
            presence: true,
            type: 'string',
        },
        MajorId: {
            presence: true,
            type: 'string',
            majorExist: true,
        },
        CollegeId:{
            presence: true,
            type: 'string',
        },
    }
    await validate.async(classObj, rule);
    const res = await Class.create(classObj)
    if(res){
        return res.toJSON();
    }else return null;
}

exports.updateClass = async function(id, classObj){//√
    return await Class.update(classObj, {
        where:{
            id,
        }
    })
}

exports.deleteClass = async function(ClassId){//√
    return await Class.destroy({
        where:{
            id: ClassId,
        }
    })
}

exports.getClassById = async function(id){//√
    //一个班级
    const res = await Class.findByPk(id);
    if(res){
        return res.toJSON();
    }else return null;
}

exports.getClass = async function(){//√
    const res = await Class.findAndCountAll({
        attributes: ['name', 'openDate','stuNumber','TeacherId','MajorId','CollegeId'],
    })
    return{
        total: res.count,
        datas: JSON.parse(JSON.stringify(res.rows))
    }
}

exports.getAchievement = async function(MajorId){
    const res = await Class.findAndCountAll({
        where:{
            MajorId: MajorId,
        },
        // attributes: ['id','name','MajorId'],
    })
    if(res){
        return{
            total: res.count,
            datas: JSON.parse(JSON.stringify(res.rows))
        }
    }else return null;
    // const res = await Class.findOne({
    //     where:{
    //         MajorId,
    //     },
    //     attributes: ['id','name','MajorId'],
    // })
    // return res.toJSON()
}