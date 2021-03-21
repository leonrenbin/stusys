<template>
    <div class="user_avatar_area" v-if ="user.role !== ''">
        <div 
            class="user_avatar"
            ref="useravatar"
            @mouseover="handleMouseover"
        >
            <!-- 头像 -->
            <div class="avatar">
                <img src="../../assets/img/avatar/useravatar.png" alt="">
            </div>
        </div>
        <!-- 个人区域 -->
        <div 
            class="privacy_zone"
            v-show="isShowPersonalInfo"
            @mouseover="zoneMouseover"
            @mouseleave="handleMouseleave"
        >
            <div class="avatar">
                <img src="../../assets/img/avatar/useravatar.png" alt="">
            </div>
            
            <div class="user_name">{{ user.name ? user.name : '未登录' }}</div>
            <div class="isLogin" v-if="!user.id">
                <span @click="goLogin">登录</span>
            </div>
            <div class="personal_center" v-if="user.role && user.role !== 'admin'">
                <span>
                    <router-link :to="{
                        name:user.role === 'teacher' ? 'TeacherMine' : 'studentMine'
                    }">个人中心</router-link>
                </span>
            </div>
            <div class="exitLogin" v-if="user.role">
                <div class="exit" @click="logoutLogin">
                    <span class="icon">
                        <img src="../../assets/img/avatar/exitlogin.png" alt="">
                    </span>
                    <span>退出</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState,mapActions, mapMutations } from 'vuex'
import { resetRouter } from '../../router'
export default {
    data(){
        return{
            isShowPersonalInfo: false,//是否显示个人信息
            timer: null,
        }
    },
    computed:{
        ...mapState({
            user: (state)=> state.user,
        }),
    },
    mounted(){
        // console.log(this.user);
    },
    methods:{
        ...mapActions(['logout']),
        ...mapMutations(['setrolesIndex']),
        handleMouseover(){
            const useravatar = this.$refs.useravatar;//小头像
            this.timer = setTimeout(() => {//悬停300ms之后
                useravatar.style.opacity = 0;//小头像消失
                this.isShowPersonalInfo = true;//显示
            }, 300);
        },
        zoneMouseover(){
            const useravatar = this.$refs.useravatar;
            if(this.timer){
                clearTimeout(this.timer);
                this.timer = null;
                useravatar.style.opacity = 1;//小头像显示
                this.isShowPersonalInfo = true;//显示
            }
        },
        handleMouseleave(){
            const useravatar = this.$refs.useravatar;
            this.timer = setTimeout(() => {//离开1000ms之后
                useravatar.style.opacity = 1;//小头像显示
                this.isShowPersonalInfo = false;//隐藏
            }, 1000);
        },
        logoutLogin(){//退出登录
            resetRouter();
            this.logout();
            this.setrolesIndex(null);
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("router");
            localStorage.removeItem("local");
            this.$router.push({
                name: 'login'
            })
        },
        goLogin(){//去登陆
            this.$router.push({
                name: 'login'
            })
        }
    },
}
</script>

<style lang="less">
    .user_avatar_area{
        width: 100%;
        height: 40px;
        position: relative;
        margin-right: 100px;
        display: flex;
        .user_avatar{
            width: 40px;
            height: 100%;
            border-radius: 50%;
            cursor: pointer;
            transition-duration: .3s;
            background-color: rgba(248,246,240, 0.92);
            &:hover{
                transform: translateY(4px) scale(1.3);
            }
            .avatar{
                width: 100%;
                height: 100%;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .user_name{
            line-height: 40px;
            margin-left: 20px;
            cursor: pointer;
        }
        .privacy_zone{
            position: absolute;
            width: 280px;
            min-height: 200px;
            background-color: #fff;
            left: -120px;
            top: 30px;
            border-radius: 4px;
            z-index: 10;
            box-shadow: 0px 0px 5px rgba(100,100,100, .92);
            padding-top: 40px;
            box-sizing: border-box;
            transition-duration: .2s;
            .avatar{
                width: 60px;
                height: 60px;
                border-radius: 50%;
                position: absolute;
                left: 50%;
                top: 0px;
                background-color: #fff;
                transform: translate(-50%, -50%);
                box-shadow: 0px -1px 5px rgba(100, 100, 100, .92);
                cursor: pointer;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .user_name{
                text-align: center;
                font-size: 20px;
                margin-left: 0px;
                cursor: pointer;
                a{
                    text-decoration: none;
                    color: #222;
                }
            }
            .isLogin{
                text-align: center;
                margin-top: 10px;
                span{
                    font-size: 14px;
                    padding: 5px 30px;
                    border-radius: 4px;
                    background-color: #eee;
                    cursor: pointer;
                    transition-duration: .2s;
                    border-radius: 4px;
                    color: #666;
                    font-weight: bold;
                    font-size: 18px;
                    &:hover{
                        background-color: #eee;
                        color: #00a1d6;
                        
                    }
                }
            }
            .personal_center{
                padding: 10px 0px;
                span{
                    display: block;
                    box-sizing: border-box;
                    padding-left: 20px;
                    cursor: pointer;
                    transition-duration: .2s;
                    border-radius: 4px;
                    &:hover{
                        background-color: #eee;
                        color: #00a1d6;
                    }
                    a{
                        text-decoration: none;
                        color: #222;
                        display: block;
                        width: 100%;
                    }
                }
            }
            .exitLogin{
                padding: 10px 0px;
                box-sizing: border-box;
                border-top: 1px solid #ddd;
                .exit{
                    cursor: pointer;
                    padding-left: 20px;
                    transition-duration: .2s;
                    border-radius: 4px;
                    &:hover{
                        background-color: #eee;
                        span{
                            color: #66c18c;
                        }
                    }
                    span{
                        font-size: 14px;
                        &.icon{
                            img{
                                vertical-align: -4px;
                                width: 20px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>