<template>
    <div class="student_My">
        <div class="my_wrap">
            <div class="my-menu">
                <div class="my_menu_avatar">
                    <div class="avatar">
                        <img src="../../assets/img/avatar/female1.jpg" alt="">
                    </div>
                    <span class="name">{{ this.user.name }}</span>
                    <span class="sign">{{ userStatus }}</span>
                </div>
                <ul class="menuList">
                    <li 
                        v-for="(list,index) in menuList" 
                        :key="list"
                        :class="{'current': menuIndex === index}"
                        @click="changeMenuList(index)"
                    >{{ list }}</li>
                </ul>
            </div>
            <div class="my-container">
                <!-- 消息中心 -->
                <div class="allInfo" v-if="isShowContent">
                    <div class="title">
                        <span>全部消息</span>
                    </div>
                    <div class="content">
                        <ul class="infoList">
                            <li 
                                v-for="(item,i) in schoolPub" 
                                :key="item.id"
                                @click="changePubIndex(item.id,i)"
                                :class="{'active': i === publishindex}"
                            >
                                <p>{{ item.title }}</p>
                            </li>
                        </ul>
                        <div class="info_content">
                            <h3>消息内容:</h3>
                            <p>
                                {{ currentPub.content }}
                            </p>
                        </div>
                    </div>
                </div>
                <!-- 个人中心 -->
                <div class="personCenter" v-if="isShowPersonInfo">
                    <ul class="navList">
                        <li 
                            v-for="(list,index) in navList" 
                            :key="list"
                            :class="{'current': index === navIndex}"
                            @click="changeNavlist(index)"
                        >
                            <span>{{list}}</span>
                        </li>
                    </ul>
                    <div class="content" ref="content">
                        <!-- 个人信息 -->
                        <ul class="info_list" v-if="navIndex === 0">
                            <li>
                                <span>{{ personalInfo.title }}</span>
                                <div class="username">
                                    <input 
                                        class="ipt_username" 
                                        type="text"
                                        readonly
                                        :placeholder="personalInfo.userName"
                                    >
                                </div>
                            </li>
                            <li>
                                <span>性别</span>
                                <div class="sexChoose">
                                    <div 
                                        :class="{
                                            'male': personalInfo.sex === true,
                                            'female': personalInfo.sex === false,
                                        }"
                                    >
                                        <i class="active"></i>
                                        <span>{{ personalInfo.sex ? '男' : '女' }}</span>
                                    </div>
                                </div>
                            </li>
                            <li v-if="user.role === 'student'">
                                <span>学号</span>
                                <input type="text" v-model="personalInfo.sNo">
                            </li>
                            <li class="phone">
                                <span>手机号</span>
                                <div class="phone_box">
                                    <template v-if="user.role==='student'">
                                        <input type="number" v-model="personalInfo.phone">
                                    </template>
                                    <template v-if="user.role==='teacher'">
                                        <input type="number" readonly v-model="personalInfo.phone">
                                    </template>
                                </div>
                            </li>
                            <li class="user_age">
                                <span>年龄</span>
                                <input type="number" readonly v-model="handleAge">
                            </li>
                            <li>
                                <span>现居地址</span>
                                <template v-if="user.role==='student'">
                                    <input type="text" v-model="personalInfo.nowAddress">
                                </template>
                                <template v-if="user.role==='teacher'">
                                    <input type="text" readonly v-model="personalInfo.nowAddress">
                                </template>
                            </li>
                        </ul>
                        <!-- 认证信息 -->
                        <div class="authentica_msg" v-if="navIndex === 1">
                            <table>
                                <thead class="authentica_head">
                                    <tr v-if="user.role==='student'">
                                        <th v-for="s in authorizationTitle" :key="s">
                                            {{ s }}
                                        </th>
                                    </tr>
                                    <tr v-if="user.role==='teacher'">
                                        <th v-for="t in TeaAuthorizationTitle" :key="t">
                                            {{ t }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="authentica_body">
                                    <tr v-if="user.role === 'student'">
                                        <td>{{ authenticatMsg.schName }}</td>
                                        <td>{{ authenticatMsg.sNo }}</td>
                                        <td>{{ authenticatMsg.realyName }}</td>
                                        <td>{{ authenticatMsg.department }}</td>
                                        <td>{{ authenticatMsg.major }}</td>
                                        <td>{{ authenticatMsg.grade }}</td>
                                        <td>{{ userStatus }}</td>
                                    </tr>
                                    <tr v-if="user.role === 'teacher'">
                                        <td>{{ authenticatTeacher.schName }}</td>
                                        <td>{{ authenticatTeacher.tNo }}</td>
                                        <td>{{ authenticatTeacher.realyName }}</td>
                                        <td>{{ authenticatTeacher.college }}</td>
                                        <td>{{ userStatus }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- 修改密码 -->
                        <div class="changePwd" v-if="navIndex === 2">
                            <label for="originPwd">
                                <span>原密码</span>
                                <input type="number" id="originPwd" v-model="changePwd.originPwd">
                            </label>
                            <label for="newPwd">
                                <span>新密码</span>
                                <input type="number" id="newPwd" v-model="changePwd.newPwd">
                            </label>
                            <label for="confirmPwd">
                                <span>确认密码</span>
                                <input type="number" id="confirmPwd" v-model="changePwd.confirmPwd">
                            </label>
                            <span v-show="alertMsg" class="alertMsg" ref="alertMsg">{{ alertMsg }}</span>
                            <div class="comfirmChange">
                                <button @click="handlePwd()">确认修改</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="base_footer">
            <base-footer />
        </div>
        
    </div>
</template>

<script>
import BaseFooter from './footer'
import { mapState, mapMutations } from 'vuex'
import api from '../../api/student'
import tapi from '../../api/teacher'
import otherapi from '../../api/other'
import md5 from 'md5'
export default {
    components:{
        BaseFooter,
    },
    data(){
        return{
            isShowPersonInfo: false,//个人中心
            isShowContent: true,//消息中心
            menuList:['消息中心','个人中心'],
            navList: ['个人信息','认证信息','修改密码'],
            menuIndex: 0,//左边菜单索引
            navIndex: 0,//个人中心索引
            sexIndex: 0,//性别索引

            //个人信息
            personalInfo:{
                title: '姓名',
                sex: '',
                phone: '',
                email: '',
                age: '',
                nowAddress: '',
                netName: '',//网名
                height: '',
                weight: '',
                instrect: '',
                qq: '',
                userName: '',
                sNo: '',
            },
            
            // 认证信息
            authorizationTitle:['学校名称','学号','真实姓名','院系','专业','年级','状态'],
            TeaAuthorizationTitle:['学校名称','编号','真实姓名','院系','状态'],
            authenticatMsg:{
                schName: '贵州民族大学人文科技学院',
                sNo: '',
                realyName: '',
                department: '',
                major: '',
                grade: '',
            },
            authenticatTeacher:{
                schName: '贵州民族大学人文科技学院',
                tNo: '',
                realyName: '',
                college: '',
            },

            //修改密码
            changePwd:{
                originPwd: null,
                newPwd: null,
                confirmPwd: null,
            },
            alertMsg: '',
            originUserPwd: '',

            schoolPub: [],//全部消息
            currentPub: [],//当前消息
        }
    },
    computed:{
        ...mapState({
            publishindex: (state) => state.pubIndex,//消息索引
            user: (state)=>state.user,
        }),
        handleAge(){
            const year = this.personalInfo.age.split('-')[0];
            const nowTime = new Date().getFullYear();
            return nowTime - year;
        },
        userStatus(){
            if(this.user.role === 'student'){
                return this.authenticatMsg.sNo ? '已认证' : '';
            }else if(this.user.role === 'teacher'){
                return this.authenticatTeacher.tNo ? '已认证' : '';
            }
        },
    },
    methods:{
        ...mapMutations(['setPubIndex']),
        changeMenuList(index){//切换左侧菜单
            this.menuIndex = index;
            if(this.menuIndex === 0){
                this.isShowContent = true;//消息中心
                this.isShowPersonInfo = false;//个人中心
            }else if(this.menuIndex === 1){
                this.isShowPersonInfo = true;
                this.isShowContent = false;
            }
        },
        changeNavlist(index){//导航点击
            this.navIndex = index;
            if(index === 1){
                this.authorization();
            }
        },
        async changePubIndex(id,index){//消息中心
            this.getCurrentPub(id)
            this.setPubIndex(index)
        },
        async getCurrentPub(id){
            await otherapi.getPubsById({
                id,
            }).then(res =>{
                this.currentPub = res;
            })
        },
        async getData(){//个人信息
            if(this.user.role === 'student'){
                await api.getStudentById({
                    id: this.user.id,
                }).then((res)=>{
                    this.personalInfo.userName = res.name;
                    this.personalInfo.phone = res.mobile;
                    this.personalInfo.sex = res.sex;
                    this.personalInfo.age = res.birthday;
                    this.personalInfo.nowAddress = res.address;
                    this.personalInfo.sNo = res.sNo;
                })
            }else if(this.user.role === 'teacher'){
                await tapi.getTeacherById({
                    id: this.user.id,
                }).then((res)=>{
                    this.personalInfo.userName = res.name;
                    this.personalInfo.phone = res.mobile;
                    this.personalInfo.sex = res.sex;
                    this.personalInfo.age = res.birthday;
                    this.personalInfo.nowAddress = res.address;
                })
            }
        },
        async authorization(){//认证信息
            let res;
            if(this.user.role === 'student'){
                res = await otherapi.authorizationStu({
                    id: this.user.id,
                })
            }else if(this.user.role === 'teacher'){
                res = await otherapi.authorizationTeacher({
                    id: this.user.id,
                })
            }
            if(res){
                if(this.user.role === 'student'){
                    this.authenticatMsg.sNo = res[0].sNo;
                    this.authenticatMsg.realyName = res[0].name;
                    this.authenticatMsg.department = res[0].Major.College.name;
                    this.authenticatMsg.major = res[0].Major.name;
                    this.authenticatMsg.grade = res[0].sNo.slice(0,4)
                }else if(this.user.role === 'teacher'){
                    this.authenticatTeacher.tNo = res[0].tNo;
                    this.authenticatTeacher.realyName = res[0].name;
                    this.authenticatTeacher.college = res[0].College.name;
                }
            }
        },
        async pwdHelper(apis){//辅助函数
            let res;
            if(this.user.role === 'student'){
                res = await apis.updateStudent({
                    id: this.user.id,
                    loginPwd: this.changePwd.newPwd,
                })
            }else if(this.user.role === 'teacher'){
                res = await apis.updateTeacher({
                    id: this.user.id,
                    loginPwd: this.changePwd.newPwd,
                })
            }
            if(res){
                this.alertMsg = '修改成功';
                setTimeout(() => {
                    this.alertMsg = '';
                    this.changePwd.originPwd = null;
                    this.changePwd.newPwd = null;
                    this.changePwd.confirmPwd = null;
                    this.navIndex = 0;
                }, 2000);
            }
        },
        handlePwd(){//修改密码
            this.regPwd();
            if(this.user.role === 'student'){
                this.pwdHelper(api);
            }else if(this.user.role === 'teacher'){
                this.pwdHelper(tapi);
            }
        },
        async regPwd(){//修改密码，对密码的验证
            if(!this.changePwd.originPwd || !this.changePwd.newPwd || !this.changePwd.confirmPwd)return;
            if(this.changePwd.originPwd === this.changePwd.newPwd ||
				this.changePwd.originPwd === this.changePwd.confirmPwd){
                this.alertMsg = '原密码不能和新密码一致';return;
            }
            if(this.changePwd.newPwd !== this.changePwd.confirmPwd){
                this.alertMsg = '两次输入的密码不一致';return;
            }
            if(this.originUserPwd !== md5(this.changePwd.originPwd)){
                this.alertMsg = '原密码不正确';return;
            }
        },
        async getStuPwd(){//得到密码
            if(this.user.role === 'student'){
                await api.getStudentById({id: this.user.id}).then(res=>{
                    this.originUserPwd = res.loginPwd;
                })
            }else if(this.user.role === 'teacher'){
                 await tapi.getTeacherById({id: this.user.id}).then(res=>{
                    this.originUserPwd = res.loginPwd;
                })
            }
        },
        async getPublishes(){
            await otherapi.getPublist().then(res =>{
                this.schoolPub.push(...res.datas)
            })
        },
    },
    mounted(){
        this.getData();
        this.getStuPwd();
        this.getCurrentPub(1);
        this.getPublishes();
    },
}
</script>

<style lang="less">
    @import url('../../assets/css/student/my.less');
</style>