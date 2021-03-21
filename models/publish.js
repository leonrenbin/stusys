const sequelize = require('./database')
const { DataTypes } = require('sequelize')
const publish = sequelize.define(
    "publish",
    {
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        content:{
            type: DataTypes.STRING(5000),
            allowNull: false,
        },
        year:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        month:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        day:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        createdAt: false,
        updatedAt: false,
        paranoid: false,//会真正的删除数据
    }
)
module.exports = publish;