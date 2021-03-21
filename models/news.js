const sequelize = require('./database')
const { DataTypes } = require('sequelize')

function reg(i){
    return i = i < 10 ? '0' + i : i;
}

const News = sequelize.define(
    "News",
    {
        title:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        content:{
            type: DataTypes.STRING(10000),
            allowNull: true,
        },
        date:{
            type: DataTypes.DATE,
            allowNull: true,
            get(){
                const time = this.getDataValue("date");//this是模型定义的对象
                if(time){
                    return `${time.getFullYear()}-${reg(time.getMonth())}-${reg(time.getDate())}`
                }
                else return undefined;
            }
        },
    },
    {
        createdAt: false,
        updatedAt: false,
        paranoid: false,//会真正的删除数据
    }
)

module.exports = News;