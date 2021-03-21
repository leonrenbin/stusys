const Mock = require('mockjs')
function retOne(a,b){
    return Math.round(Math.random(a,b))
}
function getRan(min,max){
    return Math.floor(Math.random() * (max-min) + min);
}
function fraction(){//分数
    const count = retOne(0,1);
    if(count === 0){
        return 0;
    }else{
        return getRan(20, 100);
    }
}

const result = Mock.mock({
    "datas|3000":[
        {
            "StudentId|+1": 1,
            计算机基础: fraction,
            大学英语:fraction,
            中国近现代史纲要:fraction,
            生物化学实验:fraction,
            概率论与数理统计:fraction,
            高等数学:fraction,
            体育:fraction,
            思想道德修养与法律基础:fraction,
            分析化学实验:fraction,
            分析化学:fraction,
            大学物理:fraction,
            程序设计基础:fraction,
            毛泽东思想和中国特色社会主义理论体系概论上:fraction,
            大学物理实验:fraction,
            毛泽东思想和中国特色社会主义理论体系概论下:fraction,
            计算机网络:fraction,
            企业管理数学:fraction,
            马克思主义基本原理概论:fraction,
            儒家经典与智慧:fraction,
            心理案例分析:fraction,
            形势与政策:fraction,
            学科专业前沿知识及职业导航:fraction,
            大学生就业指导:fraction,
            现代市场营销:fraction,
            现代科技概论与知识产权:fraction,
            无机化学实验:fraction,
            艺术概论:fraction,
            无机化学:fraction,
            有机化学:fraction,
            食品工厂设计:fraction,
            食品调香技术:fraction,
            食品生物技术:fraction,
            糖果巧克力加工食品工艺学:fraction,
            农产品加工工艺学食品工艺学:fraction,
            食品科学与工程中的计算机应用:fraction,
            焙烤食品工艺学食品工艺学:fraction,
            乳品工艺学食品工艺学:fraction,
            食品机械与设备:fraction,
            食品安全与品质控制:fraction,
            语食品分析与实验文:fraction,
            微生物学实验:fraction,
            食品工程原理:fraction,
            生物化学:fraction,
            数科技文献检索学:fraction,
            电工学:fraction,
            线性代数:fraction,
            物理化学实验:fraction,
            物理化学:fraction,
        }
    ]
}).datas;

const Achievement = require('../models/Achievement')
Achievement.bulkCreate(result);
module.exports = result;