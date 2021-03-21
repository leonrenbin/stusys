const sequelize = require('./database')
const { DataTypes } = require('sequelize')

const Class = sequelize.define(
    "Class",
    {
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        openDate:{
            type: DataTypes.DATE,
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

module.exports = Class;




