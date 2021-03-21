const express = require('express');
const router = express.Router();
const Curriculum = require('../../service/curriculumsService')
const { asyncHandler } = require('../getSendResult')

router.get(
    '/',
    asyncHandler(async (req, res)=>{
        return await Curriculum.getCurriculum();
    })
)

router.get(
    '/:id',
    asyncHandler(async (req, res)=>{
        return await Curriculum.getCurriculumByMajorId();
    })
)

router.post(
    '/',
    asyncHandler(async (req, res)=>{
        return await Curriculum.addCurriculum(req.body);
    })
)

router.delete(
    '/:id',
    asyncHandler(async (req, res)=>{
        return await Curriculum.deleteCurriculum(req.params.id);
    })
)

router.put(
    '/:id',
    asyncHandler(async (req, res)=>{
        return await Curriculum.updateCurriculum(req.params.id, req.body);
    })
)

module.exports = router;