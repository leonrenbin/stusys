const express = require('express')
const app = express();//创建一个express应用
const path = require('path')
const cors = require('cors')

const session = require('express-session')
app.use(session({
    secret: "sunwukong",//密钥
    name: "sessionid",//更改cookie的名字
}));

// app.use(require('./staticMiddleware'))

// const staticRoot = path.relative(__dirname,'../public');
// app.use('/static', express.static(staticRoot))//必须要以static开头，才会请求这个路径

app.use(cors());
// const whiteList = ["null"];//白名单
// app.use(cors({//返回一个中间件
//     origin(origin,callback){
//         if(whiteList.includes(origin)){
//             callback(null, origin);
//         }else{
//             callback(new Error("not allowed"))   
//         }
//     },
//     credentails: true,
// }))

//加入一个cookie-parser中间件
//加入之后，会在req对象中注入cookies属性，用于获取所有请求传递过来的cookie数据
//加入之后，会在res对象中注入cookie方法，用于设置cookie
const cookieParser = require('cookie-parser')
app.use(cookieParser('sunwukong'));//字符串sunwukong是密钥


//解析application/x-www/form-urlencoded格式的请求体
app.use(express.urlencoded({extended: true}))

//解析application/json格式的请求体
app.use(express.json())

app.use('/api/achievement', require('./api/achievement'));//只要是/api/achievement的路由，交给这个路径来处理
app.use('/api/admin', require('./api/admin'));
app.use('/api/class', require('./api/class'));
app.use('/api/curriculums', require('./api/curriculums'));
app.use('/api/major', require('./api/major'));
app.use('/api/student', require('./api/student'));
app.use('/api/teacher', require('./api/teacher'));
app.use('/api/otherreq', require('./api/other'));
app.use('/api/uploading', require('./api/upload'));

//应用token中间件
app.use(require('./tokenMiddleware'))

app.use(require('./errorMiddleware'))
const port = '1234';
app.listen(port, ()=>{
    console.log(`server listen on ${port}`);
})