<template>
    <div class="main_container">
        <!-- 轮播图区域 -->
        <div class="CarouselMapArea">
            <!-- 轮播图 -->
            <div class="CarouselMap">
                <home-carousel />
            </div>
            <!-- 学校介绍 -->
            <div class="introduce" v-for="s in schoolArr" :key="s.id">
                <h2>{{ s.name }}</h2>
                <p>
                   {{ s.describe }}
                </p>
            </div>
        </div>
        <!-- 公告栏 -->
        <div class="BulletoinBoard_wrap">
            <bulletion-board />
        </div>
        <!-- 其他栏目 -->
        <div class="other_column_wrap">
            <other-column />
        </div>
        <!-- 底部 -->
        <div class="footer_wrap">
            <base-footer />
        </div>
    </div>
</template>

<script>
import homeCarousel from '@/components/container/homeCarousel'
import BulletionBoard from '@/components/container/BulletinBoard'
import OtherColumn from '@/components/container/other'
import BaseFooter from '@/components/container/footer'
import otherApi from '@/api/other'
export default {
    components:{
        homeCarousel,
        BulletionBoard,
        OtherColumn,
        BaseFooter,
    },
    data(){
        return{
            schoolArr: [],
        }
    },
    methods:{
        async getSchool(){
            await otherApi.getSchool().then(res=>{
                this.schoolArr = res.datas;
            })
        },
    },
    mounted(){
        this.getSchool();
    },
}
</script>

<style lang="less">
    .main_container{
        width: 100%;
        height: 100%;
        background-color: #f9f9f9;
        .CarouselMapArea{
            background-color: #fff;
            padding-bottom: 50px;
            width: 100%;
            height: 380px;
            display: flex;
            .CarouselMap{
                width: 900px;
                height: 100%;
                transition-duration: .2s;
                @media(max-width: 1200px) {
                    width: 800px;
                    height: 330px;
                }
                @media(max-width: 1100px) {
                    width: 700px;
                    height: 295px;
                }
            }
            .introduce{
                @media(max-width: 1490px) {
                    width: calc(100% - 900px);
                    height: 100%;
                    padding: 0px 10px 10px 10px;
                    h2{
                        font-size: 1.2rem;
                        line-height: 30px;
                    }
                    p{
                        line-height: 1.2rem;
                    }
                }
                @media (max-width: 1200px) {
                    display: none;
                }
                width: calc(100% - 900px);
                height: 100%;
                margin-left: 30px;
                box-sizing: border-box;
                background-color: rgba(89,150,165,.92);
                border-radius: 4px;
                box-shadow: 1px 0px 3px rgba(150,150,150,.92);
                color: #fff;
                overflow: hidden;
                h2{
                    font-size: 1.5rem;
                    line-height: 60px;
                    text-align: center;
                    height: 60px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: #7c6364;
                    padding: 0px 40px 40px 40px;
                    background-color: rgba(185,217,231,.92);
                    box-shadow: 1px 0px 3px rgba(150,150,150,.92);
                }
                p{
                    font-size: 18px;
                    padding: 10px 40px 40px 40px;
                    background-color: rgba(89,150,165,.92);
                    height: calc(100% - 60px);
                    line-height: 1.6rem;
                    overflow: auto;
                    text-overflow: ellipsis;
                    white-space:normal;
                    &::-webkit-scrollbar{  //改变滚动条宽高
                        width: 0px;
                        height: 0px;
                    }
                }
            }
        }
        .BulletoinBoard_wrap{
            width: 100%;
            margin-top: 50px;
            background-color: #fff;
        }
        .other_column_wrap{
            width: 100%;
            background-color: #fff;
        }
        .footer_wrap{
            margin-top: 50px;
            width: 100%;
            background-color: #fff;
            padding: 20px 0px;
        }
    }
</style>
