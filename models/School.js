const sequelize = require('./database')
const { DataTypes } = require('sequelize');
const School = sequelize.define(
    "School",
    {
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        schIntroduce:{
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        describe: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        principal:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        stuNum:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        teacherNum:{
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        createdAt: false,
        updatedAt: false,
        paranoid: false,//会真正的删除数据
    }
)
module.exports = School;

