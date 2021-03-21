const Teacher = require('../models/Teacher')
const Achievement = require('../models/Achievement')
const Admin = require('../models/Admin')
const Class = require('../models/Class')
const College = require('../models/College')
const Major = require('../models/Major')
const Student = require('../models/Student')
const News = require('../models/news')
const Publish = require('../models/publish')
const School = require('../models/School')

const { pick } = require('../util/propertyHelper')
const validate = require('validate.js');
const md5 = require('md5');
const { Op } = require('sequelize')

const modelsAchi = require('../models/Achievement')
const modelsMajor = require('../models/Major')
const modelCollege = require('../models/College')

//认证学生
exports.authorizationStu = async function(stuId){
    return await Student.findAll({
        where:{
            id: stuId,
        },
        include:[
            {
                model: modelsMajor,
                attributes: ['name','id'],
                include:[
                    {
                        model: modelCollege,
                        attributes:['name','id']
                    }
                ]
            }
        ],
    })
}
//认证老师
exports.authorizationTeacher = async function(teaId){
    return await Teacher.findAll({
        where:{
            id: teaId,
        },
        include:[
            {
                model: modelCollege,
                attributes:['name','id']
            }
        ]
    })
}
//发布新闻
exports.upload = async function(newsObj){
    const res = await News.create(newsObj);
    if(res){
        return res.toJSON();
    }else{
        return null;
    }
}

//获取所有新闻
exports.getNews = async function(page, limit){
    const res = await News.findAndCountAll({
        offset: (page - 1) * limit,
        limit: +limit,
    })
    return{
        total: res.count,
        datas: JSON.parse(JSON.stringify(res.rows))
    }
}

//新闻名字获取新闻
exports.getNewsByName = async function(title){
    const where = {}
    if(title){
        where.title = {
            [Op.like]: `%${title}%`
        }
    }
    const res = await News.findAndCountAll({
        where,
    })
    if(res){
        return{
            total: res.count,
            datas: JSON.parse(JSON.stringify(res.rows))
        }
    }
}

//获取所有公告
exports.getPublist = async function(page, limit){
    const res = await Publish.findAndCountAll({
        offset: (page - 1) * limit,
        limit: +limit,
    })
    return{
        total: res.count,
        datas: JSON.parse(JSON.stringify(res.rows))
    }
}

//公告名字获取公告
exports.getPubsByName = async function(title){
    const where = {}
    if(title){
        where.title = {
            [Op.like]: `%${title}%`
        }
    }
    const res = await Publish.findAndCountAll({
        where,
    })
    if(res){
        return{
            total: res.count,
            datas: JSON.parse(JSON.stringify(res.rows))
        }
    }
}

//公告id获取公告
exports.getPubsById = async function(id){
    const res = await Publish.findByPk(id)
    if(res){
        return res.toJSON()
    }else return null;
}

//发布公告
exports.publish = async function(pubobj){
    const res = await Publish.create(pubobj)
    if(res){
        return res.toJSON();
    }else{
        return null;
    }
}

//获取学校
exports.getSchool = async function(page, limit){
    const res = await School.findAndCountAll({
        offset: (page - 1) * limit,
        limit: +limit,
    })
    return{
        total: res.count,
        datas: JSON.parse(JSON.stringify(res.rows))
    }
}

//修改学校
exports.updateSchool = async function(id,schObj){
    return await School.update(schObj,{
       where:{
           id,
       }
    })
}

//新增学校
exports.addSchool = async function(schObj){
    const res = await School.create(schObj)
    if(res){
        return res.toJSON();
    }else return null;
}

//删除一条新闻
exports.deleteNews = async function(id){
    return await News.destroy({
        where:{
            id: id,
        }
    });
}

//删除一条公告
exports.deletePubs = async function(id){
    return await Publish.destroy({
        where:{
            id: id,
        }
    });
}
