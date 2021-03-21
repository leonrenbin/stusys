<template>
    <div class="login">
        <form>
            <label for="user-name">
                <span>学号: </span>
                <i class="icon user_avatar"></i>
                <input 
                    type="text" 
                    id="user-name"
                    ref="loginId"
                    autocomplete="off"
                    v-model="loginData.loginId"
                    :placeholder="placeHolder[nowIndex]"
                >
                <span class="regExp">{{ remind }}</span>
            </label>
            <label for="user-pswd">
                <span>密码: </span>
                <i class="icon user_pswd_icon"></i>
                <input 
                    type="password" 
                    id="user-pswd"
                    v-model="loginData.loginPwd"
                    v-if="!inVisible"
                >
                <input 
                    type="text" 
                    id="user-pswd"
                    v-if="inVisible"
                    v-model="loginData.loginPwd"
                >
                <span class="regExp" v-if="correct">账号或密码不正确</span>
                <div 
                    class="pwdVisible"
                    :class="{
                        'cansee': !inVisible,
                        'noCansee': inVisible,
                    }"
                    @click="changeInVisible"
                ></div>
            </label>
            <ul class="chooseRole">
                <span class="role">身份:</span>
                <li 
                    v-for="(r,i) in roleArr" 
                    :key="r"
                    @click="chooseRole(i)"
                    :class="{
                        'active': i === nowIndex
                    }"
                >
                    <i :class="{'active': i === nowIndex}"></i>
                    <span>{{ r }}</span>
                </li>
                <span class="reg" v-if="isShowRoleReg">请选择身份登录</span>
            </ul>
            <div class="forget_pwd">
                <router-link to="/forgetpwd">忘记密码</router-link>
            </div>
            <div class="login_button">
                <button 
                    class="handleLogin"
                    @click="goLogin"
                >登录</button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
    props: ['loginForm','sNoReg'],
    data(){
        return{
            inVisible: false,//密码可见
            goRegister: true,//去注册
            correct: false,//检查密码是否一致
            roleArr:['管理员','学生','老师'],
            isShowRoleReg: false, //身份选择提醒
            remind: '',//提醒
            timer: null, //计时器
            placeHolder:['管理员账号','学号','老师账号'],
        }
    },
    computed:{
        ...mapState({
            user: (state) => state.user,
            nowIndex: (state) => state.rolesIndex,
        }),
        loginData(){
            return this.loginForm
        }
    },
    mounted(){
        this.$refs.loginId.focus();
    },
    methods:{
        ...mapMutations(['setrolesIndex']),
        chooseRole(i){
            this.setrolesIndex(i);
        },
        checksNo(value){//检查学号的书写规范
            let regSno = /^[0-9](\d{5})+$/;
            if(!regSno.test(value)){
                setTimeout(() => {
                    this.remind = this.sNoReg;
                    return false;
                }, 0);
                setTimeout(() => {
                    this.remind = null
                }, 1600);
            }else{
                return true;
            }
        },
        changeInVisible(){//密码可见
            this.inVisible = !this.inVisible;
        },
        RoleReg(){//显示权限提示
            if(this.role === null) {
                this.timer = setTimeout(() => {
                    this.isShowRoleReg = true;
                }, 0);
                setTimeout(() => {
                    this.isShowRoleReg = false;
                    clearTimeout(this.timer);
                    this.timer = null;
                }, 2000);
                return;
            };
        },
        goLogin(){//登陆->提交给父组件登录
            if(!this.loginData.loginId || !this.loginData.loginPwd) return;//若没有填写账号密码
            this.checksNo();
            if(this.nowIndex === 0){//admin
                this.loginData.role = 'admin';
                this.setrolesIndex(this.nowIndex);
                this.$emit('handleClick',this.loginData);
            }
            if(this.nowIndex === 1){//student
                this.loginData.role = 'student';
                this.setrolesIndex(this.nowIndex);
                this.$emit('handleClick',this.loginData);
            }
            if(this.nowIndex === 2){//teacher
                this.loginData.role = 'teacher';
                this.setrolesIndex(this.nowIndex);
                this.$emit('handleClick',this.loginData);
            }
        },
        
    },
}
</script>

<style lang="less">
    .login{
        width: 100%;
        form{
            width: 100%;
            height: 100%;
            padding: 40px 20px 20px 20px;
            box-sizing: border-box;
            label{
                display: flex;
                align-items: center;
                margin-bottom: 30px;
                position: relative;
                span{
                    // color: #fff;
                    margin-right: 10px;
                }
                .icon{
                    position: absolute;
                    display: block;
                    width: 14px;
                    height: 14px;
                    left: 50px;
                    top: 5px;
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    &.user_avatar{
                        background-image: url('../../../assets/css/login-user.png');
                    }
                    &.user_pswd_icon{
                        background-image: url('../../../assets/css/login-pswd.png');
                    }
                }
                input{
                    width: 90%;
                    border: none;
                    color: #555;
                    padding: 3px 0;
                    font-size: 16px;
                    border-radius: 4px;
                    line-height: 1.6rem;
                    padding-left: 25px;
                    box-sizing: border-box;
                    border: 1px solid #ccc;
                    &::-webkit-outer-spin-button,//去掉input框number的上下箭头
                    &::-webkit-inner-spin-button{
                        -webkit-appearance: none !important;
                    }
                }
                .regExp{
                    position:absolute;
                    right: 0;
                    top: 33px;
                    font-size: 0.5rem;
                    color: #f00;
                }
                .pwdVisible{
                    position: absolute;
                    cursor: pointer;
                    right: 10px;
                    top: 10px;
                    width: 14px;
                    height: 12px;
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    &.cansee{
                        background-image: url('../../../assets/css/invisible.png');
                    }
                    &.noCansee{
                        background-image: url('../../../assets/css/visible.png');
                    }
                }
            }
            .chooseRole{
                width: 100%;
                padding: 6px 0px;
                display: flex;
                margin-bottom: 30px;
                position: relative;
                .role{
                    margin-right: 10px;
                }
                li{
                    margin-left: 30px;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    &.active{
                        color: #00a1d6;
                        font-weight: bold;
                    }
                    i{
                        display: block;
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        border: 2px solid #888;
                        margin-right: 7px;
                        position: relative;
                        &.active{
                            &::before{
                                content: '';
                                position: absolute;
                                width: 4px;
                                height: 4px;
                                border-radius: 50%;
                                left: 50%;
                                top: 50%;
                                transform: translate(-50%, -50%);
                                background-color: #888;
                            }
                        }
                    }
                }
                .reg{
                    font-size: 0.5rem;
                    color: #f00;
                    position: absolute;
                    left: 80px;
                    top: 28px;
                }
            }
            .forget_pwd{
                width: 100%;
                box-sizing: border-box;
                text-align: right;
                padding-right: 0px;
                margin-bottom: 30px;
                a{
                    color: #222;
                    display: inline-block;
                    line-height: 20px;
                    text-decoration: none;
                    font-size: 14px;
                    border: 1px solid #ccc;
                    cursor: pointer;
                    padding: 2px 20px;
                    border-radius: 4px;
                    transition-duration: .5s;
                    &:hover{
                        background-color: #c1c1c1;
                    }
                }
            }
        }
    }
</style>