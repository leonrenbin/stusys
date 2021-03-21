<template>
<!-- 面包屑导航 -->
    <div class="crunms_nav">
        <div class="crunms_left">
            <div class="changeMenu">
                <button @click="changeMenu">
                    {{ isShowMenu ? '展开&gt;' : '&lt;收起' }}
                </button>
            </div>
            <div class="crunms_path">
                <div class="crunms_path_title">
                    <span class="text">{{ crunmsRouteTitleKey }}</span>
                    <span>></span>
                    <span class="text">{{ crunmsRouteTitleVal }}</span>
                </div>
            </div>
        </div>
        <div class="searchArea">
            <input type="text" @input="getSearchData" placeholder="搜索..." v-model="searchContent">
            <button @click="handleSearch">搜索</button>
            <ul class="searchResult" v-if="showSearchBox">
                <template v-for="t in result_tea">
                    <li 
                        class="result_tea" 
                        :key="t.id" 
                        v-if="result_tea != []"
                        v-html="fontColor(searchContent, t.name)"
                        @click="gogogo(t.name,'teacher')"
                        title="学校老师"
                    >{{ t.name }}</li>
                </template>
                <li 
                    class="result_stu" 
                    v-if="result_stu != []"
                    @click="gogogo(result_stu.id,'student')"
                >{{ result_stu.name }}</li>
                <template v-for="n in result_news">
                    <li 
                        class="result_news" 
                        :key="n.id" 
                        v-if="result_news != []"
                        v-html="fontColor(searchContent, n.title)"
                        @click="gogogo(n.id,'news')"
                    >{{ n.title }}</li>
                </template>
                <template v-for="p in result_pubs">
                    <li 
                        class="result_pubs" 
                        :key="p.id" 
                        v-if="result_pubs != []"
                        v-html="fontColor(searchContent, p.title)"
                        @click="gogogo(p.id-1,'publish')"
                    >{{ p.title }}</li>
                </template>
            </ul>
        </div>
        <div class="crunms_right">
            <user-avatar />
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import userAvatar from '../container/userAvatar'
import sapi from '../../api/student'
import tapi from '../../api/teacher'
import oapi from '../../api/other'
export default {
    components:{
        userAvatar,
    },
    data(){
        return{
            isShowMenu: false,
            searchContent: '',
            result_stu: [],
            result_tea: [],
            result_news: [],
            result_pubs: [],
            showSearchBox: false,
            timer: null,
        }
    },
    mounted(){
        if(this.postRole == ''){
            this.$router.push({
                name: 'Index'
            })
        }
    },
    computed:{
        ...mapState({
            crunmsRouteTitleKey: (state) => state.crunmsRouteTitleKey,
            crunmsRouteTitleVal: (state) => state.crunmsRouteTitleVal,
            user: (state)=> state.user,
            postRole: (state)=> state.postRole,
        })
    },
    methods:{
        ...mapMutations(['changeShowSideMenu','setNewsIndex','setPubIndex','setTeacherName','setStudentId','setPostRole']),
        changeMenu(){
            this.isShowMenu = !this.isShowMenu;
            this.changeShowSideMenu(this.isShowMenu);
        },
        async handleSearch(){
            if(!this.searchContent)return;
            this.result_stu = [];
            this.result_tea = [];
            this.result_news = [];
            this.result_pubs = [];
            await tapi.getTeacherByName({//老师名字
                params:{
                    name: this.searchContent,
                }
            }).then(res=>{
                if(res.datas.length > 0){
                    this.result_tea = res.datas;
                    this.showSearchBox = true;
                }
            })
            await sapi.getbysno({//学号
                params:{
                    sNo: this.searchContent
                }
            }).then(res=>{
                if(res){
                    this.result_stu = res;
                    this.showSearchBox = true;
                }
            })
            await oapi.getNewsByName({//新闻
                params:{
                    title: this.searchContent
                }
            }).then(res=>{
                if(res.datas.length > 0){
                    this.result_news = res.datas;
                    this.showSearchBox = true;
                }
            })
            await oapi.getPubsByName({//公告
                params:{
                    title: this.searchContent
                }
            }).then(res=>{
                if(res.datas.length > 0){
                    this.result_pubs = res.datas;
                    this.showSearchBox = true;
                }
            })
            setTimeout(() => {
                this.showSearchBox = false;
            }, 8000);
        },
        fontColor(searchContent, name){
            const reg = new RegExp(searchContent, 'g');
            return name.replace(reg, searchContent.fontcolor('red'));
        },
        gogogo(params,type){
            this.showSearchBox = false;
            if(type == 'teacher'){
                if(this.$router.history.current.path == '/personalinfo' && this.postRole == 'teacher')return;
                if(this.$router.history.current.path == '/personalinfo' && this.postRole == 'student'){
                    this.setTeacherName(params)
                    this.setPostRole('teacher')
                }else{
                    this.setTeacherName(params)
                    this.setPostRole('teacher')
                    this.$router.push({
                        name: 'Personalinfo'
                    })
                }
            }else if(type == 'student'){
                if(this.user.role == 'admin'){
                    if(this.$router.history.current.path == '/personalinfo'
                    && this.postRole == 'student')return;
                    if(this.$router.history.current.path == '/personalinfo' && this.postRole == 'student'){
                        this.setPostRole('student')
                        this.setStudentId(params)
                    }else{
                        this.setPostRole('student')
                        this.setStudentId(params)
                        this.$router.push({
                            name: 'Personalinfo'
                        })
                    }
                }
            }else if(type == 'news'){
                this.setNewsIndex(params);
                this.$router.push({
                    name: 'NewsWrap'
                })
                this.result_news = [];
            }else{
                const paragraph = document.querySelectorAll('.paragraph_wrap p');
                paragraph[params].click();
                const title = document.querySelector('.operationManual .title h4');
                title.classList.add('active');
                setTimeout(() => {
                    title.classList.remove('active');
                }, 4000);
            }
        },
        getSearchData(){
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
               this.handleSearch(); 
            }, 1000);
        },
    },
}
</script>

