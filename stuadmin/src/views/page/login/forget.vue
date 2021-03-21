<template>
  <div class="forgetPwd">
      <div class="forget_wrap">
          <form>
              <div class="accountNum">
                  <input type="text" 
                    placeholder="请输入登录id"
                    v-model="loginForm.loginId"
                  >
                  <div v-if="isAccountExist" class="errorMsg">该账户不存在</div>
              </div>
              <div class="pwd_box">
                  <input type="text" 
                    placeholder="请输入验证码"
                    v-model="loginForm.code"
                >
                  <span class="code" @click="changeCode">
                      <p v-if="!vCode" class="tip">点击获取验证码</p>
                  </span>
                  <div v-if="isCodeCorrect" class="errorMsg">验证码错误</div>
              </div>
              <div class="new_pwd">
                  <input type="password" 
                    v-if="pwdLock" 
                    class="password" 
                    placeholder="请输入新密码"
                    v-model="loginForm.loginPwd"
                >
                  <input type="text" 
                    v-else 
                    class="password" 
                    placeholder="请输入新密码"
                    v-model="loginForm.loginPwd"
                >
                  <div class="icon" :class="{'show': pwdLock}" @click="changePwdlock"></div>
                  <div v-if="isPwdCorrent" class="errorMsg">密码格式不正确</div>
              </div>
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
              <div class="btn_box">
                  <button @click="handleClick">确认</button>
                  <button @click="$router.goBack()">取消</button>
              </div>
          </form>
      </div>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
import adminapi from '@/api/admin'
import stuapi from '@/api/student'
import teacherapi from '@/api/teacher'
import rApi from '@/api/other'
export default {
    data(){
        return{
            vCode: '',
            pwdLock: false,
            loginForm:{
                loginId: '',
                loginPwd: '',
                code: '',
            },
            isAccountExist: false,
            isCodeCorrect: false,
            isPwdCorrent: false,
            isShowRoleReg: false, //身份选择提醒
            roleArr:['管理员','学生','老师'],
        }
    },
    computed:{
        ...mapState({
            user: (state) => state.user,
            nowIndex: (state) => state.rolesIndex,
        }),
    },
    methods:{
        ...mapMutations(['setrolesIndex']),
        chooseRole(i){
            this.setrolesIndex(i);
        },
        changePwdlock(){
            this.pwdLock = !this.pwdLock;
        },
        async changeCode(){
            if(!this.loginForm.loginId) return;
            await rApi.getCode({
                params:{
                    loginId: this.loginForm.loginId
                }
            }).then(res=>{
                const codeDom = document.querySelector('.pwd_box span.code')
                codeDom.innerHTML = '';
                const html = document.createElement('p')
                html.innerHTML = res.data;
                codeDom.appendChild(html)
            })
        },
        checkUsername(){
            if(!this.loginForm.loginId) return;
            let regUser = /^[\u4e00-\u9fa5A-Za-z]+$/;
            if(!regUser.test(this.loginForm.loginId)){//如果用户id书写格式不正确
                this.isAccountExist = true;
                return false;
            }return true;
        },
        checkPwd(){
            if(!this.loginForm.loginPwd) return;
            let regUser = /^[0-9A-Za-z]+$/;
            if(!regUser.test(this.loginForm.loginPwd)){//如果用户pwd书写格式不正确
                this.isPwdCorrent = true;
                return false;
            }return true;
        },
        async handleClick(){//确认
            let username = this.checkUsername();
            if(!username) return;
            let pwd = this.checkPwd();
            if(!pwd) return;
            if(!this.vCode || this.loginForm.code != this.vCode){
                this.isCodeCorrect = true;
                setTimeout(() => {
                    this.isCodeCorrect = false;
                }, 2000);
                return;
            };
            
            if(this.nowIndex === 0){
                await adminapi.getAdminByLoginId({
                    params:{
                        loginId: this.loginForm.loginId,
                    }
                }).then(res=>{
                    adminapi.updateAdmin({
                        id: res.id,
                        loginPwd: this.loginForm.loginPwd,
                    }).then(res=>{
                        if(res.length){
                            this.$router.goBack()
                        }
                    })
                })
            }
            if(this.nowIndex === 1){
                await stuapi.getbysno({
                    params:{
                        sNo: this.loginForm.loginId,
                    }
                }).then(res=>{
                    stuapi.updateStudent({
                        id: res.id,
                        loginPwd: this.loginForm.loginPwd,
                    }).then(res=>{
                        if(res.length){
                            this.$router.goBack()
                        }
                    })
                })
            }
            if(this.nowIndex === 2){
                await teacherapi.getbyLoginId({
                    params:{
                        loginId: this.loginForm.loginId,
                    }
                }).then(res=>{
                    teacherapi.updateTeacher({
                        id: res.id,
                        loginPwd: this.loginForm.loginPwd,
                    }).then(res=>{
                        if(res.length){
                            this.$router.goBack()
                        }
                    })
                })
            }
        },
    },
}
</script>

