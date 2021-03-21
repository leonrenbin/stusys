const Achievement = require('../../service/achievementService')
const express = require('express')
const router = express.Router();
const { asyncHandler } = require('../getSendResult');

router.get(//√
    '/all', 
    asyncHandler(async(req, res)=>{
        const page = req.query.page || 1;
        const limit = req.query.limit || 100;
        return await Achievement.getAchievement(page, limit);
    })
)

router.post(
    '/', 
    asyncHandler(async(req, res)=>{
        return await Achievement.addAchievement(req.body);
    })
)

//通过学生id获取学生成绩
router.get(//√
    '/getbyid',
    asyncHandler(async(req, res)=>{
        console.log(req.body);
        return await Achievement.getAchieByStuId(req.body.StudentId)
    })
)

router.delete(
    '/:id',
    asyncHandler(async(req, res)=>{
        return await Achievement.deleteAchievement(req.params.id)
    })
)

//通过学生姓名+学生id获取成绩
router.get(
    '/nameAndId',
    asyncHandler(async(req, res)=>{
        return await Achievement.getAchieByStuIdSname(req.body.StudentId || req.query.StudentId, req.body.sName || req.query.sName);
    })
)

//通过班级id获取stu成绩
router.get(
    '/classid',
    asyncHandler(async(req, res)=>{
        return await Achievement.getAchieByStuIdSname(req.params.ClassId);
    })
)

module.exports = router;