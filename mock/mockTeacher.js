const Mock = require('mockjs')
const md5 = require('md5')
const result = Mock.mock({
    "datas|100":[//设定有100个老师
        {
            "id|+1": 1,
            tNo: '@integer(10000,20000)',
            loginId: '@tNo',
            loginPwd: md5(123456),
            name: '@cname',
            birthday:'@date',
            'sex|1-2': true,
            address:'@county(true)',
            mobile: /1\d{10}/,
            CollegeId: '@integer(1,8)',
            position: 'teacher',//职务
            SchoolId: 1,
            ClassId: '@integer(1,100)',
        }
    ]
}).datas;
const Teacher = require('../models/Teacher')
Teacher.bulkCreate(result);
module.exports = result;