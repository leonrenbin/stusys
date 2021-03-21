const express = require('express');
const router = express.Router();
const Class = require('../../service/classServicd')
const { asyncHandler } = require('../getSendResult')

router.get(//得到所有班级
    '/all',
    asyncHandler(async(req, res)=>{
        return await Class.getClass();
    })
)

router.get(//得到一个班级
    '/:id',
    asyncHandler(async(req, res)=>{
        return await Class.getClassById(req.params.id);
    })
)

router.post(
    '/',
    asyncHandler(async(req, res)=>{
        return await Class.addClass(req.body);
    })
)

router.delete(
    '/:id',
    asyncHandler(async(req, res)=>{
        return await Class.deleteClass(req.params.id)
    })
)

router.put(
    '/id',
    asyncHandler(async(req, res)=>{
        return await Class.updateClass(req.params.id, req.body)
    })
)

module.exports = router;