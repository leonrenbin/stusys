<template>
    <div class="achievement">
        <h2 class="classFullName"></h2>
        <ul class="comprehensive">
            <li>
                {{ comprehensive.name }}
            </li>
            <li>
                {{ comprehensive.totalFrict }}
            </li>
        </ul>
        <div class="achievement_wrapper">
            <thead ref="thead" class="thead">
                <template v-for="item in sName">
                    <tr :key="item">
                        <th>
                            {{ item }}
                        </th>
                    </tr>
                </template>
            </thead>
            <tbody>
                <template v-for="i in totalCount">
                    <tr :key="i">
                        <th>{{ i }}</th>
                    </tr>
                </template>
            </tbody>
        </div>
        <base-footer />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import tApi from '../../api/teacher'
import BaseFooter from '../container/footer'
export default {
    components:{
        BaseFooter,
    },
    data(){
        return{
            sName: [],
            totalCount: [],
            achievementList:[],
            temp: [],
            comprehensive:{
                name: '姓名',
                totalFrict: '总分'
            },
            
        }
    },
    computed:{
        ...mapState({
            user: (state)=> state.user,
        }),
    },
    methods:{
        async getgetAchievement(){
            const res = await tApi.getAchievement({
                id: this.user.id,
            });
            if(res){
                this.achievementList = res;
                for (const key in res) {//得到学生名字
                    if(key === 'Students'){
                        for(let i = 0; i<res.Students.length; i++){
                            this.sName.push(res.Students[i].name);
                        }
                    }
                }
                for(let i = 0; i<res.Students.length; i++){
                    this.temp.push(Object.values(res.Students[i].Achievement));
                }
                //得到学生总成绩
                let count = 0;
                let frict = [];
                for(let i=0; i<this.temp.length; i++){
                    this.temp[i].splice(0,2);//去掉前两项
                    count = 0;
                    frict.push(this.temp[i])
                }
                for(let i=0; i<frict.length; i++){
                    count = 0;
                    for(let j=0; j<frict[i].length; j++){
                        count += +frict[i][j];
                    }
                    this.totalCount.push(count)
                }
            }else{
                return;
            }
        },
        textColor(value){
            if(value > 60){
                return value.fontcolor('#f38')
            }
            return value;
        },
    },
    mounted(){
        this.getgetAchievement();
    },
}
</script>

<style lang="less">
    .achievement{
        width: 100%;
        .classFullName{
            font-weight: bold;
            font-size: 20px;
            margin-bottom: 30px;
        }
        .achievement_wrapper{
            width: 100%;
            display: flex;
            padding: 30px;
            border-radius: 4px;
            background-color: #fcfcfc;
            thead{
                width: 30%;
                tr{
                    width: 100%;
                    display: block;
                    th{
                        width: 100%;
                        display: block;
                        line-height: 48px;
                        font-weight: bold;
                        color: #666;
                        background-color: #f1f1f1;
                        margin-bottom: 10px;
                        box-sizing: border-box;
                        cursor: default;
                        transition-duration: .3s;
                        &:hover{
                            color: #444;
                            font-size: 24px;
                        }
                    }
                }
            }
            tbody{
                width: 30%;
                tr{
                    width: 100%;
                    display: block;
                    th{
                        width: 100%;
                        display: block;
                        line-height: 48px;
                        box-sizing: border-box;
                        font-weight: bold;
                        color: #666;
                        text-align: center;
                        background-color: #f1f1f1;
                        margin-bottom: 10px;
                        cursor: default;
                        transition-duration: .3s;
                        &:hover{
                            color: #444;
                            font-size: 24px;
                        }
                    }
                }
            }
        }
        .comprehensive{
            width: 100%;
            display: flex;
            margin-bottom: 20px;
            li{
                width: 30%;
                text-align: center;
                font-weight: bold;
                color: #555;
                font-size: 20px;
            }
        }
    }
</style>