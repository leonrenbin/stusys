const Major = require('../models/Major')
const validate = require('validate.js')
const college = require('../models/College')

exports.addMajor = async function(majorObj){//√
    validate.validators.collegeExits = async function(value){
        const c = college.findByPk(value);
        if(c){
            return
        }else return 'is not exist'
    }
    const rule = {
        name:{
            presence: false,
            type: 'string',
        },
        stuNumber:{
            presence: true,
            type: 'string',
        },
        CollegeId:{
            presence: false,
            type: 'string',
            collegeExits: true, //自定义查询
        },
    }
    await validate.async(majorObj, rule)
    const result = await Major.create(majorObj);
    if(result){
        return result.toJSON();
    }else return null
}

exports.updateMajor = async function(id, majorObj){//√
    return await Major.update(majorObj,{
        where:{
            id,
        }
    })
}

exports.deleteMajor = async function(MajorId){//√
    return await Major.destroy({
        where:{
            id: MajorId,
        }
    });
}

exports.getMajor = async function(page=1, limit=100){//√
    const res = await Major.findAndCountAll({
        offset: (page - 1) * limit,
        limit: +limit,
    });
    if(res){
        return{
            total: res.count,
            datas: JSON.parse(JSON.stringify(res.rows))
        }
    }else return null;
}

exports.getMajorById = async function(id){//√
    const res = await Major.findByPk(id);
    if(res) return res.toJSON();
    else return null;
}
