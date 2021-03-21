<template>
    <div class="loginManage">
        <div class="login-page">
            <div class="login_page_wrap">
                <base-login 
                    :loginForm="loginForm" 
                    :sNoReg="sNoReg"
                    @isgoRegister="isgoRegister"
                    @handleClick="handleClick"
                    v-if="!goRegister" 
                />
            </div>
        </div>
    </div>
</template>

<script>
import BaseLogin from './login'
import { mapActions,mapState } from 'vuex'
import adminApi from '@/api/admin'
import studentApi from '@/api/student'
import teacherApi from '@/api/teacher'
export default {
    components:{
        BaseLogin,
    },
    data(){
        return{
            goRegister: false,
            loginForm:{
                loginId: '',
                loginPwd: '',
                role: '',
            },
            sNoReg: '',//账号的提示
            cookie:{
                id:'',
                loginId:'',
                role:'',
                name: ''
            }
        }
    },
    computed:{
        ...mapState({
            user: (state) => state.user,
            rolesIndex:(state)=>state.rolesIndex,
        }),
    },
    methods:{
        ...mapActions(['setUserInfomation']),
        isgoRegister(){
            this.goRegister = !this.goRegister;
        },
        async handleClick(loginData){//登录
            this.loginForm = loginData;
            let res;
            if(this.rolesIndex === 0){
                res = await this.handleLogin(adminApi).then(res=>{
                    if(!res) return;
                    this.handleHelper(loginData,res)
                });
            }else if(this.rolesIndex === 1){
                res = await this.handleLogin(studentApi).then(res=>{
                    if(!res) return;
                    this.handleHelper(loginData,res)
                });
            }else if(this.rolesIndex === 2){
                res = await this.handleLogin(teacherApi).then(res=>{
                    if(!res) return;
                    this.handleHelper(loginData,res)
                });
            }
        },
        async handleLogin(apis){
            const res = await apis.login({
                loginId: this.loginForm.loginId,
                loginPwd: this.loginForm.loginPwd,
            })
            if(res){
                this.sNoReg = res.msg;
                return res;
            }
        },
        handleHelper(loginData,res){
            this.cookie.role = loginData.role;
            this.cookie.loginId = res.loginId;
            this.cookie.id = res.id;
            this.cookie.name = res.name;
            this.$store.dispatch('setUserInfomation',this.cookie)
            localStorage.setItem('role',this.cookie.role);
            localStorage.setItem('local',false);
            setTimeout(() => {
                this.$router.push({
                    name: 'home',
                });
            }, 100);
        },
    }
}
</script>

<style lang="less">
    .loginManage{
        width: 100%;
        height: 100%;
        .login-page{
            position: relative;
            width: 100%;
            height: 100%;
            background-image: url('../../../assets/img/background.jpg');
            background-repeat: no-repeat;
            background-clip:content-box;
            background-position: top;
            background-size: cover;
            background-attachment: fixed;
            .login_page_wrap{
                background-color: #f9f9f9;
                width: 500px;
                padding-bottom: 50px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                border-radius: 4px;
                .login_button{
                    position: absolute;
                    left: 0px;
                    bottom: 20px;
                    display: flex;
                    width: 100%;
                    text-align: center;
                    justify-content: space-evenly;
                    button{
                        border: none;
                        color: #ffffff;
                        background-color: #00a1d6;
                        padding: 5px 18px;
                        border-radius: 4px;
                        font-size: 14px;
                        cursor: pointer;
                        transition-duration: .2s;
                        &.goRegister{
                            background-color: #f1f1f1;
                            color: #111;
                            &:hover{
                                // color: #fff;
                                background-color: #e1e1e1;
                            }
                        }
                        &.handleLogin{
                            &:hover{
                                background-color: #00b2d0;
                            }
                        }
                    }
                }
            }
        }
    }
</style>