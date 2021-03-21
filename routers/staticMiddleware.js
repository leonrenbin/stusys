module.exports = (req, res, next)=>{
    if(req.path.startsWith("/api")){//根路径以api开头
        //说明请求的是api接口
        next();
    }else{
        //请求的是静态资源
        if(true){
            res.send('静态资源')
        }else{
            next()
        }
    }
}