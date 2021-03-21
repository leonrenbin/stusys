const allowOrigins = [//允许跨域的
    'http://127.0.0.1:1234',
    'null'
];

module.exports = (req, res, next)=>{
    //处理预检请求
    if(req.method === "OPTIONS"){
        res.header(
            `Access-Control-Allow-Methods`,
            req.headers["access-control-request-method"]
        );
        res.header(
            `Access-Control-Allow-Headers`,
            req.headers["access-control-request-headers"]
        );
    }
    res.header("Access-Control-Allow-Credentials", true)//处理跨域问题

    //处理简单请求
    if("origin" in req.headers && allowOrigins.includes(req.headers.origin)){
        res.header("access-control-allow-origin", req.headers.origin);
    }
    next();
}