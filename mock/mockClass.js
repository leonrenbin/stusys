const Mock = require('mockjs')
const majorList = [
    '汉语言文学','英语','学前教育','工程管理','土木工程','工程造价','市场营销',
    '旅游管理','行政管理','法学','音乐学','体育教育',
    '美术学','计算机科学与技术','物联网工程','信息管理与信息系统',
    '思想政治教研室','大学英语教研室','大学语文教研室'
];
const result = Mock.mock({
    "datas|60":[//设定有60个班级
        {
            "id|+1": 1,
            'name|+1': majorList,
            openDate:`@integer(2017,2021)-@integer(1,12)-@integer(1,29)`,
            stuNumber: '',
            CollegeId: '',
        }
    ]
}).datas;

const Class = require('../models/Class')
Class.bulkCreate(result);
module.exports = result;