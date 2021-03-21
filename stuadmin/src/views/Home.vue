<template>
    <div class="home">
        <stu-manage />
    </div>
</template>

<script>
import StuManage from '../views/page/main/student_management_system'


export default {
    components:{
        StuManage,
    },
    data(){
        return{
            isLogin: false,
        }
    }
}
</script>

<style lang="less">
    ::selection{
        background-color: orangered;
        color: #fff;
    }
    .home{
        width: 100%;
        height: 100%;
    }
    // my_popUp 通知的样式
    .my_popUp{
        position: fixed;
        left: 50%;
        top: 50px;
        z-index: 100;
        width: 300px;
        line-height: 24px;
        padding: 10px 10px;
        box-sizing: border-box;
        text-align: center;
        color: #fff;
        font-weight: bold;
        font-size: 18px;
        background-color: rgb(254, 106, 0);
        border-radius: 5px;
        border: 1px solid rgb(220, 131, 110);
        box-shadow: 1px 1px 5px rgba(255, 71, 38, .3);
        opacity: 1;
        &.hideStyle{
            transform: translateY(-100px);
            transition-duration: 1s;
            transition-delay: .3s;
            opacity: 0;
        }
    }
    //翻页插件样式
    .my_swiper_page{
        width: 100%;
        // line-height: 40px;
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        text-align: center;
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
</style>