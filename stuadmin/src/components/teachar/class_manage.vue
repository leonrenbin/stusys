<template>
    <div class="class_manage">
        <thead ref="thead" class="thead">
            <tr>
                <th v-for="item in theadTitle" :key="item">{{ item }}</th>
            </tr>
        </thead>
        <tbody class="tbody">
            <!-- 全体同学 -->
            <tr v-for="(item,i) in theadContent.Students" :key="item.id">
                <th>
                    {{ item.id }}
                </th>
                <th>
                    {{ item.name }}
                </th>
                <th>
                    {{ item.sNo }}
                </th>
                <th>
                    {{ item.sex ? '男' : "女" }}
                </th>
                <th>
                    {{ item.native }}
                </th>
                <th>
                    {{ item.mobile }}
                </th>
                <th>
                    {{ currentYear-item.birthday.split('-')[0] }}岁
                </th>
                <th>
                    {{ item.address }}
                </th>
                <th class="position">
                    <span>{{ item.position === 'student' ? '' : item.position }}</span>
                    <div>
                        <select v-model="selectModel">
                            <option v-for="p in position" :key="p" :value="p">{{ p }}</option>
                        </select>
                        <i @click="handleCancel(i)" class="cancel"></i>
                    </div>
                    <button @click="postPosition(i)">确定</button>
                    <i class="icon" title="修改" @click="changeStu(i)"></i>
                </th>
            </tr>
        </tbody>
        <base-footer />
    </div>
</template>

<script>
import api from '../../api/teacher'
import sapi from '../../api/student'
import { mapState } from 'vuex'
import BaseFooter from '../container/footer'
export default {
    components:{
        BaseFooter,
    },
    data(){
        return{
            theadTitle:['id','姓名','学号','性别','民族','电话','年龄','家庭地址','职务'],
            theadContent:[],
            position: ['班长','副班长','学习委员','生活委员','普通同学'],
            selectModel: '',
        }
    },
    computed:{
        ...mapState({
            user: (state)=>state.user,
        }),
        currentYear(){
            return new Date().getFullYear();
        },
    },
    methods:{
        async getData(){
            await api.getClass({
                id: this.user.id,
            }).then(res=>{
                this.theadContent = res;
            })
            this.getWidth();
        },
        getWidth(){
            const theadWidth = this.$refs.thead.offsetWidth;
            const hth = document.querySelectorAll('.thead tr th')
            const bth = document.querySelectorAll('.tbody tr th')
            for(let i=0; i<hth.length; i++){
                hth[i].style.width = theadWidth / hth.length + 'px';
            }
            for(let i=0; i<bth.length; i++){
                bth[i].style.width = theadWidth / hth.length + 'px';
            }
        },
        changeStu(index){
            const selects = document.querySelectorAll('th.position select');
            const spans = document.querySelectorAll('th.position span');
            const btns = document.querySelectorAll('th.position button');
            const icons = document.querySelectorAll('th.position i.icon');
            const cancel = document.querySelectorAll('th.position i.cancel');
            for(let i=0; i<selects.length; i++){
                selects[i].style.display = 'none';
                spans[i].style.display = 'block';
                btns[i].style.display = 'none';
                icons[i].style.display = 'block';
                cancel[i].style.display = 'none';
            }
            selects[index].style.display = 'block';
            btns[index].style.display = 'block';
            icons[index].style.display = 'none';
            spans[index].style.display = 'none';
            cancel[index].style.display = 'block';
        },
        async postPosition(index){
            const selects = document.querySelectorAll('th.position select');
            const spans = document.querySelectorAll('th.position span');
            const btns = document.querySelectorAll('th.position button');
            const icons = document.querySelectorAll('th.position .icon');
            const cancel = document.querySelectorAll('th.position i.cancel');
            this.selectModel = selects[index].value;
            await sapi.updateStudent({
                id: this.theadContent.Students[index].id,
                position: this.selectModel
            }).then(res=>{
                setTimeout(() => {
                    selects[index].style.display = 'none';
                    btns[index].style.display = 'none';
                    spans[index].style.display = 'block';
                    icons[index].style.display = 'block';
                    cancel[index].style.display = 'none';
                    this.getData();
                }, 500);
            })
        },
        handleCancel(index){
            const selects = document.querySelectorAll('th.position select');
            const spans = document.querySelectorAll('th.position span');
            const btns = document.querySelectorAll('th.position button');
            const icons = document.querySelectorAll('th.position .icon');
            const cancel = document.querySelectorAll('th.position i.cancel');
            selects[index].style.display = 'none';
            btns[index].style.display = 'none';
            spans[index].style.display = 'block';
            icons[index].style.display = 'block';
            cancel[index].style.display = 'none';
        }
    },
    mounted(){
        this.getData();
    },
}
</script>

<style lang="less">
    .class_manage{
        width: 100%;
        .classFullName{
            padding: 10px;
            font-weight: bold;
            font-size: 20px;
        }
        thead{
            display: flex;
            width: 100%;
            tr{
                width: 100%;
                padding: 8px 0px;
                display: flex;
                margin-bottom: 30px;
                justify-content: space-between;
                th{
                    font-size: 16px;
                    text-align: left;
                    font-weight: bold;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    padding: 5px 15px;
                    text-align: center;
                }
            }
        }
        tbody{
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            tr{
                width: 100%;
                padding: 10px 0px;
                background-color: #fafafa;
                margin-bottom: 10px;
                display: flex;
                transition-duration: .2s;
                justify-content: space-between;
                &:hover{
                    background-color: #f1f1f1;
                    th{
                        i.icon{
                            opacity: 1;
                        }
                    }
                }
                th{
                    padding: 5px 15px;
                    line-height: 24px;
                    display: flex;
                    justify-content: space-around;
                    div{
                        position: relative;
                        select{
                            display: none;
                            border: none;
                            border: 1px solid #ccc;
                            border-radius: 4px;
                            padding: 0 15px 0 0px;
                            box-sizing: border-box;
                            font-size: 14px;
                            line-height: 24px;
                            overflow: hidden;
                            appearance:none;
                            -moz-appearance:none;
                            -webkit-appearance:none;
                            text-align: center;
                            text-align-last: center;
                        }
                        i.cancel{
                            display: none;
                            position: absolute;
                            right: 4px;
                            top: 8px;
                            width: 8px;
                            height: 8px;
                            cursor: pointer;
                            background-image: url('../../assets/img/cancel.png');
                            background-size: 100% 100%;
                            transition-duration: .3s;
                            &:hover{
                                background-color: #00a1d6;
                                padding: 1px;
                                border-radius: 2px;
                            }
                        }
                    }
                    button{
                        display: none;
                        border: none;
                        border: 1px solid #ccc;
                        background-color: #00a1d6;
                        color: #fff;
                        border-radius: 4px;
                        box-sizing: border-box;
                        font-size: 14px;
                        line-height: 24px;
                        cursor: pointer;
                        transition-duration: .3s;
                        &:hover{
                            background-color: #00b0c5;
                        }
                    }
                    i.icon{
                        width: 18px;
                        height: 18px;
                        display: inline-block;
                        vertical-align: middle;
                        cursor: pointer;
                        background-image: url('../../assets/img/edit.png');
                        background-size: 100% 100%;
                        transition-duration: .3s;
                        opacity: 0;
                        &:hover{
                            background-color: #e1e1e1;
                        }
                    }
                }
            }
        }
    }
</style>