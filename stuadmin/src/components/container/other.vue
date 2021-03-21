<template>
  <div class="other_column">
      <!-- 学校介绍 -->
        <div class="school_introduce">
            <h2>学校介绍</h2>
            <p>
                {{ schoolIntroduce.schIntroduce }}
            </p>
        </div>
        <div class="school_elegant_demeanor">
            <h2>学校风采</h2>
            <div 
                class="full_picture"
                v-for="pic in currentPic"
                :key="pic.data"
            >
                <img :src="pic.src">
            </div>
           <ul class="thumbnail">
               <li class="item"
                    :class="{'current': i === picIndex}"
                    v-for="(item,i) in Picture"
                    :key="item.id"
                    @click="changeStyle(i)"
               >
                   <img :src="item.src" alt="">
               </li>
           </ul>
        </div>
        <div class="school_news">
            <div class="new_top">
                <h2>新闻</h2>
                <router-link :to="{name: 'NewsWrap'}">更多</router-link>
            </div>
            <p 
                v-for="(item,index) in news" 
                :key="item.id"
                @click="goNews(index)"
            >
                <router-link :to="{name: 'NewsWrap'}">> {{ item.title }}</router-link>
            </p>
        </div>
  </div>
</template>

<script>
import PictureData from '@/data/carouselData'//轮播图需要的图片数据
import otherApi from '../../api/other'

import { mapMutations, mapState } from 'vuex'
export default {
    data(){
        return{
            schoolIntroduce: '',
            Picture: PictureData,
            news: [],
            picIndex: 0,
        }
    },
    computed:{
        ...mapState({
            nowIndex: (state) => state.nowIndex,
        }),
        currentPic(){
            const pic = [];
            for(let i=0; i<PictureData.length; i++){
                pic.push(PictureData[this.picIndex]);
                return pic;
            }
        }
    },
    methods:{
        ...mapMutations(['setNewsIndex']),
        goNews(index){
            this.setNewsIndex(index);
        },
        changeStyle(i){
            this.picIndex = i;
        },
        async getSchool(){
            await otherApi.getSchool().then(res=>{
                this.schoolIntroduce = res.datas[0];
            })
        },
        async getNews(){
            await otherApi.getNews().then(res=>{
                this.news = res.datas;
            })
        },
    },
    mounted(){
        this.getSchool();
        this.getNews();
    },
}
</script>

<style lang="less">
    .other_column{
        width: 100%;
            padding: 50px 0px;
            display: flex;
            justify-content: space-between;
            .school_introduce{
                width: 33%;
                padding: 10px;
                box-sizing: border-box;
                background-image: linear-gradient(90deg, #f4f2f2 0%, #ddd1c1 100%);
                h2{
                    font-size: 20px;
                    margin-bottom: 10px;
                }
                p{
                    font-size: 16px;
                    text-indent: 2rem;
                    line-height: 26px;
                }
            }
            .school_elegant_demeanor{
                width: 33%;
                padding: 10px;
                box-sizing: border-box;
                background-image: linear-gradient(90deg, #ddd1c1 0%, #b88b6e 100%);
                h2{
                    font-size: 20px;
                    margin-bottom: 10px;
                }
                .full_picture{
                    height: 133px;
                    width: 100%;
                    overflow-y: hidden;
                    text-align: center;
                    img{
                        display: inline-block;
                        height: 100%;
                    }
                }
                .thumbnail{
                    width: 100%;
                    display: flex;
                    margin-top: 10px;
                    justify-content: center;
                    li{
                        cursor: pointer;
                        box-sizing: border-box;
                        transition-duration: .2s;
                        border-bottom: 3px solid #fff;
                        margin-right: 3px;
                        &:hover{
                            border-bottom: 3px solid #00a1d6;
                        }
                        &.current{
                             border-bottom: 3px solid #00a1d6;
                        }
                        img{
                            height: 30px;
                            width: 56px;
                        }
                    }
                }
            }
            .school_news{
                width: 33%;
                padding: 10px;
                box-sizing: border-box;
                background-image: linear-gradient(90deg, #b88b6e 0%, #b76b6a 100%);
                .new_top{
                    line-height: 30px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    h2{
                        font-size: 20px;
                        margin-bottom: 10px;
                    }
                    a{
                        text-decoration: none;
                        font-size: 14px;
                        color: #222;
                        transition-duration: .2s;
                        &:hover{
                            color: #00a1d6;
                        }
                    }
                }
                p{
                    width: 100%;
                    font-size: 14px;
                    line-height: 24px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    a{
                        text-decoration: none;
                        font-size: 14px;
                        color: #222;
                        transition-duration: .2s;
                        &:hover{
                            color: #00a1d6;
                        }
                    }
                }
            }
    }
</style>