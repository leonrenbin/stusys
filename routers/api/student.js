const express = require('express');
const router = express.Router();
const stuServ = require('../../service/studentService')
const { asyncHandler } = require('../getSendResult')
const jwt = require('../jwt')
const md5 = require('md5')

router.get('/',asyncHandler(async (req, res)=>{//分页获取
    const page = req.query.page || 1;
    const limit = req.query.limit || 100;
    return await stuServ.getStudents(page, limit);
}))

router.get('/getone/:id', asyncHandler(async (req, res)=>{//获取个人
    return await stuServ.getStudentById(req.params.id);
}))

router.get( //通过学号获取
    '/sno',
    asyncHandler(async (req, res)=>{
        return await stuServ.getbySno(req.body.sNo || req.query.sNo)
    })
)
//单人成绩
router.get('/achievement/:id',asyncHandler(async(req, res)=>{
    return await stuServ.getStuAchievement(req.params.id);
}))
//所有人成绩
router.get('/allachievement',asyncHandler(async (req,res)=>{
    const page = req.query.page || 1;
    const limit = req.query.limit || 100;
    return await stuServ.getAllStuAchieve(page, limit);
}))

router.post('/add',asyncHandler(async (req, res)=>{//添加
    // console.log(req.body);
    return await stuServ.addStudent(req.body);
}))

router.delete('/:id',asyncHandler(async(req, res)=>{//删除
    return await stuServ.deleteStudent(req.params.id)
}))

router.put('/:id', asyncHandler(async(req,res)=>{//修改
    return await stuServ.updateStudent(req.params.id, req.body)
}))

router.post(
    '/login',
    asyncHandler(async (req, res)=>{
        const result = await stuServ.login(req.body.loginId, req.body.loginPwd);
        if(result){//成功
            const value = result.id;
            res.cookie("token",value,{
                path: '/',
                domain: 'localhost',
                maxAge: 360 * 24 * 3600 * 1000,//360天
                httpOnly: true,
                signed: true,//此设置，无论cookie写成啥，都会加密，防止cookie被篡改
            })
            res.header("authorization",value)//适配其他终端
            jwt.publish(res, undefined, { id: value });//第三个参数是 info
        }
        return result;
    })
)

module.exports = router;