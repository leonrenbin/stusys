<template>
  <!-- 首页轮播图 -->
    <div class="homeCarousel" ref="homecarousel">
        <div class="carouselPosiWrap">
            <div class="carouselPosiBox">
                <li class="item" 
                    v-for="item in carouselData" 
                    :key="item.id"
                >
                    <img :src="item.src" >
                </li>
            </div>
        </div>
    </div>
</template>

<script>
import CarouselMap from '@/util/CarouselMap'
export default {
    data(){
        return{
            carouselData:[
                {
                    title:'图片1',
                    src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3782014966,3390855100&fm=26&gp=0.jpg',
                    id: 1,
                },
                {
                    title:'图片2',
                    src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3402733268,4273142296&fm=26&gp=0.jpg',
                    id: 2,
                },
                {
                    title:'图片3',
                    src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2091343129,3253114330&fm=26&gp=0.jpg',
                    id: 3,
                },
                {
                    title:'图片4',
                    src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3313838802,2768404782&fm=26&gp=0.jpg',
                    id: 4,
                },
            ]
        }
    },
    methods:{
        createMap(){
            if(this.$router.history.current.path != '/index')return;
            const carouselPosiWrap = document.querySelector('.carouselPosiWrap');
            const wrap = document.querySelector('.carouselPosiBox');
            const items = document.querySelectorAll('.carouselPosiBox .item')
            const wrapper = CarouselMap({
                width: this.$refs.homecarousel.offsetWidth,
                height: this.$refs.homecarousel.offsetHeight,
                wrap: wrap,
                type: 'slide',
                icon: 'always',
                showBtn: 'need',
                domList: items,
                isAutoChange: true,
            })
            carouselPosiWrap.appendChild(wrapper);
        },
    },
    mounted(){
        this.createMap();
    },
}
</script>

<style lang="less">
    .homeCarousel{
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        .carouselPosiWrap{
            width: 100%;
            height: 100%;
            .carouselPosiBox{
                width: 100%;
                height: 100%;
                li{
                    width: 100%;
                    height: 100%;
                    img{
                        width: calc(100%);
                        height: calc(100%);
                    }
                }
            }
            .my-swiper-list{
                transition-duration: .3s;
                .my-swiper-item{
                    z-index: 1;
                    background-color: rgba(0, 0, 0, .1);
                    box-sizing: border-box;
                }
            }
            .my-swiper{
            cursor: pointer; 
            list-style: none;
            position: relative;
            overflow: hidden;
            &:hover .my-swiper-btn{
                opacity: 1;
            }
            .icon-list{
                position: absolute;
                width: 100px;
                height: 20px;
                left: 0px;
                bottom: 20px;
                display: flex;
                z-index: 1;
                span{
                    width: 16px;
                    height: 16px;
                    background-color: #fff;
                    border-radius: 50%;
                    margin: 0px 5px;
                    cursor: pointer;
                    font-size: 12px;
                    text-align: center;
                    line-height: 16px;
                    color: #fff;
                    &.active{
                        background-color: orangered;
                        color: orangered;
                        box-shadow: 0px 0px 4px rgba(0, 0, 0, .4);
                    }
                }
            }
            .my-swiper-btn{
                width: 36px;
                height: 30px;
                background-color: rgba(0, 0, 0, .1);
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                line-height: 30px;
                text-align: center;
                font-weight: bold;
                font-size: 1.5rem;
                transition-duration: .3s;
                color: #fff;
                opacity: 0;
                cursor: pointer;
                user-select: none;
                z-index: 1;
                &:hover{
                background-color: rgba(0, 0, 0, .3);
                }
                &.my-swiper-Lbtn{
                left: 0px;
                border-top-right-radius: 30%;
                border-bottom-right-radius: 30%;
                }
                &.my-swiper-Rbtn{
                right: 0px;
                border-top-left-radius: 30%;
                border-bottom-left-radius: 30%;
                }
            }
            }
        }
    }
</style>