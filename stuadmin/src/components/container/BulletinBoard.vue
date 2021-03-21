<template>
    <div class="BulletionBoard">
      <!-- 公告 -->
        <div class="BulletionBoard_top">
            <h1>公告</h1>
        </div>
        <div class="BulletionBoard_content">
            <!-- 操作手册 -->
            <div class="operationManual"></div>
            <div class="notice_item">
                <div class="paragraph_wrap"
                    :class="{'showMore': showMoreTitle}"
                >
                    <p
                        v-for="(item,i) in allData"
                        :key="item.time"
                        :class="{'current': i === nowIndex}"
                        @click="changeIndex(i)"
                    >{{ item.title }}</p>
                </div>
                
                <span
                    @click="viewMoreTitle"
                >{{ showMoreTitle ? '收起' : '更多...' }}</span>
            </div>
        </div>
  </div>
</template>

<script>
import BasePagination from '@/components/more/pagination'
import otherApi from '../../api/other'
import { mapState,mapMutations } from 'vuex'
export default {
    components:{
        BasePagination,
    },
    data(){
        return{
            readMore: false,
            showMoreTitle: false,
            allData: [],
            dataList: [],
        }
    },
    computed:{
        ...mapState({
            nowIndex: (state)=> state.pubIndex,
        }),
    },
    methods:{
        ...mapMutations(['setPubIndex']),
        showMore(){
            this.readMore = !this.readMore;
        },
        tool(i){
            return i = i<10 ? '0' + i : i;
        },
        changeIndex(i){
            this.setPubIndex(i);
            this.readMore = true;
            this.renderHTML();
        },
        viewMoreTitle(){
            this.showMoreTitle = !this.showMoreTitle;
        },
        renderHTML(){
            const operationManual = document.querySelector('.operationManual');
            operationManual.innerHTML = '';
            const html = `
                <div class="today">
                    <div class="clip clip1"></div>
                    <div class="clip clip2"></div>
                    <div class="panel">
                        <p>${this.tool(this.allData[this.nowIndex].day)}</p>
                        <div>
                            <span>${this.tool(this.allData[this.nowIndex].year)}-</span>
                            <span>${this.tool(this.allData[this.nowIndex].month)}</span>
                        </div>
                    </div>
                </div>
                <!-- 文字 -->
                <div class="title">
                    <h4>${this.tool(this.allData[this.nowIndex].title)}</h4>
                    <p>${this.tool(this.allData[this.nowIndex].content)}</p>
                </div>
            `;
            operationManual.innerHTML = html;
        },
        async getPublish(){
            await otherApi.getPublist().then(res=>{
                this.allData = res.datas;
                for(let i=0; i<this.allData.length; i++){
                    this.dataList = this.allData[this.nowIndex];
                    return this.dataList;
                }
            })
            this.renderHTML();
        },
    },
    mounted(){
        this.getPublish();
    },
}
</script>

<style lang="less">
    .BulletionBoard{
        .BulletionBoard_top{
            display: flex;
            justify-content: space-between;
            line-height: 1.5rem;
            h1{
                font-size: 1.5rem;
                font-weight: 300;
            }
        }
        .BulletionBoard_content{
            width: 100%;
            padding-bottom: 40px;
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            .operationManual{
                width: 50%;
                height: 100%;
                display: flex;
                flex-wrap: wrap;
                background-color: rgba(106,169,183,.92);
                background-image: linear-gradient(90deg, #6aa9b7 70%, #fff 100%);
                padding: 10px;
                box-sizing: border-box;
                border-radius: 4px;
                .today{
                    width: 60px;
                    height: 70px;
                    padding: 2px;
                    background-color: rgb(155,132,156);
                    border-radius: 4px;
                    margin-right: 10px;
                    position: relative;
                    box-shadow: 0px -1px 3px rgba(0, 0, 0, .4);
                    .clip{
                        position: absolute;
                        width: 4px;
                        height: 8px;
                        top: -7px;
                        border: 4px solid #f9f9f9;
                        box-shadow: 0px -1px 3px rgba(0, 0, 0, .4);
                        border-radius: 6px;
                        &.clip1{
                            left: 10px;
                        }
                        &.clip2{
                            right: 10px;   
                        }
                    }
                    .panel{
                        width: 100%;
                        height: 100%;
                        color: #f4f2f2;
                        p{
                            width: 100%;
                            height: 40;
                            line-height: 50px;
                            text-align: center;
                            font-size: 24px;
                        }
                        div{
                            display: flex;
                            span{
                                display: block;
                                width: 100%;
                                font-size: 14px;
                                text-align: center;
                            }
                        }
                    }
                }
                .title{
                    width: calc(100% - 100px);
                    h4{
                        font-weight: bold;
                        font-size: 18px;
                        margin-bottom: 2rem;
                        color: #1f4172;
                        &.active{
                            color: #ff7299;
                        }
                    }
                    p{
                        display: block;
                        width: 80%;
                        overflow: hidden;
                        color: #fff;
                        font-size: 14px;
                        height: 110px;
                        overflow-y: auto;
                        text-overflow: initial;
                        white-space: normal;
                        line-height: 1.3rem;
                        padding-right: 10px;
                        text-indent: 2rem;
                        direction: ltr;
                        &::-webkit-scrollbar{  //改变滚动条宽高
                            width: 5px;
                            height: 10px;
                        }
                        &::-webkit-scrollbar-thumb{  //改变滚动条的颜色，单独添加
                            border-radius: 5px;
                            background-color: rgba(124,99,100,.4);
                        }
                    }
                }
                .details{
                    width: 100%;
                    margin-top: 40px;
                    font-size: 14px;
                    text-align: right;
                    cursor: pointer;
                    transition-duration: .2s;
                    &:hover{
                        color: #00a1d6;
                    }
                }
            }
            .notice_item{
                width: 50%;
                text-align: right;
                background-color: rgba(106,169,183,.92);
                border-radius: 4px;
                background-image: linear-gradient(-90deg, #8dd3fb 70%, #fff 100%);
                .paragraph_wrap{
                    height: 125px;
                    overflow-y: hidden;
                    padding-right: 5px;
                    &.showMore{
                        overflow: auto;
                    }
                    &::-webkit-scrollbar{  //改变滚动条宽高
                        width: 5px;
                    }
                    &::-webkit-scrollbar-thumb{  //改变滚动条的颜色，单独添加
                        border-radius: 5px;
                        background-color: rgba(124,99,100, .6);
                    }
                    p{
                        line-height: 1.5rem;
                        padding-right: 5px;
                        font-size: 14px;
                        cursor: pointer;
                        transition-duration: .2s;
                        color: #00a1d6;
                        &:hover{
                            color: #fff;
                        }
                        &.current{
                            color: #fff;
                        }
                    }
                }
                
                span{
                    line-height: 1.5rem;
                    font-size: 14px;
                    cursor: pointer;
                    transition-duration: .2s;
                    padding-right: 5px;
                    font-weight: bold;
                    color: #1f4172;
                    &:hover{
                        color: #00a1d6;
                    }
                }
            }
        }
        .pagination_wrap{
            width: 100%;
            height: 50px;
            background-color: #f9f9f9;
        }
    }
    
</style>