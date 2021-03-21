const sequelize = require('./database')
const { DataTypes } = require('sequelize');
const Upload = sequelize.define(
    "Upload",
    {
        name:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        url:{
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
module.exports = Upload;
