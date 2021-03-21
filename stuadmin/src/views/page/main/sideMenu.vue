<template>
    <div 
        class="sideMenu"
        :class="{
            'isShowMenu': showSideMenu
        }"
    >
        <primary-nav />
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import PrimaryNav from '@/components/sideMenu/primary_navigat'
// import secondNav from '../../../components/sideMenu/Secondary_navigation'



export default {
    components:{
        PrimaryNav,
        // secondNav,
    },
    computed:{
        ...mapState({
            showSideMenu: (state) => state.showSideMenu,
        })
    },
    methods:{
    },
    mounted(){
    }
}
</script>

<style lang="less">
    .sideMenu{
        width: 180px;
        height: 100%;
        background-color: #424242;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;
        transition-duration: .3s;
        &.isShowMenu{
            width: 80px;
        }
    }
</style>