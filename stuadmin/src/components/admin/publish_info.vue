<template>
  <div class="publish_info">
      <div class="already_publish">
        <div class="alread_news">
          <h3>已经发布的新闻</h3>
          <ul class="news_item">
            <li 
              v-for="(item,index) in news" 
              :key = item.title
              @click="handleClickNews(index)"
            >
              <i class="count">{{ item.id }}</i>
              <router-link :to="{name: 'NewsWrap'}"> {{ item.title }}</router-link>
              <i class="delete" @click="deleteNews(item.id)" title="删除"></i>
            </li>
          </ul>
        </div>
        <div class="already_pub">
          <h3>已经发布的公告</h3>
          <ul class="pubLish_item">
            <li 
              v-for="(item,index) in noteceList" 
              :key = item.title
              @click="handleClickPublish(index)"
            >
              <i class="count">{{ item.id }}</i>
              <router-link :to="{name: 'Index'}"> {{ item.title }}</router-link>
              <i class="delete" @click="deletePubs(item.id)" title="删除"></i>
            </li>
          </ul>
        </div>
      </div>
      <div class="add_publish">
        <div class="publish_switch">
          <button 
            @click="handleRelease"
            :class="{'active': changeOverSwitch}"
          >发布新闻</button>
          <button 
            @click="handleShowInfo"
            :class="{'active': showNewInfo}"
          >发布新通告</button>
        </div>
        <keep-alive>
          <pub-news v-if="changeOverSwitch" />
        </keep-alive>
        <keep-alive>
          <pub-info v-if="showNewInfo" />
        </keep-alive>
      </div>
      <base-footer class="basefooter" />
  </div>
</template>

<script>
import PubNews from '../news/pubNews'
import PubInfo from '../news/pubInfo'
import BaseFooter from '@/components/container/footer'
import otherApi from '../../api/other'

import { mapState, mapMutations } from 'vuex'

export default {
  components:{
    PubNews,
    PubInfo,
    BaseFooter,
  },
  data(){
    return{
      changeOverSwitch: false,
      showNewInfo:false,
      news: [],
      noteceList: [],
    }
  },
  computed:{
    ...mapState({
      nowIndex: (state)=> state.newsIndex,
      pubIndex: (state)=> state.pubIndex,
    }),
  },
  methods:{
    ...mapMutations(['setNewsIndex','setPubIndex']),
    handleRelease(){
      this.changeOverSwitch = !this.changeOverSwitch;
      this.showNewInfo = false;
    },
    handleClickNews(index){
      this.setNewsIndex(index);
    },
    handleClickPublish(index){
      this.setPubIndex(index);
    },
    handleShowInfo(){
      this.showNewInfo = !this.showNewInfo;
      this.changeOverSwitch = false;
    },
    async getNews(){
      await otherApi.getNews().then(res=>{
        this.news = res.datas;
      })
    },
    async getPublish(){
      await otherApi.getPublist().then(res=>{
        this.noteceList = res.datas;
      })
    },
    async deleteNews(id){
      await otherApi.deleteNews({
        id: id
      }).then(res=>{
        this.getNews();
      })
    },
    async deletePubs(id){
      await otherApi.deletePubs({
        id: id
      }).then(res=>{
        this.getPublish();
      })
    },
  },
  mounted(){
    this.getNews();
    this.getPublish();
  },
}
</script>

<style lang="less">
    @import url('@/assets/css/addPublishInfo.less');
</style>