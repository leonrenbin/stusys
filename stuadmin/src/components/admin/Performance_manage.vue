<template>
<!-- 成绩管理 -->
  <div class="Performance_manage">
      <div class="scroolBar">
        <span 
          @mousedown="handleDown($event)" 
          class="spanbar"
        ></span>
        <!-- <i class="icon" @click="scroolMove"></i> -->
      </div>
      <div class="manage_container container" ref="container">
        <thead ref="thead">
            <tr v-if="subjects.value">
              <th>学生id</th>
            </tr>
            <tr v-if="subjects.value">
              <th>姓名</th>
            </tr>
            <tr v-if="subjects.value">
              <th>学号</th>
            </tr>
          <tr v-for="item in subjects.value" :key="item">
            <th>{{ item }}</th>
          </tr>
        </thead>
        <tbody ref="tbody">
          <tr v-for="data in allData" :key = data.id>
            <td>{{ data.id }}</td>
            <td>{{ data.name }}</td>
            <td>{{ data.sNo }}</td>
            <td v-for="item in data.Achievement" :key="item.id">
              {{item}}
            </td>
          </tr>
        </tbody>
      </div>
      <!-- 翻页插件 -->
      <div class="plug_in_wrap" 
        ref="plug"
        @click="handlePlugin($event)"
      >
      </div>
      <base-footer />
  </div>
</template>

<script>
import pagination from '../../util/pagination' //引入翻页插件
import sapi from '../../api/student'
import BaseFooter from '../container/footer'

export default {
  components:{
    BaseFooter,
  },
  data(){
    return{
      nowIndex: 1,
      allData: [],
      subjects: {},
      fricts: [],
      total: 0,

      disx: 0,
      movex: 0,
      scroolPosition: 0,
    }
  },
  computed:{
  },
  async mounted(){
    await this.getAllData().then(()=>{
      setTimeout(() => {
        this.initStyle();
        this.plugStartUp();//引用翻页插件
      }, 1500);
    })
  },
  methods:{
    async getAllData(){//初始化数据
      await sapi.getAllStuAchieve({
        params:{
          page: this.nowIndex,
          limit: 100,
        }
      }).then(res=>{
        this.total = res.total;
        this.allData = res.datas;
        for(let i=0; i<res.datas.length; i++){
          let frict = {};
          this.subjects = {value: Object.keys(res.datas[i].Achievement), id: i}
          frict = {value: Object.values(res.datas[i].Achievement), id: i}
          this.fricts.push(frict)
        }
      })
    },
    initStyle(){//初始化样式
      const headWidth = this.$refs.thead.offsetWidth;
      const hTrs = document.querySelectorAll('.container thead tr');
      for(let i=0; i<hTrs.length; i++){
        hTrs[i].style.width = headWidth / hTrs.length + 'px';
      }

      const bTds = document.querySelectorAll('.container tbody tr td');
      for(let i=0; i<bTds.length; i++){
        bTds[i].style.width = headWidth / hTrs.length + 'px';
      }
    },
    handleDown(e){//拖拽
      const scroolBar = document.querySelector('.scroolBar')
      const spanbar = document.querySelector('.scroolBar .spanbar')
      this.disx = e.pageX - spanbar.offsetLeft;
      const self = this;
      document.onmousemove = function(e){
        self.movex = e.pageX - self.disx;
        spanbar.style.left = self.movex + 'px';
        if(self.movex <= 0){
          self.movex = 0;
          spanbar.style.left = 0 + 'px';
        }
        if(self.movex >= scroolBar.offsetWidth - spanbar.offsetWidth){
          self.movex = scroolBar.offsetWidth - spanbar.offsetWidth;
          spanbar.style.left = scroolBar.offsetWidth - spanbar.offsetWidth + 'px';
        }
        document.onmouseup = function(e){
          this.onmousemove = null;
        }
      }
    },
    async handlePlugin(e){//点击翻页插件小按钮
      const nums = document.querySelectorAll('.plug_in_wrap .num')
      const index = this.changeIndex(e,nums);
      this.nowIndex = index;
      this.allData = [];
      this.getAllData().then(()=>{
        this.initStyle();
        this.plugStartUp();
        this.schollTOBotton();
      })
    },
    changeIndex(e,nums){//得到nowindex索引
      if(e.target.classList.contains('plug_in_wrap')) return 0;
      if(e.target.classList.contains('prev')){
        if(this.nowIndex === 1 && this.nowIndex < 1){
          this.nowIndex = 1;
        }else{
          this.nowIndex --;
        }
      }else if(e.target.classList.contains('next')){
        if(this.nowIndex >= nums.length){
          this.nowIndex = nums.length;
        }else{
          this.nowIndex ++;
        }
      }else if(e.target.classList.contains('num')){
        this.nowIndex = e.target.innerText;
      }else{
        return this.nowIndex;
      }
      return this.nowIndex;
    },
    plugStartUp(){//引用翻页插件
      const plug = this.$refs.plug;
      plug.innerHTML = '';
      const theadWidth = this.$refs.thead.offsetWidth;
      const trs = document.querySelectorAll('.container thead tr th');
      for(let i=0; i<trs.length; i++){//thead->th的宽度
        trs[i].style.width = theadWidth / trs.length + 'px';
      }
      const wrapper = pagination({
        allPage: Math.ceil(this.total / 100),
        currentPage: this.nowIndex,
        wrap: plug,
      })
      plug.appendChild(wrapper);
    },
    schollTOBotton(){
      let manage_container = document.querySelector('.manage_container')
      setTimeout(() => {
        document.documentElement.scrollTop = manage_container.offsetHeight;
      }, 100);
    },
  },
}
</script>

<style lang="less">
  .Performance_manage{
    width: 100%;
    overflow: auto;
    padding-left: 20px;
    box-sizing: border-box;
    .scroolBar{
      width: 100%;
      height: 20px;
      background-color: #f1f1f1;
      border-radius: 10px;
      position: relative;
      overflow: hidden;
      i.icon{
        display: block;
        width: 30px;
        height: 20px;
        background-color: #f38;
        position: absolute;
        right: 10px;
        top: 0px;
        cursor: pointer;
      }
      span{
        position: absolute;
        left: 0px;
        top: 0px;
        display: block;
        width: 100px;
        height: 100%;
        background-color: #ccc;
        border-radius: 10px;
        cursor: pointer;
      }
    }
    .manage_container{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      overflow: auto;
      padding-right: 5px;
      &::-webkit-scrollbar{
          width: 0px;
          height: 20px;
      }
      thead{
        display: flex;
        height: 50px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 10px;
        line-height: 50px;
        tr{
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 0px 10px;
          th{
            display: block;
            width: 100%;
            text-align: center;
            cursor: default;
            font-size: 16px;
            font-weight: bold;
            color: #666;
            user-select: none;
          }
        }
      }
      tbody{
        display: flex;
        flex-wrap: wrap;
        line-height: 50px;
        tr{
          width: 100%;
          display: flex;
          background-color: #fff;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:nth-of-type(2n+1){
            background-color: #f9f9f9;
          }
          &:hover{
            background-color: #efefef;
          }
          td{
            width: 100%;
            display: block;
            text-align: center;
            padding: 0px 10px;
            line-height: 50px;
            cursor: default;
            font-size: 16px;
            font-weight: bold;
            color: #666;
          }
        }
      }
    }
    .plug_in_wrap{
      background-color: #fafafa;
    }
  }
</style>