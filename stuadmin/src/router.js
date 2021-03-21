import Vue from 'vue'
import vueRouter from 'vue-router'
import store from './store'
import getMenuRouters from './util/permission'
import Home from './views/Home.vue'
vueRouter.prototype.back = false;
vueRouter.prototype.goBack = function goBack(){
    this.back = true;
    this.go(-1);
}

Vue.use(vueRouter);

const originalPush = vueRouter.prototype.push//防止路由重复
vueRouter.prototype.push = function(location){
    return originalPush.call(this, location).catch(err => err)
}

const admin = [//管理员
    {
        path:'/admin',
        name: 'Admin',
        component: Home,
        meta:{
            role: 'admin',
            title: '管理员',
            hidden: false,
        },
        children:[
            {
                path: '/stuStatus',
                name: 'StuStatus',
                meta:{
                    title: '所有学生',
                    hidden: false,
                },
                component: () => import('./components/admin/stu_status.vue'),
            },
            {
                path: '/performance',
                name: 'Performance',
                meta:{
                    title: '成绩管理',
                    hidden: false,
                },
                component: () => import('./components/admin/Performance_manage'),
            },
            {
                path: '/publishInfo',
                name: 'PublishInfo',
                meta:{
                    title: '公布信息',
                    hidden: false,
                },
                component: () => import('./components/admin/publish_info'),
            },
            {
                path: '/addStatus',
                name: 'AddStatus',
                meta:{
                    title: '新增学生',
                    hidden: false,
                },
                component: () => import('./components/admin/AddStatus.vue'),
            },
        ]
    },  
];

const student = [//学生
    {
        path:'/student',
        name: 'Student',
        meta:{
            role: 'student',
            title: '学生',
            hidden: false,
        },
        component: Home,
        children:[
            {
                path: '/student',
                name: 'studentMine',
                meta:{
                    title: '我的',
                    hidden: true,
                },
                component: ()=>import('./components/container/My.vue'),
            },
            {
                path: '/achieve',
                name: 'Achieve',
                meta:{
                    title: '查询成绩',
                    hidden: false,
                },
                component: () => import('./components/student/achievement.vue'),
            },
            {
                path: '/credit',
                name: 'Credit',
                meta:{
                    title: '查询学分',
                    hidden: true,
                },
                component: () => import('./components/student/credit.vue'),
            },
            {
                path: '/achieveRank',
                name: 'AchieveRank',
                meta:{
                    title: '成绩排名',
                    hidden: true,
                },
                component: () => import('./components/student/achieveRank.vue'),
            },
        ]
    },
];

const teacher = [//老师
    {
        path: '/teacher',
        name: 'Teacher',
        meta:{
            role: 'teacher',
            title: '教师',
            hidden: false,
        },
        component: Home,
        children:[
            {
                path: '/teacher',
                name: 'TeacherMine',
                meta:{
                    title: '我的',
                    hidden: true,
                },
                component: ()=> import('./components/container/My.vue'),
            },
            {
                path: '/class_manage',
                name: 'Class_manage',
                meta:{
                    title: '班级管理',
                    hidden: false,
                },
                component: () => import('./components/teachar/class_manage.vue')
            },
            {
                path: '/viewAchievement',
                name: 'ViewAchievement',
                meta:{
                    title: '查询成绩',
                    hidden: false,
                },
                component: () => import('./components/teachar/viewAchievement.vue')
            },
        ]
    },
]

