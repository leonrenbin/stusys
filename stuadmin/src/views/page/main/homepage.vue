<template>
    <div 
        class="home_page"
        :class="{'isShowMenu': showMenu}"
    >
        <!-- 面包屑导航 -->
        <base-crumbs />
        <!-- 内容区域 -->
        <div class="container">
            <main-content />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseCrumbs from '@/components/container/crumbs'
import MainContent from '@/components/container/main-content'

export default {
    components:{
        BaseCrumbs,
        MainContent,
    },
    computed:{
        ...mapState({
            showMenu: (state) => state.showSideMenu,
        })
    },
    mounted(){
        // console.log(this.showMenu)
    },
}
</script>

<style lang="less">
    .home_page{
        width: 100%;
        // background-color: #f1f1f1;
        padding-left: 190px;
        padding-right: 100px;
        box-sizing: border-box;
        transition-duration: .3s;
        background-color: #fff;
        &.isShowMenu{
            padding-left: 90px;
        }
        .container{
            width: 100%;
            height: 100%;
            box-sizing: border-box;
        }
    }
</style>