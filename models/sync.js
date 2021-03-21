// require('./Admin')
// require('./Student')
// require('./Teacher')
// require('./Class')
// require('./College')
// require('./Curriculum')
require('./Major')
// require('./School')
// require('./Achievement')
// require('./news')
// require('./publish')

const sequelize = require('./database')
sequelize.sync({alter: true}).then(()=>{
    console.log('所有模型同步完成==============================');
})