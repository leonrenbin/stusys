const express = require('express');
const router = express.Router();
const Major = require('../../service/majorService')
const { asyncHandler } = require('../getSendResult')

router.get(
    '/',
    asyncHandler(async (req, res)=>{
        return await Major.getMajor();
    })
)

router.get(
    '/:id',
    asyncHandler(async (req, res)=>{
        return await Major.getMajorById(req.params.id);
    })
)

router.post(
    '/',
    asyncHandler(async (req, res)=>{
        return await Major.addMajor(req.body);
    })
)

router.delete(
    '/:id',
    asyncHandler(async (req, res)=>{
        return await Major.deleteMajor(req.params.id);
    })
)

router.put(
    '/:id',
    asyncHandler(async (req, res)=>{
        return await Major.updateMajor(req.params.id, req.body);
    })
)

module.exports = router;