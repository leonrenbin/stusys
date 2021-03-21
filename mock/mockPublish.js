const Mock = require('mockjs')
const data = [
    {
        title: '学生平台操作手册',
        paragraph:'亲爱的同学们：\
为了使同学们快速掌握在线平台的使用方法和操作步骤；\
请点击 高校邦学生操作指南或复制链接地址到浏览器中打开学习\
链接地址：http://gxb-file.gaoxiaobang.com/学生使用手册.pdf\
加入我们，一起学起来！'
        ,
        id: 0,
        day: '05',
        month: '2020.02',
        time: Math.floor(Math.random() * 100000000),
    },
    {
        title: '寒假安排',
        paragraph: '经学校规定，2020-2021秋季假期安排时间为：\
2020年12月27日~2021年2月21日，学校将在1月3日之前关闭宿舍，\
学生必须在此之前办理学校，假期期间不可提前返校,一旦发现提前\
返校者，按照学校相关规定给予处罚，请相互告之。最后，祝大家假期过得愉快',
        id: 1,
        day: '01',
        month: '2021.01',
        time: Math.floor(Math.random() * 100000000),
    },
    {
        title: '疫情防控，你我有责',
        paragraph: '2020年11月01日~2021年01月01日期间，凡是有到过省外的同学，\
请主动和辅导员联系，登记相关信息。年关将近，防控越来越严，希望\
同学们能够遵守校规，不要到疫情高风险地区去，以较少不必要的麻烦。',
        id: 1,
        day: '06',
        month: '2021.01',
        time: Math.floor(Math.random() * 100000000),
    },
    {
        title: '24365全国化学化工行业高校毕业生专场招聘会',
        paragraph: '为促进高校毕业生与化学化工行业用人单位供需对接，引导高校毕业生面向化学化工行业就业，\
教育部“24365校园招聘服务”推出全国化学化工行业高校毕业生专场招聘会。\
本次活动由教育部高校学生司指导，全国高等学校学生信息咨询与就\
业指导中心主办，北京化工大学、浙江大学、天津大学等18所高校承办，\
中国石油和化学工业联合会、中国人才交流协会支持。活动采取线上模式，\
举办时间为1月5日至2月4日。大家积极参加哦',
        id: 1,
        day: '06',
        month: '2021.01',
        time: Math.floor(Math.random() * 100000000),
    },
    {
        title: '贵州世纪恒通有限公司',
        paragraph: '招聘岗位：\
微信审核员（20名） \
岗位：审核需要办理微信公众号的企业的相关资料。\
任职要求：\
1.大专以上学历，普通话流利，能熟练使用Office办公软件；\
2.具有严谨的工作态度，踏实负责，有良好的心理承受能力；\
3.计算机、文史、经管、法学、刑侦专业优先录取。\
工作时间：9:00–17:30，周末双休\
薪资待遇：转正综合薪资3000+\
福利待遇：中餐补贴、提供住宿、免费交通车、五险一金\
工作地点：贵阳市白云区科教街188号世纪恒通信息产业园大楼\
简历投递(PDF格式）:\
1753804630@qq.com \
\
简历投递截止时间:\
2020年12月24日（周四）中午12:00',
        id: 1,
        day: '06',
        month: '2021.01',
        time: Math.floor(Math.random() * 100000000),
    },
    {
        title: '通知',
        paragraph: '12月19日北京市朝阳区酒仙桥街道汉庭酒店大山子店（包括底商）\
调为中风险地区。请排查一下学生是否有相关行程，明天中午11点半前报一下情况。\
有的话私信我。',
        id: 1,
        day: '06',
        month: '2021.01',
        time: Math.floor(Math.random() * 100000000),
    },
    {
        title: '全国普通高等学校毕业生就业协议书',
        paragraph: '1、就业协议必须由本人自己领取，不可以带领，就业协议书只有一份，请同学们找工作的时候慎重选择。\
2、假期找到工作的同学，需要签就业协议的随时和我联系。\
3、一定要按照就业协议书填写规范填写，不明白的地方随时沟通。',
        id: 1,
        day: '06',
        month: '2021.01',
        time: Math.floor(Math.random() * 100000000),
    },
]

const result = Mock.mock({
    "datas|7":[
        {
            'id|+1':1,
            'title|+1': data.map(item=> item.title),
            'content|+1': data.map(item=> item.paragraph),
            year: '@integer(2020,2021)',
            month: '@integer(1,12)',
            day: '@integer(1,28)',
        }
    ]
}).datas;

const publish = require('../models/publish')
publish.bulkCreate(result);
module.exports = result;