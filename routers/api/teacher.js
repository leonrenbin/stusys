const express = require('express');
const Teacher = require('../../service/teacherService');
const router = express.Router();
const teacherServ = require('../../service/teacherService')
const { asyncHandler } = require('../getSendResult')
const jwt = require('../jwt')

router.post(
    '/login',
    asyncHandler(async (req, res)=>{
        const result = await teacherServ.login(req.body.loginId, req.body.loginPwd);
        if(result){
            const value = result.id;
            res.cookie("token",value,{
                path: '/',
                domain: 'localhost',
                maxAge: 360 * 24 * 3600 * 1000,
                httpOnly: true,
                signed: true,
            })
            res.header("authorization",value);
            jwt.publish(res)
        }
        return result;
    })
)

router.get('/byname',asyncHandler(async(req, res)=>{
    return await Teacher.getTeacherByName(req.query.name, req.body.name);
}))

router.get('/loginId',asyncHandler(async(req, res)=>{
    return await Teacher.getTeacherByLoginId(req.query.loginId || req.body.loginId);
}))

router.get('/whoami', asyncHandler(async (req, res)=>{
    return await Teacher.getTeacherById(req.loginId);
}))

router.get('/',asyncHandler(async (req, res)=>{//获取所有老师
    return await Teacher.getTeacher();
}))

router.get('/:id',asyncHandler(async (req, res)=>{
    return await Teacher.getTeacherById(req.params.id);
}))

router.get('/class/:id',asyncHandler(async (req, res)=>{
    return await Teacher.getClass(req.params.id);
}))

router.get('/achievement/:id',asyncHandler(async (req, res)=>{
    return await Teacher.getAchievement(req.params.id);
}))

router.post('/:id',asyncHandler(async(req, res)=>{
    return await Teacher.addTeacher(req.body)
}))

router.delete('/:id', asyncHandler(async(req, res)=>{
    return await Teacher.deleteTeacher(req.params.id)
}))

router.put('/:id',asyncHandler(async(req, res)=>{//√
    return await Teacher.updateTeacher(req.params.id, req.body)
}))

router.get('/likeSearch',asyncHandler(async(req, res)=>{
    return await Teacher.getTeacherByCollege(req.CollegeId);
}))

module.exports = router;