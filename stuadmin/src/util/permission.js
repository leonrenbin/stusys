//根据用户权限进行路由拦截
const rolesRoute = {
    admin:[
        {name: 'Admin'},
        {name: 'StuStatus'},
        {name: 'Performance'},
        {name: 'AddStatus'},
        {name: 'PublishInfo'},
    ],
    teacher:[
        {name: 'TeacherMine'},
        {name: 'Class_manage'},
        {name: 'ViewAchievement'},
        {name: 'Teacher'}
    ],
    student:[
        {name: 'studentMine'},
        {name: 'Achieve'},
        {name: 'Credit'},
        {name: 'AchieveRank'},
        {name: 'Student'}
    ]
}

export default function menuRoutes(role, routes){
    const allowMenuRoute = rolesRoute[role].map(item => item.name);
    const resultRoute = routes.filter(r => {
        if(allowMenuRoute.indexOf(r.name) !== -1){
            const { children } = r;
            r.children = children.filter(c => allowMenuRoute.indexOf(c.name) !== -1);
            return true;
        }
        return false;
    })
    return resultRoute;
}