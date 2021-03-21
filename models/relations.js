//设置关系模型
/**
 * 学生、老师、课程表、班级表、成绩表、时间表、学院表、专业表
 */

const Student = require('./Student')
const achievement = require('./Achievement')
const Class = require('./Class')
const college = require('./College')
const curriculum = require('./Curriculum')
const major = require('./Major')
const Teacher = require('./Teacher')
const College = require('./College')
const School = require('./School')

Teacher.belongsTo(college)
Teacher.belongsTo(Class)
Teacher.belongsTo(School)
college.hasMany(Teacher)

Class.hasMany(Student)
Student.belongsTo(Teacher)
Student.belongsTo(major)
Student.belongsTo(Class)
Student.belongsTo(College)
Student.belongsTo(Class)
Student.belongsTo(School)
Teacher.hasMany(Student)
Student.hasOne(achievement)
achievement.belongsTo(Student)

curriculum.belongsTo(major)
curriculum.belongsTo(Teacher)
major.hasMany(curriculum)

Class.belongsTo(college)
Class.belongsTo(major)
major.hasMany(Class)

major.belongsTo(college);
college.belongsTo(School);
college.hasMany(major)

