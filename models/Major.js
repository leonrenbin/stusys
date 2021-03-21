const sequelize = require('./database')
const { DataTypes } = require('sequelize');

const Major = sequelize.define(
    "Major",
    {
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        stuNumber:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        CollegeId:{
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

module.exports = Major;