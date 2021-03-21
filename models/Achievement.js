//成绩表模型
const sequelize = require('./database')
const { DataTypes } = require('sequelize');
const Achievement = sequelize.define(
    "Achievement",
    {
        StudentId:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        计算机基础:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        大学英语:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        中国近现代史纲要:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        生物化学实验:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        概率论与数理统计:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        高等数学:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        体育:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        思想道德修养与法律基础:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        分析化学实验:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        分析化学:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        大学物理:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        程序设计基础:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        毛泽东思想和中国特色社会主义理论体系概论上:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        大学物理实验:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        毛泽东思想和中国特色社会主义理论体系概论下:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        计算机网络:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        企业管理数学:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        马克思主义基本原理概论:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        儒家经典与智慧:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        心理案例分析:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        形势与政策:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        学科专业前沿知识及职业导航:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        大学生就业指导:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        现代市场营销:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        现代科技概论与知识产权:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        无机化学实验:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        艺术概论:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        无机化学:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        有机化学:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        食品工厂设计:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        食品调香技术:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        食品生物技术:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        糖果巧克力加工食品工艺学:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        农产品加工工艺学食品工艺学:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        食品科学与工程中的计算机应用:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        焙烤食品工艺学食品工艺学:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        乳品工艺学食品工艺学:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        食品机械与设备:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        食品安全与品质控制:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        语食品分析与实验文:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        微生物学实验:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        食品工程原理:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        生物化学:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        数科技文献检索学:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        电工学:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        线性代数:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        物理化学实验:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        物理化学:{
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        createdAt: false,
        updatedAt: false,
        paranoid: false,
    }
)
module.exports = Achievement;