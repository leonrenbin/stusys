import * as loginServ from "../service/loginService"

export default{
    namespaced: true,
    state:{
        data: null,
        isLoading: false,
    },
    mutations:{
        setData(state, payload){
            state.data = payload;
        },
        setIsLoading(state,payload){
            state.isLoading = payload;
        }
    },
    actions:{//副作用操作
        async login({commit}, {loginId, loginPwd}){
            commit('setIsLoading', true)
            const resp = await loginServ.login(loginId, loginPwd)
            commit('setData',resp.data);
            commit('setIsLoading', false)
            return resp.data;
        },
        async loginOut({commit}){
            commit('setData', null);
            loginServ.loginOut();
        },
        async whoAmI({commit}){
            commit('setIsLoading', true);
            try{
                const resp = await loginServ.whoami();
                commit('setData',resp.data);
            }catch{
                commit('setData',null);
            }
            commit('setIsLoading', false)
        }
    },
}