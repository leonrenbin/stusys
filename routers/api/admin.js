const express = require('express')
const router = express.Router();
const adminServ = require('../../service/adminService')
const jwt = require('../jwt')
const { asyncHandler } = require('../getSendResult');

router.post(
    '/login',
    asyncHandler(async (req, res)=>{
        const result = await adminServ.login(req.body.loginId, req.body.loginPwd);
        if(result){
            const value = result.id;
            res.cookie("token",value,{//token名称(键)，value值
                path: "/",
                domain: "localhost",
                maxAge: 360 * 24 * 3600 * 1000,
                httpOnly: true,
                signed: true,
            })
            res.header("authorization",value);
            jwt.publish(res);
            return result;
        }else{
            return {
                msg:'请检查账号或密码是否正确'
            }
        }
        
    })
)

router.get(
    '/whoami',
    asyncHandler(async (req, res)=>{
        console.log(req);
        return await adminServ.getAdminById(req.loginId);
    })
)

router.get(
    '/',
    asyncHandler(async (req, res)=>{
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        return await adminServ.getAdmin(page, limit);
    })
)

router.put('/:id',asyncHandler(async(req, res)=>{
    return await adminServ.updateAdmin(req.params.id, req.body);
}))

router.get('/loginId',asyncHandler(async(req, res)=>{
    return await adminServ.getAdminByLoginId(req.query.loginId || req.body.loginId);
}))

router.post('/add',asyncHandler(async (req, res)=>{
    return await adminServ.addAdmin(req.body || req.query)
}))

module.exports = router;