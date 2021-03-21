<template>
<!-- 新闻页面 -->
    <div class="school_news_wrap">
        <div class="newsContent_wrap">
            <!-- 新闻内容 -->
            <div 
                class="newsContent"
                v-for="news in schoolNews"
                :key="news"
            >
                <div class="newsContent_text"></div>
            </div>
        </div>
        <ul class="news_list">
            <!-- 新闻索引 -->
            <li
                v-for="(item, index) in news"
                :key="item.id"
                @click="changeIndex(index)"
                :class="{'current': index === nowIndex}"
            >
                <h2>{{ item.title }}</h2>
            </li>
        </ul>
        <div class="footer_wrap">
            <base-footer />
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import BaseFooter from '../container/footer'
import otherapi from '../../api/other'
export default {
    components:{
        BaseFooter,
    },
    data(){
        return{
            news: [],
            index : 0,
            schoolNews:[],
        }
    },
    computed:{
        ...mapState({
            nowIndex: (state) => state.newsIndex,
        }),
    },
    methods:{
        ...mapMutations(['setNewsIndex']),
        changeIndex(index){//点击索引
            this.schoolNews = [];
            this.setNewsIndex(index);
            this.schoolNews = this.news[index];
            this.renderHtml();
        },
        changeimgindex(i){
            this.index = i;
        },
        async getNews(){
            await otherapi.getNews().then(res=>{
                this.news = res.datas;
                res.datas.map(item =>{
                    if(item.id == this.nowIndex){
                        this.schoolNews = item
                    }
                })
                setTimeout(() => {
                    this.renderHtml();
                }, 10);
            })
        },
        renderHtml(){
            const newsContent_text = document.getElementsByClassName('newsContent_text')[0];
            const html = document.createElement('div');
            const title = document.createElement('h2');
            title.className = 'title';
            newsContent_text.innerHTML = '';
            title.innerText = this.schoolNews.title;
            html.innerHTML = this.schoolNews.content;
            newsContent_text.appendChild(title);
            newsContent_text.appendChild(html);
        },
    },
    mounted(){
        this.getNews();
    }
}
</script>

<style lang="less">
    .school_news_wrap{
        width: 100%;
        height: 100%;
        position: relative;
        .newsContent_wrap{
            width: calc(100% - 220px);
            height: 100%;
            .newsContent{
                width: 100%;
                .newsContent_text{
                    width: 100%;
                    padding: 0px 80px;
                    box-sizing: border-box;
                    .title{
                        font-size: 26px;
                        text-align: center;
                        line-height: 50px;
                        font-weight: bold;
                        margin-bottom: 20px;
                    }
                    h3{
                        font-size: 20px;
                        font-weight: bold;
                        line-height: 24px;
                    }
                    span{
                        font-size: 16px;
                        font-weight: bold;
                        line-height: 24px;
                    }
                    p{
                        line-height: 30px;
                        font-size: 14px;
                        text-indent: 2rem;
                    }
                }
                .newsTime{
                    text-align: right;
                    padding-right: 80px;
                    line-height: 50px;
                    font-size: 16px;
                    font-weight: bold;
                }
            }
        }
        .news_list{
            width: 220px;
            min-height: 200px;
            border-radius: 4px;
            box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
            background-color: #f9f9f9;
            padding: 10px;
            box-sizing: border-box;
            position: absolute;
            right: 0;
            top: 0;
            li{
                width: 100%;
                line-height: 24px;
                margin-bottom: 20px;
                cursor: pointer;
                &.current{
                    h2{
                        color: #00a1d6;
                    } 
                    p{
                        color: #00a1d6;
                    } 
                }
                &:hover{
                    h2{
                        color: #00a1d6;
                    } 
                    p{
                        color: #00a1d6;
                    }    
                }
                h2{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 14px;
                    font-weight: bold;
                    transition-duration: .2s;
                }
                p{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 12px;
                    transition-duration: .2s;
                    color: #666;
                }
            }
        }
        .footer_wrap{
            width: 100%;
            margin-top: 200px;
        }
    }
</style>