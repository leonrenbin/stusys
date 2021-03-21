//记录日志
const log4js = require('log4js')
const path = require('path')

log4js.configure({
    appenders:{
        sql: {
            typa: 'dateFile',//4.配置这个sql日志出口
            maxLogSize: 1024,//配置文件的最大字节数
            keepFileExt: true,
            daysToKeep: 360, //360天
            filename: path.relative(__dirname, '../logs', 'sqlLog.log'),//把日志记录到这个目录下
            layout:{//日志输出的格式
                type: 'pattern',
                pattern: '[%d{yyyy-MM-dd hh:mm:ss}] %p %c: %m%n'
            }
        },
        default:{//默认分类，必须写
            type: 'stdout',//默认在控制台输出
        }
    },
    categories:{
        sql: {//1.有一个分类叫sql
            appenders:['sql'],//3.该跟类使用出口 sql 的配置写入日志
            level: 'all',//这个分类支持all以上级别的日志
        },
        default:{
            appenders: ['default'],
            level: 'all'
        }
    }
})

const sqlLogger = log4js.getLogger('sql');
const defaultLogger = log4js.getLogger();

exports.sqlLogger = sqlLogger;
exports.defaultLogger = defaultLogger;