//用于解析token
const { getErr } = require('./getSendResult')
const { pathToRegexp } = require('path-to-regexp')
const jwt = require('./jwt')

const needTokenApi = [
    {method: "POST", path: "/api/student/login"},//用post去请求这个地址的时候，必须要认证
    {method: "PUT", path: "/api/student/:id"},
    {method: "GET", path: "/api/admin/whoami"},
    {method: "GET", path: "/api/teacher/login"},
];

module.exports = (req, res, next)=>{
    const apis = needTokenApi.filter(api=>{
        const reg = pathToRegexp(api.path);
        return api.method === req.method && reg.test(req.path);
    })
    if(apis.length === 0){
        next();
        return;
    }

    let result = jwt.verify(req);
    if(result){
        //认证通过
        req.loginId = result.id;//req添加一个属性loginId，这个id是之前在jwt里存的
        console.log(req.loginId);
        next();
    }else{
        handleNonToken(req, res, next)
    }
}

//处理么有认证的情况
function handleNonToken(req, res, next){
    res.status(403).send(getErr('你没有令牌',403))
}