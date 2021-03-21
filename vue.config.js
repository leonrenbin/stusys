module.exports = {
    devServer:{
        proxy:{
            "/api":{
                target: "http://localhost:1234",
            }
        }
    }
}
//要是报错就把文件放到根目录