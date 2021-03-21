const sequelize = require('./database')
const { DataTypes } = require('sequelize')

const Admin = sequelize.define(
    "Admin",
    {
        loginId:{
            type: DataTypes.STRING,
            allowNull: false,//允许为null吗
        },
        loginPwd:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        createdAt: false,
        updatedAt: false,
        paranoid: false,//会真正的删除数据
    }
)

module.exports = Admin;