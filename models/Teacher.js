const sequelize = require('./database')
const { DataTypes } = require('sequelize');

function reg(i){
    return i = i < 10 ? '0' + i : i;
}

const Teacher = sequelize.define(
    "Teacher",
    {
        tNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        loginId:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        loginPwd:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthday:{
            type: DataTypes.DATE,
            allowNull: false,
            get(){
                const birth = this.getDataValue("birthday");//this是模型定义的对象
                if(birth){
                    return `${birth.getFullYear()}-${reg(birth.getMonth())}-${reg(birth.getDate())}`
                }
                else return undefined;
            }
        },
        sex:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        address:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        mobile:{
            type: DataTypes.STRING(11),
            allowNull: false,
        },
        CollegeId:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        position:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        SchoolId:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        ClassId:{
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

module.exports = Teacher;