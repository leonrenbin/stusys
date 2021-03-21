<template>
    <!-- scree筛选 -->
    <div class="scree">
        <div class="table-scree">
            <h3>{{ tagH3Title }}</h3>
        </div>
        <ul class="select_options">
            <li>
                <span>院系</span>
                <select v-model="collage" @change="major=null,grade=null,className=null">
                    <option :value="null" disabled>请选择</option>
                    <option v-for="(item,index) in data" :key="item.id" :value="index">
                        {{ item.title }}
                    </option>
                </select>
            </li>
            <li>
                <span>专业</span>
                <select v-model="major" @change="grade=null,className=null">
                    <option :value="null" disabled>请选择</option>
                    <option v-for="(item,index) in collageList" :key="item.id" :value="index">
                        {{ item.title }}
                    </option>
                </select>
            </li>
            <li>
                <span>年级</span>
                <select v-model="grade" @change="className=null">
                    <option :value="null" disabled>请选择</option>
                    <option v-for="(item,index) in majorList" :key="item.id" :value="index">
                        {{ item.title }}
                    </option>
                </select>
            </li>
            <li>
                <span>班级</span>
                <select v-model="className">
                    <option :value="null" disabled>请选择</option>
                    <option v-for="(item,index) in gradeList" :key="item.id" :value="index">
                        {{ item.title }}
                    </option>
                </select>
            </li>
            <div class="search_wrap">
                <button @click="handleSearch">立即查询</button>
                <button @click="handleCancel">清除</button>
            </div>
        </ul>
        <div class="showContent">
            <!-- <span>{{ major }}</span> -->
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'base-scree',
    props:['data'],
    data(){
        return{
            collage: null,//存储的是索引
            major: null,
            grade: null,
            className: null,
        }
    },
    mounted(){
        
    },
    computed:{
        ...mapState({
            crunmsRouteTitleVal : (state) => state.crunmsRouteTitleVal,
        }),
        tagH3Title(){
            if(this.crunmsRouteTitleVal === '修改课表') return '课表查询'
            else if(this.crunmsRouteTitleVal === '成绩管理') return '成绩查询'
        },
        collageList(){
            return this.collage !== null ? this.data[this.collage].major : null;
        },
        majorList(){
            return (this.major !== null && this.collageList.length) ? this.collageList[this.major].grade : null;
        },
        gradeList(){
            return (this.grade !== null && this.majorList.length) ? this.majorList[this.grade].class : null;
        },
        classList(){
            return (this.className !== null && this.gradeList.length) ? this.gradeList[this.grade].class : null;
        }
    },
    methods:{
        handleSearch(){

        },
        handleCancel(){
            this.collage = null;
            this.major = null;
            this.grade = null;
            this.className = null;
        },
    },
}
</script>

<style lang="less">
    .scree{
        width: 100%;
        margin-bottom: 40px;
        .table-scree{
            width: 100%;
            h3{
                font-size: 20px;
                font-weight: bold;
                padding: 10px 0px;
            }
        }
        .select_options{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            li{
                font-size: 14px;
                cursor: pointer;
                margin-bottom: 10px;
                margin-right: 20px;
                display: flex;
                line-height: 1.5rem;
                span{
                    font-size: 14px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                select{
                    appearance: none;
                    -moz-appearance: none;
                    -webkit-appearance: none;
                    padding-right: 1.1rem;
                    width: 9rem;
                    margin-left: 10px;
                    height: 1.6rem;
                    line-height: 1.6rem;
                    padding-left: 10px;
                    background-color: #fff;
                    border: 1px solid #DDD;
                    border-radius: 4rem;
                    font-size: 0.64rem;
                }
            }
            .search_wrap{
                display: flex;
                margin-bottom: 10px;
                margin-right: 20px;
                button{
                    border: none;
                    border: 1px solid #ddd;
                    background-color: #fff;
                    border-radius: 26px;
                    padding: 0px 15px;
                    margin: 0px 5px;
                    transition-duration: .2s;
                    font-size: 12px;
                    cursor: pointer;
                    display: flex;
                    line-height: 1.5rem;
                    &:hover{
                        border-color: #00a1d6;
                    }
                }
            }
        }
        .showContent{
            display: flex;
        }
        span, button{
            user-select: none;
        }
    }
</style>