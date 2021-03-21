import Vue from 'vue'
import Vuex from 'vuex'
import loginUser from './loginUser'

import {setCookie, getUserCookie, removeUserCookie} from '../util/userCookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showSideMenu: false,
    user: getUserCookie(),
    menuRoutes: [],//用于存储路由的菜单
    crunmsRouteTitleKey: '首页',
    crunmsRouteTitleVal: '学生管理系统',
    newsIndex: 0,//当前新闻的索引
    pubIndex: 0,//公告索引
    showPopup: false,
    rolesIndex: null,
    updateStuData: null,//编辑学生，学生的id号
    isAddOrEdit: 0,//判断是新增学生还是修改学生，0是新增，1是修改
    studentId: 0,
    teacherName: '',
    postRole: '',

    semesterIndex: 0,//学期索引
    fract: 0,//学生总成绩
    credit: 0,//学生总学分
    passNum: 0,//不及格门数
    passRate: 0,//通过率
  },
  mutations: {
    setisAddOrEdit(state, isAddOrEdit){
      state.isAddOrEdit = isAddOrEdit;
    },
    setupdateStuData(state,data){
      state.updateStuData = data;
    },
    totalNumber(state, table){//求总分，总学分，通过率，及格率，排名(赞无)
      state.fract = 0;//分数
      state.credit = 0;//学分
      state.passNum = 0;//通过数
      state.passRate = 0;//通过率
      let subject = [];//科目
      let fraction = [];//分数
      let stucredit = [];//学分

      subject.push(table.subject);
      fraction.push(table.fraction);
      stucredit.push(table.credit);

      for(let i=0; i<fraction[0].length; i++){
        if(fraction[0][i].value < 60){//如果某科目分数小于60，学分为0
          stucredit[0][i].value = 0;//处理学分
          state.passNum ++;//不及格门数
        }
      }
      for(let i=0; i<stucredit[0].length; i++){//总学分
        state.credit += stucredit[0][i].value;
      }
      for(let i=0; i<fraction[0].length; i++){//总分数
        fraction[0][i].value = Number(fraction[0][i].value);
        state.fract += fraction[0][i].value;
      }
      state.passRate = Math.round((fraction[0].length - state.passNum ) / fraction[0].length * 100) + '%';
    },
    
    setUserInfo(state, userInfo){
      state.user = userInfo;
    },
    changeMenuRoutes(state, routes){
      state.menuRoutes = routes;
      return state.menuRoutes;
    },
    changeShowSideMenu(state, bool){
      state.showSideMenu = bool;
    },
    setcrunmsRouteTitleKey(state, key){
      state.crunmsRouteTitleKey = key;
    },
    setcrunmsRouteTitleVal(state, val){
      state.crunmsRouteTitleVal = val;
    },
    setNewsIndex(state, index){
      state.newsIndex = index;
    },
    logout(state){
      state.user = {
        id: '',
        loginId: '',
        role: '',
        name: '',
      }
    },
    setshowPopup(state, bool){
      state.showPopup = bool;
    },
    setPubIndex(state, index){
      state.pubIndex = index;
    },
    setsemesterIndex(state, index){//更改学期索引
      state.semesterIndex = index;
    },
    setrolesIndex(state, index){
      state.rolesIndex = index;
    },
    setStudentId(state,index){
      state.studentId = index;
    },
    setTeacherName(state,name){
      state.teacherName = name;
    },
    setPostRole(state, role){
      state.postRole = role;
    }
  },
  actions: {
    setUserInfomation({ commit }, userInfo){
      commit('setUserInfo', userInfo);
      setCookie(userInfo);
    },
    //填充路由
    changeMenuRoutes({ commit }, routes){
     
      return new Promise((resolve) => {
        commit('changeMenuRoutes', routes);
        resolve();
      })
    },
    logout({ commit }){//退出登录
      commit('logout');
      removeUserCookie();
    }
  },
  modules: {
    loginUser,
  }
})
