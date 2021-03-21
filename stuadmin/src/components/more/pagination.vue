<template>
<!-- 翻页插件 -->
    <div class="pagination" @click="handleClick($event)">
    </div>
</template>

<script>
import pagination from '@/util/pagination'
export default {
    props:['nowIndex','allData'],
    data(){
        return{
            currentPage: this.nowIndex,
        }
    },
    mounted(){
        console.log(this.allData);
        const wrap = document.querySelector('.pagination');
        const wrapper = pagination({
            wrap: wrap,
            currentPage: this.nowIndex + 1,
            allPage: Math.round(this.allData / 100),
        })
        wrap.appendChild(wrapper);
    },
    methods:{
        handleClick(e){
            const result = this.bindEvent(e);
            this.$emit('handleChange',result)
        },
        bindEvent(e){
            const nums = document.querySelectorAll('.my_swiper_page .num');
            if(e.target.classList.contains('prev')){
                this.currentPage --;
            }else if(e.target.classList.contains('num')){
                this.currentPage = e.target.innerText;
                for(let i=0; i< nums.length; i++){
                    nums[i].classList.remove('current');
                }
                nums[this.currentPage - 1].classList.add('current');
            }else if(e.target.classList.contains('next')){
                this.currentPage ++;
            }
            return this.currentPage;
        }
    },
}
</script>

<style lang="less">
    .pagination{
        width: 100%;
        height: 100%;
        .my_swiper_page{
            width: 100%;
            // line-height: 40px;
            display: flex;
            justify-content: center;
            box-sizing: border-box;
            li{
                padding: 4px 9px;
                border-radius: 4px;
                transition-duration: .2s;
                border: 1px solid #ccc;
                margin: 12px 10px;
                cursor: pointer;
                font-size: 14px;
                &:hover{
                    border-color: #00a1d6;
                }
                &.current{
                    border: 2px solid #00a1d6;
                }
            }
        }
    }
</style>