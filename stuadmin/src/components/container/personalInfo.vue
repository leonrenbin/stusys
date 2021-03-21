<template>
    <div class="personalInfo">
        <div class="personCenter">
            <div class="content" v-for="item in personalInfo" :key="item.id">
                <!-- 个人信息 -->
                <ul class="info_list">
                    <li>
                        <span>姓名</span>
                        <div class="username">
                            <input 
                                class="ipt_username" 
                                type="text"
                                readonly
                                :placeholder="item.name"
                            >
                        </div>
                    </li>
                    <li>
                        <span>性别</span>
                        <div class="sexChoose">
                            <div 
                                :class="{
                                    'male': item.sex === true,
                                    'female': item.sex === false,
                                }"
                            >
                                <i class="active"></i>
                                <span>{{ item.sex ? '男' : '女' }}</span>
                            </div>
                        </div>
                    </li>
                    <li v-if="postRole == 'student'">
                        <span>学号</span>
                        <input type="text" v-model="item.sNo">
                    </li>
                    <li class="phone">
                        <span>手机号</span>
                        <div class="phone_box">
                            <template v-if="postRole == 'student'">
                                <input type="number" v-model="item.mobile">
                            </template>
                            <template v-if="postRole == 'teacher'">
                                <input type="number" readonly v-model="item.mobile">
                            </template>
                        </div>
                    </li>
                    <li class="user_age">
                        <span>年龄</span>
                        <input type="number" readonly v-model="handleAge">
                    </li>
                    <li v-if="postRole == 'student'">
                        <span>现居地址</span>
                        <template>
                            <input type="text" readonly v-model="item.address">
                        </template>
                    </li>
                    <li>
                        <span>职位</span>
                        <template v-if="postRole == 'student'">
                            <input type="text" readonly v-model="item.position">
                        </template>
                        <template v-if="postRole == 'teacher'">
                            <input type="text" readonly v-model="item.position">
                        </template>
                    </li>
                </ul>
            </div>
        </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import sapi from '../../api/student'
import tapi from '../../api/teacher'
export default {
    data(){
        return{
            personalInfo: [],
        }
    },
    computed:{
        ...mapState({
            studentId: (state)=> state.studentId,//学生id
            teacherName: (state)=> state.teacherName,//老师id
            postRole: (state)=> state.postRole,
        }),
        handleAge(){
            const year = this.personalInfo[0].birthday.split('-')[0];
            const nowTime = new Date().getFullYear();
            return nowTime - year;
        },
    },
    methods:{
        async getData(){
            if(this.postRole == 'student'){
                await sapi.getStudentById({
                    id: this.studentId
                }).then(res=>{
                    this.personalInfo.push(res)
                })
            }
            if(this.postRole == 'teacher'){
                await tapi.getTeacherByName({
                    params:{
                        name: this.teacherName
                    }
                }).then(res=>{
                    this.personalInfo = res.datas;
                })
            }
        },
    },
    mounted(){
        this.getData();
    },
}
</script>

