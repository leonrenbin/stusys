<template>
    <div class="add_status">
        <h1>{{ isAddOrEdit === 0 ? '新增': '修改' }}学生</h1>
        <div class="editArea">
                <div class="container">
                <label for="stu_name">
                    <span>姓名:</span>
                    <input type="text" id="stu_name" v-model="formData.name">
                </label>
                <label for="stu_num">
                    <span>学号:</span>
                    <input type="text" 
                        id="stu_num" 
                        placeholder="如:201708091" 
                        v-model="formData.sNo"
                        @change="getLoginId(formData.sNo)"
                    >
                </label>
                <div class="check">
                    <span class="title">性别:</span>
                    <div class="checkBox" @click="showSexItem = !showSexItem">
                        <input type="text" v-model="formData.sex" readonly>
                        <div class="icon"></div>
                    </div>
                    <ul class="dataList" v-if="showSexItem">
                        <li 
                            v-for="(sex,index) in chooseSex" 
                            :key="sex"
                            :class="{'current': index === sexIndex}"
                            @click="sexChoose(index)"
                        >{{ sex }}</li>
                    </ul>
                </div>
                <label for="birthday">
                    <span>出生年月:</span>
                    <input type="text" id="birthday" placeholder="格式如: 1998-01-12" v-model="formData.birthday">
                </label>
                <div class="position">
                    <span class="title">职务:</span>
                    <div class="checkBox" @click="showPosition = !showPosition">
                        <input type="text" v-model="formData.position" readonly>
                        <div class="icon"></div>
                    </div>
                    <ul class="dataList" v-if="showPosition">
                        <li 
                            v-for="(p,index) in stuPosition" 
                            :key="p"
                            :class="{'current': index === sexIndex}"
                            @click="changePosition(index)"
                        >{{ p }}</li>
                    </ul>
                </div>
                <div class="native">
                    <span class="title">民族:</span>
                    <div class="checkBox" @click="showNation = !showNation">
                        <input type="text" v-model="formData.native" readonly>
                        <div class="icon"></div>
                    </div>
                    <ul class="dataList" v-if="showNation">
                        <li
                            v-for="(list,index) in nationList"
                            :key="list"
                            @click="changeNation(index)"
                        >
                            {{ list }}
                        </li>
                    </ul>
                </div>
                <label for="age">
                    <span>年龄:</span>
                    <input type="text" readonly placeholder="只读" id="age" v-model="age">
                </label>
                <label for="address">
                    <span>家庭地址:</span>
                    <input type="text" id="address" v-model="formData.address">
                </label>
                <label for="mobile">
                    <span>联系电话:</span>
                    <input type="text" id="mobile" v-model="formData.mobile">
                </label>
            </div>
            <div class="submit">
                <button @click="handleSubmit">提交</button>
                <button @click="handleCancel">取消</button>
            </div>
        </div>
        <base-footer />
    </div>
</template>
<script>
import nation from '@/data/nation'
import api from '../../api/student'
import { mapMutations, mapState } from 'vuex'
import BaseFooter from '../container/footer'
function getRan(min,max) {
    return Math.floor(Math.random() * (max-min) + min);
}
export default {
    components:{
        BaseFooter,
    },
    data(){
        return{
            formData:{
                sNo: '',
                loginId: '',
                loginPwd: '123456',
                address: '',
                native:'',
                name: '',
                birthday:'',
                sex: false,
                mobile: '',
                position: '',
                TeacherId: getRan(1,100),
                ClassId: getRan(1,60),
                MajorId: getRan(1,19),
                CollegeId: getRan(1,8),
                SchoolId: 1,
            },
            chooseSex:['男','女','火星人'],//性别
            stuPosition: ['班长','副班长','学习委员','生活委员','普通同学'],
            showSexItem: false,//显示性别
            sexIndex: 0,//性别索引

            
            showPosition: false,//职务显示
            positionIndex: 0,//职务索引

            showNation: false,//显示民族
            nationIndex: 0,//民族索引
        }
    },
    computed:{
        ...mapState({
            updateStuData: (state)=>state.updateStuData,
            isAddOrEdit: (state)=> state.isAddOrEdit,
        }),
        nationList(){
            return nation.filter(item => item)
        },
        age(){
            const now = new Date().getFullYear();
            return this.getAge() === now ? '' : this.getAge();
        },
    },
    async mounted(){
        const res = await this.initData();
        if(res){
            this.formData = {...res}
        }
        if(this.isAddOrEdit === 0){
            this.handleCancel();
        }
    },
    methods:{
        ...mapMutations(['setupdateStuData']),
        async initData(){
            return await api.getStudentById({
                id: this.updateStuData
            })
        },
        getAge(){
            const now = new Date().getFullYear();
            const birthyear = this.formData.birthday.split("-")[0];
            return now - birthyear;
        },
        async handleSubmit(){
            console.log(this.isAddOrEdit);
            this.formData.loginId = this.formData.sNo;
            if(this.isAddOrEdit === 0){//新增
                const res = await api.addStudent({
                    sNo: this.formData.sNo,
                    loginId: this.formData.loginId,
                    loginPwd: this.formData.loginPwd,
                    address: this.formData.address,
                    native: this.formData.native,
                    name: this.formData.name,
                    birthday: this.formData.birthday,
                    sex: this.formData.sex,
                    mobile: this.formData.mobile,
                    position: this.formData.position,
                    TeacherId: this.formData.TeacherId,
                    ClassId: this.formData.ClassId,
                    MajorId: this.formData.MajorId,
                    CollegeId: this.formData.CollegeId,
                    SchoolId: this.formData.SchoolId,
                })
                if(res){
                    this.$router.push({
                        name: 'StuStatus',
                    })
                    setTimeout(() => {
                        this.handleCancel();
                    }, 2000);
                }
            }else if(this.isAddOrEdit === 1){//修改
                const res = await api.updateStudent({
                    id: this.updateStuData,
                    params:{
                        ...this.formData
                    }
                })
                if(res){
                    this.$router.push({
                        name: 'StuStatus',
                    })
                    setTimeout(() => {
                        this.handleCancel();
                    }, 2000);
                }
            }
        },
        handleCancel(){//取消
                this.formData.name = '';
                this.formData.sNo = '';
                this.formData.nativePlace = '';
                this.formData.birthday = '';
                this.formData.native = '';
                this.formData.address = '';
                this.formData.mobile = '';
                this.formData.sex = null;
        },
        sexChoose(index){//性别
            this.sexIndex = index;
            if(index === 0){
                this.formData.sex = true;
            }else if(index === 1){
                this.formData.sex = false;
            }else if(index === 2){
                this.formData.sex = false;
            }
            this.showSexItem = !this.showSexItem;
        },
        changeEntrance(index){
            this.entranceIndex = index;
            this.formData.EnrollmentYear = this.chooseEntrance[index];
            this.showEntrance = !this.showEntrance;
        },
        changeNation(index){//民族选择
            this.nationIndex = index;
            this.formData.native = this.nationList[index];
            this.showNation = !this.showNation;
        },
        changePosition(index){//民族职务
            this.positionIndex = index;
            this.formData.position = this.stuPosition[index];
            this.showPosition = !this.showPosition;
        },
        getLoginId(value){
            this.formData.loginId = value;
        },
    },
}
</script>

