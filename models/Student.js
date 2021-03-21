const sequelize = require('./database')
const { DataTypes } = require('sequelize');
function reg(i){
    return i = i < 10 ? '0' + i : i;
}
const Student = sequelize.define(
    "Student",
    {
        sNo:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        loginId:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        loginPwd: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        native:{//民族
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
        mobile:{
            type: DataTypes.STRING(11),
            allowNull: false,
        },
        position:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        TeacherId:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        ClassId:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        MajorId:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        CollegeId:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        SchoolId:{
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
module.exports = Student;

