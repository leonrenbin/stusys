const express = require('express');
const router = express.Router();
const other = require('../../service/otherService')
const { asyncHandler } = require('../getSendResult')
const svgCaptcha = require('svg-captcha')

//发布新闻
router.post('/upload', asyncHandler(async (req, res)=>{
    return await other.upload(req.body);
}))

router.get('/authorizationStu/:id', asyncHandler(async (req, res)=>{
    return await other.authorizationStu(req.params.id);
}))

router.get('/authorizationTeacher/:id', asyncHandler(async (req, res)=>{
    return await other.authorizationTeacher(req.params.id);
}))

router.get('/majorAndCollege/:id', asyncHandler(async (req, res)=>{
    return await other.majorCollege(req.params.id);
}))

//所有新闻
router.get('/news',asyncHandler(async (req, res)=>{
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    return await other.getNews(page,limit);
}))

//新闻名字获取新闻
router.get('/getnewsbyname',asyncHandler(async (req, res)=>{
    return await other.getNewsByName(req.body.title || req.query.title);
}))

//所有公告
router.get('/public', asyncHandler(async(req, res)=>{
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    return await other.getPublist(page, limit);
}))

//公告名字获取公告
router.get('/getpubsbyname',asyncHandler(async (req, res)=>{
    return await other.getPubsByName(req.body.title || req.query.title);
}))

//公告id获取公告
router.get('/getpubsbyid/:id',asyncHandler(async (req, res)=>{
    return await other.getPubsById(req.params.id);
}))

//发布公告
router.post('/publish', asyncHandler(async (req, res)=>{
    return await other.publish(req.body);
}))

//修改学校
router.put('/school/:id', asyncHandler(async(req, res)=>{
    console.log(req.params.id, req.body);
    return await other.updateSchool(req.params.id, req.body);
}))

//获得学校
router.get('/school', asyncHandler(async(req, res)=>{
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    return await other.getSchool(page, limit);
}))

//新增学校
router.post('/school', asyncHandler(async(req, res)=>{
    console.log(req.body);
    return await other.addSchool(req.body || req.query);
}))

//删除新闻
router.delete('/news/:id', asyncHandler(async(req, res)=>{
    return await other.deleteNews(req.params.id);
}))

//删除公告
router.delete('/publist/:id', asyncHandler(async(req, res)=>{
    return await other.deletePubs(req.params.id);
}))

//获取验证码
router.get('/vcode',asyncHandler(async(req, res)=>{
    if(req.body !== {}){
        const captcha = svgCaptcha.create({
            size: 5,
            fontSize: 50,
            width: 150,
            height: 50,
            background: '#5e6d6d'
        })
        res.send({
            data:{
                text: captcha.text,
                data: captcha.data
            }
        })
    }else{
        res.send({
            data:{
                text: '',
                data: '内容不能为空'
            }
        })
    }
}))

module.exports = router;