<style lang="less">
.personalInfo{
    width: 100%;
    height: 100%;
    .personCenter{
        width: 100%;
        height: 100%;
        position: relative;
        .navList{
            position: absolute;
            left: 0px;
            top: 0px;
            background-color: #fff;
            z-index: 2;
            width: 100%;
            padding: 10px 20px;
            box-sizing: border-box;
            display: flex;
            border-bottom: 1px solid #ddd;
            li{
                margin-right: 30px;
                cursor: pointer;
                transition-duration: .2s;
                &:hover{
                    color: #00a1d6;
                }
                &.current{
                    color: #00a1d6;
                    span{
                        border-bottom: 2px solid #00a1d6;
                    }
                }
                span{
                    padding: 5px 0px;
                }
            }
        }
        .content{
            width: 100%;
            height: 100%;
            padding-left: 20px;
            box-sizing: border-box;
            padding-top: 37px;
            .info_list{
                width: 100%;
                height: 100%;
                padding-bottom: 2rem;
                box-sizing: border-box;
                overflow: auto;
                &::-webkit-scrollbar{  //改变滚动条宽高
                    width:10px;
                    height: 0px;
                }
                li{
                    padding: 10px 0;
                    display: flex;
                    align-items: center;
                    position: relative;
                    &.phone{//电话
                        .phone_box{
                            position: relative;
                            width: 20rem;
                            input{
                                width: 100%;
                                line-height: 3rem;
                                padding-right: 3rem;
                                box-sizing: border-box;
                            }
                            
                            .change{
                                color: #72d380;
                                padding: 5px 10px;
                                font-size: 14px;
                                margin-left: 5px;
                                position: absolute;
                                right: 0px;
                                top: 50%;
                                transform: translateY(-50%);
                                cursor: pointer;
                            }
                        }
                    }
                    &.user_instrect{
                        textarea{
                            border: 1px solid #ccc;
                            border-radius: 4px;
                            resize: none;
                            line-height: 1.5rem;
                            width: 20rem;
                            font-size: 18px;
                            height: 5rem;
                            color: #676767;
                        }
                    }
                    span{
                        display: block;
                        width: 100px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: 14px;
                        padding: 4px 0px;
                    }
                    input{
                        width: 20rem;
                        border: none;
                        font-size: 18px;
                        color: #676767;
                        border-bottom: 1px solid #eee;
                        padding-left: 15px;
                        box-sizing: border-box;
                        line-height: 3rem;
                        &::-webkit-outer-spin-button,
                        &::-webkit-inner-spin-button{
                            -webkit-appearance: none !important;
                        }
                    }
                    .sexChoose{//性别
                        width: 100%;
                        display: flex;
                        padding-left: 20px;
                        .male{
                            padding: 0px 0px;
                            display: flex;
                            cursor: pointer;
                            align-items: center;
                            i{
                                display: block;
                                width: 10px;
                                height: 10px;
                                border:2px solid #ccc;
                                border-radius: 50%;
                                position: relative;
                                &.active{
                                    &::after{
                                        content: '';
                                        position: absolute;
                                        width: 4px;
                                        height: 4px;
                                        border-radius: 50%;
                                        left: 50%;
                                        top: 50%;
                                        background-color: #ccc;
                                        transform: translate(-50%, -50%);
                                    }
                                }
                            }
                            span{
                                margin-left: 5px;
                                font-size: 12px;
                                width: 4rem;
                                &.active{
                                    color: #00a1d6;
                                }
                            }
                        }
                        .female{
                            padding: 0px 0px;
                            display: flex;
                            align-items: center;
                            cursor: pointer;
                            i{
                                display: block;
                                width: 10px;
                                height: 10px;
                                border:2px solid #ccc;
                                border-radius: 50%;
                                position: relative;
                                &.active{
                                    &::after{
                                        content: '';
                                        position: absolute;
                                        width: 4px;
                                        height: 4px;
                                        border-radius: 50%;
                                        left: 50%;
                                        top: 50%;
                                        background-color: #ccc;
                                        transform: translate(-50%, -50%);
                                    }
                                }
                            }
                            span{
                                margin-left: 5px;
                                font-size: 12px;
                                &.active{
                                    color: #00a1d6;
                                }
                            }
                        }
                    }
                    .username{//姓名
                        width: 100%;
                        input{
                            border: none;
                            width: 10rem;
                            font-size: 16px;
                        }
                    }
                    .user_height,
                    .user_weight{
                        width: 20rem;
                        position: relative;
                        input{
                            width: 100%;
                            padding-right: 2rem;
                        }
                        .sign{
                            position: absolute;
                            right: 0px;
                            top: 50%;
                            transform: translateY(-50%);
                            padding: 5px 10px;
                            font-size: 14px;
                            color: #999;
                            cursor: default;
                        }
                    }
                }
                .submit{
                    width: 100%;
                    margin-top: 20px;
                    text-align: center;
                    button{
                        padding: 5px 30px;
                        border: none;
                        background-color: #1fb6ff;
                        border-radius: 4px;
                        color: #fff;
                        text-align: center;
                        cursor: pointer;
                        font-size: 16px;
                        &:hover{
                            background-color: #2ca5ff;
                        }
                    }
                }
            }
            .authentica_msg{
                width: 100%;
                margin-top: 50px;
                table{
                    display: block;
                    width: 100%;
                    border: 1px solid #ddd;
                    box-sizing: border-box;
                    thead{
                        width: 100%;
                        border-bottom: 1px solid #ddd;
                        background-color: #fcfdff;
                        display: block;
                        tr{
                            display: flex;
                            width: 100%;
                            justify-content: space-between;
                            th{
                                display: block;
                                padding: 30px 10px;
                                font-size: 16px;
                                text-align: center;
                                color: #777;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                white-space: nowrap;
                                min-width: 50px;
                            }
                        }
                    }
                    tbody{
                        width: 100%;
                        tr{
                            display: flex;
                            width: 100%;
                            justify-content: space-between;
                            td{
                                min-width: 50px;
                                border-right: 1px solid #eee;
                                text-align: center;
                                font-size: 14px;
                                padding: 35px 10px;
                                color: #777;
                                line-height: 20px;
                                overflow:hidden;
                                display:-webkit-box;
                                -webkit-box-orient:vertical;
                                -webkit-line-clamp:2;
                            }
                            td:nth-last-child(1){
                                border-right: none;
                            }
                        }
                    }
                }
            }
            .changePwd{
                width: 100%;
                margin-top: 50px;
                position: relative;
                label{
                    width: 100%;
                    display: flex;
                    margin-top: 30px;
                    align-items: center;
                    span{
                        display: block;
                        width: 100px;
                        color: #666;
                    }
                    input{
                        width: 20rem;
                        padding: 10px 15px;
                        box-sizing: border-box;
                        border: none;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        color: #999;
                        &::-webkit-outer-spin-button,
                        &::-webkit-inner-spin-button{
                            -webkit-appearance: none !important;
                        }
                    }
                }
                .alertMsg{
                    color: #fff;
                    padding: 5px 15px;
                    background-color: #00a1d6;
                    border-radius: 4px;
                    position: absolute;
                    right: 75px;
                    bottom: 30px;
                    transition-duration: 1.5s;
                }
                .comfirmChange{
                    width: 100%;
                    padding-left: 100px;
                    margin-top: 30px;
                    button{
                        border: none;
                        border-radius: 4px;
                        background-color: #1fb6ff;
                        font-size: 16px;
                        padding: 5px 20px;
                        color: #fff;
                        transition-duration: .2s;
                        cursor: pointer;
                        &:hover{
                            background-color: #2ca5ff;
                        }
                    }
                }
            }
        }
    }
}
</style>