<style lang="less">
    .crunms_nav{
        width: 97%;
        margin: 0 auto;
        padding: 10px 0px;
        box-sizing: border-box;
        display: inline-block;
        line-height: 2rem;
        justify-content: space-between;
        background-color: rgba(85,187,138,.92);
        border-radius: 6px;
        box-shadow: 0px 1px 1px rgba(85,187,138,.92);
        .crunms_left{
            display: flex;
            float: left;
            .changeMenu{
                button{
                    margin-left: 10px;
                    border:none;
                    background-color: #ba5850;
                    padding: 3px 15px;
                    cursor: pointer;
                    transition-duration: .3s;
                    border-radius: 4px;
                    color: #e4e2e2;
                    &:hover{
                        color: #fff;
                    }
                }
            }
            .crunms_path{
                margin-left: 40px;
                font-size: 14px;
                display: flex;
                .crunms_path_title{
                    span{
                        margin: 0 5px;
                        color: #1f4172;
                        cursor: pointer;
                        &.text{
                            font-weight: bold;
                            color: #1f4172;
                        }
                    }
                }
            }
        }
        .searchArea{
            float: left;
            margin-left: 100px;
            position: relative;
            input{
                border: none;
                border: 1px solid rgba(85,187,138,.92);
                padding: 5px 0px 5px 15px;
                box-sizing: border-box;
                border-radius: 4px;
                color: #555;
                width: 250px;
            }
            button{
                border: none;
                padding: 0;
                background-color: #fff;
                border: 1px solid rgba(85,187,138,.92);
                padding: 5px 10px;
                box-sizing: border-box;
                border-radius: 4px;
                color: #555;
                margin-left: 10px;
            }
            ul.searchResult{
                position: absolute;
                width: 250px;
                max-height: 200px;
                border: 1px solid #ccc;
                border-radius: 4px;
                left: 0;
                top: 35px;
                z-index: 99;
                background-color: #fff;
                li{
                    line-height: 24px;
                    padding: 1px 0px 1px 10px;
                    box-sizing: border-box;
                    font-size: 14px;
                    transition-duration: .2s;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    &:hover{
                        background-color:#f9f9f9;
                        cursor: pointer;
                    }
                }
            }
        }
        .crunms_right{
            padding: 3px 0px;
            float: right;
        }
    }
</style>