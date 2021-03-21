const sequelize = require('./database')
const { DataTypes } = require('sequelize');
const College = sequelize.define(
    "College",
    {
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        personNum:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        info:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        SchoolId:{
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
module.exports = College;