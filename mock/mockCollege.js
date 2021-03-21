const Mock = require('mockjs')
const collegeList = [
    '文学与新闻传播学院','建筑工程学院','管理学院',
    '法学院','教育与艺术学院','大数据与信息工程学院','马克思主义学院',
    '基础教育学院',
];

const result = Mock.mock({
    "datas|8":[//设定有8个部门
        {
            'id|+1': 1,
            'name|+1': collegeList,
            SchoolId: 1,
            personNum: '',
            'info|+1':'@name 随机生成学院/部门的文本: @csentence(40,50)',//随机生成一段中文字符
        }
    ]
}).datas;

const College = require('../models/College')
College.bulkCreate(result);
module.exports = result;