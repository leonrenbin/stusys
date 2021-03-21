//此函数自己封装的
exports.getErr = function(err="server internal error", errCode = 500){
    //server internal error 服务器内部错误
    return{
        code: errCode,
        msg: err,
    }
}

exports.getResult = function(res){
    return{
        code: 0,
        msg: "",
        data: res,
    }
}

exports.asyncHandler = (handler)=>{
    return async(req, res, next)=>{
        try{
            const result = await handler(req, res, next);
            res.send(exports.getResult(result))
        }catch(err){
            next(err);
        }
    }
}