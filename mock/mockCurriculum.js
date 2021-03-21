const Mock = require('mockjs')
function retOne(a,b){
    return Math.round(Math.random(a,b))
}
function fraction(){//分数
    const count = retOne(0,1);
    if(count === 0){
        return 4;
    }else{
        return 6;
    }
}

const currList = [
    '计算机基础','大学英语','中国近现代史纲要','生物化学实验','概率论与数理统计','高等数学','体育','思想道德修养与法律基础',
    '分析化学实验','分析化学','大学物理','程序设计基础','毛泽东思想和中国特色社会主义理论体系概论上','大学物理实验',
    '毛泽东思想和中国特色社会主义理论体系概论下','计算机网络','企业管理数学','马克思主义基本原理概论','儒家经典与智慧',
    '心理案例分析','形势与政策','学科专业前沿知识及职业导航','大学生就业指导','现代科技概论与知识产权',
    '无机化学实验','艺术概论','无机化学','有机化学','食品工厂设计','食品调香技术','食品生物技术',
    '糖果巧克力加工食品工艺学','农产品加工工艺学食品工艺学','食品科学与工程中的计算机应用','焙烤食品工艺学食品工艺学',
    '乳品工艺学食品工艺学','食品机械与设备','食品安全与品质控制','语食品分析与实验文','','微生物学实验',
    '食品工程原理','生物化学','数科技文献检索学','电工学','线性代数','物理化学实验','物理化学'
];
const result = Mock.mock({
    "datas|48":[//设定有48门课程
        {
            "id|+1": 1,
            'name|+1': currList,
            credit: fraction,
            TeacherId: '@integer(1,100)',
            MajorId: '@integer(1,19)',
        }
    ]
}).datas;

const Curriculum = require('../models/Curriculum')
Curriculum.bulkCreate(result);
module.exports = result;