<template>
    <div class="stu_achievement">
        <h2>成绩查询</h2>
        <table class="achievment_table">
            <thead>
                <tr>
                    <th v-for="item in thead" :key="item">
                        {{ item }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <dl v-for="item in achievments.subject" :key="item">
                            <dd>{{ item }}</dd>
                        </dl>
                    </td>
                    <td>
                        <!-- 分数 -->
                        <dl v-for="item in achievments.fraction" :key="item.id">
                            <dd>{{ item.value }}</dd>
                        </dl>
                    </td>
                    <td>
                        <!-- 学分 -->
                        <dl v-for="item in achievments.credit" :key="item.id">
                            <dd>{{ item.value }}</dd>
                        </dl>
                    </td>
                    <td>
                        <!-- 是否及格 -->
                        <dl v-for="item in isPass" :key="item.id">
                            <dd>{{ item.value }}</dd>
                        </dl>
                    </td>
                </tr>
                <tr class="comprehensive">
                    <td 
                        v-for="item in comprehensive" 
                        :key="item"
                    >
                        <span>{{ item }}</span>
                    </td>
                </tr>
                <tr class="result">
                    <td>
                        <span>{{ result.subject }}</span>  
                    </td>
                    <td>
                        <span>{{ fract }}</span>
                    </td>
                    <td>
                        <span>{{ credit }}</span>
                    </td>
                    <td>
                        <span>{{ passNum }}</span>
                    </td>
                    <td>
                        <span>{{ passRate }}</span>
                    </td>
                    <td>
                        <span>{{ result.rank }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <base-footer />
    </div>  
</template>

<script>
import { mapState,mapMutations } from 'vuex'
import api from '../../api/student'
import BaseFooter from '../container/footer'
export default {
    components:{
        BaseFooter,
    },
    data(){
        return{
            thead:['科目','分数','学分','是否及格'],
            comprehensive: ['综合','总分数','总学分','不及格门数','通过率','班级排名'],//综合
            nowIndex: 0,
            result:{
                subject: '',
                passNum: 0,//不及格门数
                passRate: 0,//通过率
                rank: 0,//班级排名
            },
            achievments:{
                subject:[],
                fraction: [],
                credit:[],
            },
            count:[],//分数，临时存储
            counter: [],//学分，临时存储
            isPass: [],
        }
    },
    computed:{
        ...mapState({
            user: (state)=>state.user,
        }),
    },
    methods:{
        ...mapMutations(['totalNumber','setsemesterIndex',]),
        changeSemester(nowIndex){
            this.setsemesterIndex(nowIndex);
            this.totalNumber(this.achievments);
        },
        formHTML(fraction){
            if(fraction < 60){
                return fraction.fontcolor('red')
            }
            return fraction;
        },
        isAdopt(fraction){
            return fraction < 60 ? '0' : '1'
        },
        retOne(a,b){
            return Math.round(Math.random(a,b))
        },
        getCredit(){//分数
            const count = this.retOne(0,1);
            if(count === 0){
                return 4;
            }else{
                return 6;
            }
        },
        async getData(){
            await api.getStuAchievement({
                params:{
                    StudentId: this.user.id,
                }
            }).then((res)=>{
                const sub = res.Achievement;
                delete sub.StudentId;//删除无关的前两项
                delete sub.id;
                this.achievments.subject = Object.keys(sub);
                for (const key in sub) {
                    if(sub[key] !== '0'){
                        this.count.push(sub[key])
                        this.counter.push(this.getCredit())
                    }
                    if(sub[key] === '0'){
                        this.achievments.subject.splice(key,1)
                    }
                }
                for(let i=0; i<this.counter.length; i++){
                    let hehe;
                    hehe = {value: this.counter[i], id: i}
                    this.achievments.credit.push(hehe);
                }
                for(let i=0; i<this.count.length; i++){
                    let hehe;
                    hehe = {value: this.count[i], id: i}
                    this.achievments.fraction.push(hehe);
                }
                for(let i=0; i<this.achievments.fraction.length; i++){
                    let hehe;
                    let panduan = '';
                    if(this.achievments.fraction[i].value < 60){
                        panduan = '否';
                        hehe = {value: panduan, id: i}
                    }else{
                        panduan = '是';
                        hehe = {value: panduan, id: i}
                    }
                    this.isPass.push(hehe)
                }
                this.totalNumber(this.achievments);
            })
        },
    },
    computed:{
        ...mapState({
            semesterIndex: (state)=> state.semesterIndex,
            fract:(state) => state.fract,
            credit:(state)=> state.credit,
            passNum:(state)=> state.passNum,
            passRate: (state)=> state.passRate,
            user:(state)=>state.user,
        }),
    },
    mounted(){
        this.getData();
    },
}
</script>

<style lang="less">
    .stu_achievement{
        width: 100%;
        h2{
            font-weight: bold;
            font-size: 20px;
            color: #555;
            padding: 10px 0;
        }
        .chooseGrade{
            width: 100%;
            height: 50px;
            select{
                appearance: none;
                -moz-appearance: none;
                -webkit-appearance: none;
                padding-right: 1.1rem;
                width: 9rem;
                margin-left: 8rem;
                height: 1.6rem;
                line-height: 1.6rem;
                padding-left: 20px;
                background-color: #fff;
                border: 1px solid #DDD;
                border-radius: 4rem;
                transition-duration: .2s;
                cursor: pointer;
                &:hover{
                    border: 1px solid #00a1d6;
                }
            }
        }
        .achievment_table{
            width: 100%;
            display: block;
            thead{
                display: block;
                tr{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    background-color: #f9f9f9;
                    margin: 30px 0px;
                    th{
                        padding: 10px 20px;
                        width: 150px;
                        font-weight: bold;
                        font-size: 18px;
                        color: #777;
                        text-align: center;
                    }
                }
            }
            tbody{
                display: block;
                width: 100%;
                tr{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    td{
                        display: block;
                        width: 100%;
                        transition-duration: .3s;
                        &:hover{
                            background-color: #fafafa;
                        }
                        dl{
                            font-size: 16px;
                            display: block;
                            width: 100%;
                            color: #888;
                            dd{
                                text-align: left;
                                width: 100%;
                                box-sizing: border-box;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                padding: 15px 45px;
                                line-height: 30px;
                                font-weight: bold;
                                transition-duration: .3s;
                                &:hover{
                                    background-color: #e1e1e1;
                                }
                            }
                        }
                    }
                    &.comprehensive{
                        display: flex;
                        margin-top: 10px;
                        padding: 10px 0px 30px 0px;
                        background-color: #f1f1f1;
                        transition-duration: .3s;
                        :hover{
                            background-color: transparent;
                        }
                        td{
                            display: block;
                            width: 100px;
                            padding: 15px 45px;
                            text-align: center;
                            span{
                                font-size: 16px;
                                color: #666;
                                font-weight: bold;
                            }
                        }
                    }
                    &.result{
                        display: flex;
                        margin-top: -1px;
                        background-color: #f1f1f1;
                        :hover{
                            background-color: transparent;
                        }
                        td{
                            display: block;
                            width: 100px;
                            padding: 15px 45px;
                            text-align: center;
                            span{
                                font-size: 16px;
                                color: #666;
                                font-weight: bold;
                            }
                        }
                    }
                }
            }
        }
    }
</style>