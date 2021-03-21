const Mock = require('mockjs')
const md5 = require('md5')
const sid = [];
let count = 1 ;
for(let i=(count-1)*30+1; i<=count*30; i++){
    sid.push(i)
}
const result = Mock.mock({
    "datas|3000":[
        {
            "id|+1":1,
            'sNo|+1': '@integer(2017000000001,2021999999999)',
            'loginId|+1': '@sNo',
            loginPwd: md5(123456),
            address: '@city(true)',
            native:'汉族',
            name: '@cname',
            birthday:'@date()',
            "sex|1-2": false,
            mobile: /1\d{10}/,
            position: 'student',
            TeacherId: '@integer(1,100)',
            ClassId: '@integer(1,60)',
            MajorId: '@integer(1,19)',
            CollegeId: '@integer(1,8)',
            SchoolId: 1,
        }
    ]
}).datas;
const Student = require('../models/Student')
Student.bulkCreate(result);
module.exports = result;