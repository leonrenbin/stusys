<template>
    <div class="primary_navigation">
        <ul class="pri_nav">
            <template v-for="(menu,i) in router">
                <li 
                    @click="changeShowItem($event,i)"
                    class="menu_list"
                    v-if=" !menu.meta.hidden || menu.meta.role === 'all'"
                    :key="menu.name"
                >
                    <h3 class="h3Node"
                        :class="{'active': i === h3Index}"
                    >{{ menu.meta.title }}</h3>
                    <template v-for="(child, i) in menu.children">
                        <div 
                            v-if="!child.meta.hidden"
                            class="info menu_item" 
                            :key="child.meta.title"
                            @click="getBack($event, i)"
                        >
                            <router-link  :to="{name: child.name}">
                                {{ child.meta.title }}
                            </router-link>
                        </div>
                    </template>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    data(){
        return{
            showItem: false,
            h3Index: 1,
            itemIndex: 0,
            router: [],
        }
    },
    mounted(){
            this.getRouter();
    },
    computed:{
        ...mapState({
            rolesIndex:(state)=>state.rolesIndex,
            menuRoutes: (state) => state.menuRoutes,
            user: (state)=> state.user,
            crunmsRouteTitleKey: (state) => state.crunmsRouteTitleKey,
            crunmsRouteTitleVal: (state) => state.crunmsRouteTitleVal,
        }),
    },
    methods:{
        ...mapMutations(['setcrunmsRouteTitleKey','setcrunmsRouteTitleVal','setisAddOrEdit']),
        changeShowItem(e,index){
            // menu_item
            if(e.target.classList.contains('h3Node')){//若点击h3元素
                this.showItem = !this.showItem;//显示子菜单
                this.h3Index = index;//h3的索引更改
            }
        },
        getBack(e, index){
            this.itemIndex = index;
            if(e.target.innerText === '新增学生'){
                this.setisAddOrEdit(0);
            }
        },
        getRouter(){
            this.router = this.$router.options.routes;
        },
    },
    watch:{
        $route:function(){
            this.setcrunmsRouteTitleKey(this.$route.matched[0].meta.title);
            this.setcrunmsRouteTitleVal(this.$route.meta.title);
        },
    },
}
</script>

<style lang="less">
    .primary_navigation{
        width: 100%;
        height: 100%;
        .pri_nav{
            width: 100%;
            height: 100%;
            overflow-y: auto;
            background-color: rgba(102,193,140, 0.92);
            &::-webkit-scrollbar{  //改变滚动条宽高
                width:0px;
                height: 0px;
            }
            li{
                width: 100%;
                padding-top: 20px;
                h3{
                    font-size: 18px;
                    padding-left: 1rem;
                    color: #1f4172;
                    font-weight: bold;
                    transition-duration: .2s;
                    line-height: 3rem;
                    cursor: pointer;
                    &:hover{
                        background-color: #f1908c;
                    }
                    &.active{
                        background-color: #f1908c;
                    }
                }
                .info{
                    &.item_active{
                        background-color: #898989;
                        a{
                            color: #f1f1f1;
                        }
                    }
                    a{
                        text-decoration: none;
                        line-height: 1rem;
                        color: #f4f2f2;
                        font-size: 14px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: normal;
                        display:-webkit-box;
                        -webkit-box-orient:vertical;
                        -webkit-line-clamp:1;
                        cursor: pointer;
                        width: 100%;
                        padding: 0.6rem 0 0.6rem 2rem;
                        box-sizing: border-box;
                        transition-duration: .2s;
                        &:hover{
                            background-color: #f1908c;
                            color: #f1f1f1;
                        }
                    }
                }
                // &.menu_list{
                //     .info{
                //         // display: none;
                //     }
                // }
                &.show_menu_list{
                    .info{
                        display: block;
                    }
                }
            }
        }
    }
</style>