//管理员初始化，判断数据库中是否有管理员，如果没有，自动生成一个管理员
const Admin = require('../models/Admin')
const md5 = require('md5')

exports.addAdmin = async function(adminObj){
    //应该判断admin的各种属性是否合理，以及账号是否存在
    const res = await Admin.findOne({
        where:{
            loginId: adminObj.loginId,
        }
    })
    if(res){
        console.log('账号已经存在');
        return;
    }
    const regId = /\d{10}/;
    if(!regId.test(adminObj.loginId)){
        return;
    }
    adminObj.loginPwd = md5(adminObj.loginPwd);
    const ins = await Admin.create(adminObj);
    return ins.toJSON();
}

exports.deleteAdmin = async function(adminId){
    //判断管理员只有一个，不能再删了
    const res = await Admin.findAll();
    if(res.length === 1){
        console.log('该表必须拥有至少一个id');
        return;
    }
    return await Admin.destroy({
        where:{
            id: adminId,
        }
    })
}

exports.updateAdmin = async function(id, adminObj={}){
    if(adminObj.loginPwd){
        adminObj.loginPwd = md5(adminObj.loginPwd);
    }
    return await Admin.update(adminObj,{
        where:{
            id,
        }
    })
}

exports.login = async function(loginId, loginPwd){
    if((typeof loginPwd) == 'string'){
        loginPwd = md5(+loginPwd);
    }else{
        loginPwd = md5(loginPwd);
    }
    const res = await Admin.findOne({
        where:{
            loginId,
            loginPwd,
        }
    })
    if(res && res.loginId === loginId && res.loginPwd === loginPwd){
        return res.toJSON();
    }else return null;
}

exports.getAdmin = async function(page = 1, limit = 10){
    const res = await Admin.findAndCountAll({
        offset: (page - 1) * limit,
        limit: +limit,
    })
    return{
        total: res.count,
        datas: JSON.parse(JSON.stringify(res.rows))
    }
}

exports.getAdminById = async function(id){
    const res = await Admin.findByPk(id);
    if(res){
        return res.toJSON();
    }else return null;
}

exports.getAdminByLoginId = async function(loginId){
    const res = await Admin.findOne({
        where:{
            loginId,
        }
    })
    if(res){
        return res.toJSON();
    }else return null;
}