<style lang="less">
    .add_status{
        width: 100%;
        height: calc(100% - 96px);
        left: 0;
        h1{
            font-weight: bold;
            font-size: 24px;
            line-height: 60px;
            text-align: center;
        }
        .editArea{
            width: 100%;
            padding: 20px;
            box-sizing: border-box;
            z-index: 2;
            .container{
                margin-top: 10px;
                width: 100%;
                label{
                    width: 100%;
                    margin-top: 10px;
                    display: flex;
                    justify-content: flex-end;
                    padding-right: 100px;
                    box-sizing: border-box;
                        line-height: 40px;
                    span{
                        font-size: 16px;
                        margin-right: 10px;
                        cursor: default;
                    }
                    input{
                        border: none;
                        width: 90%;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        padding-left: 10px;
                        font-size: 16px;
                        color: #555;
                        box-sizing: border-box;
                        transition-duration: .3s;
                        background-color: rgba(255, 255, 255, .92);
                    }
                    textarea{
                        resize: none;
                        border: none;
                        width: 90%;
                        height: 4rem;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        padding-left: 10px;
                        font-size: 12px;
                        line-height: 20px;
                        box-sizing: border-box;
                    }
                }
                .check, .position, .native{
                    width: 100%;
                    height: 40px;
                    margin: 10px 0px 10px 0px;
                    display: flex;
                    position: relative;
                    justify-content: flex-end;
                    padding-right: 100px;
                    box-sizing: border-box;
                    cursor: pointer;
                    &.check{
                        .dataList{
                            z-index: 4;
                        }
                    }
                    &.position{
                        .dataList{
                            z-index: 3;
                        }
                    }
                    &.native{
                        .dataList{
                            z-index: 2;
                        }
                    }
                    .title{
                        font-size: 16px;
                        margin-right: 10px;
                        cursor: default;
                    }
                    .checkBox{
                        border: 1px solid #ccc;
                        background-color: #fff;
                        border-radius: 4px;
                        padding-left: 10px;
                        font-size: 12px;
                        line-height: 40px;
                        width: 90%;
                        box-sizing: border-box;
                        overflow: hidden;
                        input{
                            border: none;
                            font-size: 16px;
                            color: #666;
                            font-weight: bold;
                            cursor: pointer;
                        }
                        .icon{
                            position: absolute;
                            width: 14px;
                            height: 14px;
                            right: 120px;
                            top: 10px;
                            cursor: pointer;
                            background-image: url('../../assets/img/向下.png');
                            background-size: 100% 100%;
                            background-repeat: no-repeat;
                        }
                    }
                    .dataList{
                        position: absolute;
                        right: 100px;
                        top: 40px;
                        width: 50%;
                        max-height: 300px;
                        overflow: auto;
                        border-radius: 4px;
                        border: 1px solid #00a1d6;
                        background-color: #fff;
                        line-height: 24px;
                        box-shadow: 1px 2px 5px rgba(100, 159, 200, .6);
                        &::-webkit-scrollbar{  //改变滚动条宽高
                            width: 10px;
                            height: 10px;
                        }
                        li{
                            transition-duration: .2s;
                            font-size: 16px;
                            font-weight: bold;
                            color: #666;
                            text-align: center;
                            cursor: pointer;
                            padding: 3px 0;
                            border-radius: 4px;
                            &:hover{
                                background-color: #eee;
                            }
                            &.current{
                                background-color: #eee;
                            }
                        }
                    }
                }
            }
            input{
                &::placeholder{
                    color: #999;
                }
            }
            span{
                color: #555;
                font-weight: bold;
            }
        }
        .submit{
            margin-top: 30px;
            text-align: center;
            button{
                border: none;
                background-color: #fff;
                border-radius: 4px;
                border: 1px solid #ddd;
                margin: 0px 10px;
                padding: 6px 20px;
                cursor: pointer;
                transition-duration: .2s;
                font-size: 16px;
                font-weight: bold;
                color: #666;
                &:hover{
                    border-color: #00a1d6;
                }
            }
        }
        table{
            width: 100%;
        }
    }
    
</style>