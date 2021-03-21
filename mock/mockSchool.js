const Mock = require('mockjs')
const introduce = ['学校贯彻党的教育方针，坚持社会主义办学方向，\
秉持“依托优秀资源，延揽优秀教师、培养优秀学生”的理念，\
以“修身、自信、乐学、笃行”为校训，按照“人才培养应用型、\
科研开发支撑型、社会服务区域型”的发展定位，围绕“抓学科建设、\
促教学质量、上科研水平、办高水平应用型大学”的思路，以“…'];
const desc = ['贵州民族大学人文科技学院成立于2001年，是由贵州民族大学申办，经贵州省人民政府批准、\
教育部确认设立的具有独立法人资格的全日制普通本科高等院校。\
学校现有两个校区，花溪校区坐落于山清水秀、被誉为“高原明珠”的\
贵州风景名胜区贵阳市花溪区，大学城校区坐落在产城融合创新、生态文明示范的贵安新区，\
毗邻贵州财经大学、贵州医科…'];
const result = Mock.mock({
    "datas|1":[
        {
            "id|+1": 1,
            name: '某某大学',
            introduce: introduce,
            desc: desc,
            principal: '',
            vice_principal:'',
            stuNum:'',
            teacherNum:'',
        }
    ]
}).datas;
const School = require('../models/School')
School.bulkCreate(result);
module.exports = result;