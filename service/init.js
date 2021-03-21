/*
    get: 获取
    post：发送(添加，登录)
    delete：删除
    put：修改
*/

//业务逻辑初始化
const validate = require('validate.js')
const moment = require('moment')
//扩展validate里的验证器，其中一个验证器叫datetime，扩展它的功能parse和format
validate.extend(validate.validators.datetime,{
    /**
     * 该函数胡自动用于日期格式转换
     * 它会在验证时自动触发，它需要将任何数据为时间戳返回
     * 如果无法转换，返回nan
     * @param {*} value 传入要转换的值
     * @param {*} options 针对某个属性的验证配置
     */
    parse(value, options){
        let formats = ['YYYY-MM-DD', 'YYYY-M-D', 'x']//允许的时间格式,x是时间戳
        if(formats.dateOnly){
            formats = ['YYYY-MM-DD', 'YYYY-M-D', 'x']
        }
        return +moment.utc(value, formats, true);//true,是严格模式
    },
    //用于验证消息时显示的字符串
    format(value, options){
        let format = 'YYYY-MM-DD'
        if(!options.dateOnly){
            format += ' HH:mm:ss';
        }
        return moment.utc(value).format(format)
    }
})

// const stu = require('./studentService')
// stu.getStudentByClass(20).then(r=>console.log(r.total))