const routes = [
    //重定向
    {
        path: '/',
        redirect: {
            name: 'Index'
        },
        meta:{
            hidden: true,
        },
        
    },
    //主页
    {
        path: '/home',
        name: 'home',
        component: Home,
        redirect: {
            name: 'Index'
        },
        meta:{
            title: '首页',
            hidden: false,
            role: 'all',
        },
        children:[
            {
                path: '/index',
                name: 'Index',
                component: () => import('./views/page/main/index.vue'),
                meta:{
                    title: '校园广场',
                    hidden: false,
                }
            },
            {
                path: '/newsWrap',
                name: 'NewsWrap',
                component: () => import('./components/news/newsWrap.vue'),
                meta:{
                    hidden: true,
                    title: '校园新闻',
                },
            },
            {
                path: '/personalinfo',
                name: 'Personalinfo',
                meta:{
                    title: '查看个人',
                    hidden: true,
                },
                component: () => import('./components/container/personalInfo.vue'),
            },
        ]
    },
    //登录
    {
        path: '/login',
        name: 'login',
        component: () => import('./views/page/login/loginManage'),
        meta:{
            title: '登录',
            hidden: true,
        }
    },
    //忘记密码
    {
        path: '/forgetpwd',
        name: 'ForgetPwd',
        component: () => import('./views/page/login/forget.vue'),
        meta:{
            title: '忘记密码',
            hidden: true,
        }
    },
];

const createRouter = (routes) => new vueRouter({
    routes,
})
const router = createRouter(routes)

let isAddRouters = false;
let goLogin = false;
let isFirst = false;
router.beforeEach((to, from, next) =>{
    /**
     * 如果是第一次进入系统，系统中localstorage有role，但是cookie中没有role
     * 就会出现问题，因此需要特别判断
     */
    if(!isFirst){
        if(!store.state.user.role){
            localStorage.removeItem('role');
        }
        isFirst = true;
    }
    if(from.path === '/login' && to.path === '/index'){//从登录页离开,到首页
        if(!isAddRouters){
            isAddRouters = true;
            if(store.state.rolesIndex === 0){//admin
               return randerRoute(admin,to,next)
            }else if(store.state.rolesIndex === 1){//student
                return randerRoute(student,to,next)
            }else if(store.state.rolesIndex === 2){//teacher
                return randerRoute(teacher,to,next)
            }else{
                return next('/login');
            }
        }
        return next();
    }
    let getRole = localStorage.getItem("role")
    if(getRole){//如果已经登陆过了
        if(to.path !=='/login'){
            if(!isAddRouters){
                isAddRouters = true;
                if(getRole === 'admin'){//admin
                    return randerRoute(admin,to,next)
                }else if(getRole === 'student'){//student
                    return randerRoute(student,to,next)
                }else if(getRole === 'teacher'){//teacher
                    return randerRoute(teacher,to,next)
                }else{
                    return next('/index');
                }
            }
        }
        if(to.path === '/login'){
            if(!isAddRouters){
                isAddRouters = true;
                if(getRole === 'admin'){//admin
                    return randerRoute(admin,to,next)
                }else if(getRole === 'student'){//student
                    return randerRoute(student,to,next)
                }else if(getRole === 'teacher'){//teacher
                    return randerRoute(teacher,to,next)
                }else{
                    return next('/index');
                }
            }
        }
    }
    if(to.path !== '/login'){//如果没登陆过并且路由不是去登录
        if(!store.state.user.id && !store.state.user.loginId && !store.state.user.role){
            if(!goLogin){
                goLogin = true;
                return next('/login');
            }
        }
        return next()
    }
    return next();
})
async function randerRoute(role,to,next){//渲染路由
    const menuRoutes = getMenuRouters(store.state.user.role, role);
    store.dispatch('changeMenuRoutes',routes.concat(menuRoutes)).then(async () => {
        localStorage.setItem('router', JSON.stringify(menuRoutes));
        // 这里routes路由名称重复添加勒，导致没有添加进去,你需要把之前加入过的路由过滤掉
        // 或者判断一下是不是第一次进到系统当中,第一次进到系统当中的时候设置路由
        await router.addRoutes(menuRoutes);
        router.options.routes = router.options.routes.concat(menuRoutes);
        next({...to, replace: true});
    })
}
export function resetRouter() {
    router.matcher = createRouter(routes).matcher;
}

export default router;
