//颁发jwt(token令牌)
const secrect = 'sunwukong';//秘密(密钥)
const jwt = require('jsonwebtoken')
const cookieKey = "token";

//颁发jwt
exports.publish = function(res, maxAge=1000 * 3600 * 24 * 360, info={}){
    console.log('颁发jwt');
    const token = jwt.sign(info, secrect,{
        expiresIn: maxAge,
    })
    //添加其他传输
    res.header("authorization", token);
}

//验证jwt
exports.verify = function(req){
    console.log('验证jwt');
    let token = req.headers.authorization;
    if(!token){
        return null;
    }
    token = token.split(" ");
    token = token.length === 1 ? token[0] : token[1];
    try{
        const result = jwt.verify(token, secrect);
        return result;
    }catch(err){
        return null;
    }
}