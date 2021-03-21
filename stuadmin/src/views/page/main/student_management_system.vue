<template>
    <div class="stu_manage_main">
        <!-- 左边导航菜单 -->
        <side-nav />
        <!-- 右边显示区域 -->
        <home-page />
    </div>
</template>

<script>

import SideNav from '../main/sideMenu'
import HomePage from '../../page/main/homepage'
export default {
    components:{
        SideNav,
        HomePage,
    },
}
</script>

<style lang="less">
    .stu_manage_main{
        width: 100%;
        height: 100%;
        z-index: -1;
    }
</style>