<style lang="less">
    .forgetPwd{
        width: 100%;
        height: 100%;
        background-image: url('../../../assets/img/background.jpg');
        background-repeat: no-repeat;
        background-clip:content-box;
        background-position: top;
        background-size: cover;
        background-attachment: fixed;
        input{
            font-size: 16px;
            color: #666;
        }
        .forget_wrap{
            width: 100%;
            height: 100%;
            position: relative;
            form{
                width: 500px;
                padding: 20px;
                position: absolute;
                left: 50%;
                top: 50%;
                background-color: #fff;
                transform: translate(-50%, -50%);
                border-radius: 4px;
                input{
                    border: none;
                    border: 1px solid #ccc;
                    line-height: 40px;
                    padding-left: 15px;
                    box-sizing: border-box;
                    letter-spacing: 1px;
                    border-radius: 4px;
                }
                .accountNum{
                    margin-bottom: 20px;
                    width: 100%;
                    position: relative;
                    input{
                        width: 90%;
                    }
                    .errorMsg{
                        position: absolute;
                        left: 0px;
                        top: 33px;
                        font-size: 0.5rem;
                        color: #f00;
                    }
                }
                .pwd_box{
                    display: flex;
                    margin-bottom: 20px;
                    position: relative;
                    input{
                        width: 70%;
                    }
                    span.code{
                        margin: 0px 4px;
                        cursor: pointer;
                        user-select: none;
                        font-weight: bold;
                        color: #555;
                        p{
                            background-color: #abc;
                            border-radius: 4px;
                            cursor: default;
                            color: #fff;
                            display: block;
                            &.tip{
                                height: 100%;
                                line-height: 40px;
                                padding: 0px 5px;
                            }
                        }
                    }
                    .errorMsg{
                        position: absolute;
                        right: 10px;
                        top: 55px;
                        font-size: 0.5rem;
                        color: #f00;
                    }
                }
                .new_pwd{
                    width: 90%;
                    margin-bottom: 20px;
                    position: relative;
                    box-sizing: border-box;
                    input{
                        width: 100%;
                    }
                    .icon{
                        position: absolute;
                        top: 14px;
                        right: 10px;
                        width: 20px;
                        height: 16px;
                        background-image: url('../../../assets/css/visible.png');
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                        cursor: pointer;
                        &.show{
                            background-image: url('../../../assets/css/invisible.png');
                        }
                    }
                    .errorMsg{
                        position: absolute;
                        left: 0px;
                        top: 33px;
                        font-size: 0.5rem;
                        color: #f00;
                    }
                }
                
                .btn_box{
                    display: inline-block;
                    width: 100%;
                    text-align: center;
                    button{
                        padding: 3px 9px;
                        margin: 0px 5px;
                        cursor: pointer;
                        border: none;
                        font-size: 14px;
                        color: #555;
                        border: 1px solid #ccc;
                        background-color: ddd;
                        border-radius: 4px;
                        transition-duration: .2s;
                        &:hover{
                            color: #00a1d6;
                        }
                    }
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
    }
</style>