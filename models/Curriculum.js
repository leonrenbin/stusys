//课程表模型
const sequelize = require('./database')
const { DataTypes } = require('sequelize');

const Curriculum = sequelize.define(
    "Curriculum",
    {
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        credit:{//学分
            type: DataTypes.STRING,
            allowNull: false,
        },
        TeacherId:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        MajorId:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        createdAt: false,
        updatedAt: false,
        paranoid: false,
    }
)
module.exports = Curriculum;