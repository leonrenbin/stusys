<template>
  <div class="stu_status_wrap">
    <div class="stu_status">
      <div class="search_area">
        <label for="search_sNo">
          <span>搜索:</span>
          <input type="text" v-model="sTuSno" id="search_sNo" placeholder="输入学号搜索">
          <button @click="searchStu">搜索</button>
        </label>
        <div class="addStu" @click="goAddStu()">
          <router-link :to="{name: 'AddStatus'}">新增学生</router-link>
        </div>
      </div>

      <div class="container">
        <thead ref="thead" id="theadarea">
          <tr v-for="item in theadArea" :key="item">
            <th>{{ item }}</th>
          </tr>
        </thead>
        <tbody class="tbody" @click="editOrDelete($event)" ref="tbody"></tbody>
      </div>
      <div class="backToTop" @click="backToTop()">
        <a>回到顶部</a>
      </div>
      <!-- 翻页插件 -->
      <div class="plug-in_unit" 
        ref="plug"
        :class="{'special': showCancel}"
        @click="handlePlugin($event)"
      >
      </div>
    </div>
    <base-footer class="basefooter" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import pagination from '@/util/pagination' 
import BaseFooter from '@/components/container/footer'
import api from '../../api/student'
export default {
  components:{
    BaseFooter,
  },
  data(){
    return{
      nowIndex: 1,
      theadArea:[
        '序号','姓名','性别','学号','出生日期','民族','家庭地址','联系电话','操作'
      ],
      tbodyArea:[],
      total: 0,
      sTuSno: '',
      showCancel: false,
    }
  },
  created(){
      
  },
  computed:{
    getBirthday(){
      return new Date().getTime();
    },
  },
  methods:{
    ...mapMutations(['setupdateStuData','setisAddOrEdit']),
    async getData(){//初始化
      await api.getStudents().then(res=>{
        if(res){
          this.total = res.total;
          const tbody = document.querySelector('.tbody');
          if(tbody.classList.contains('special')){
            tbody.classList.remove('special')
          }
          tbody.innerHTML = '';
          for(let i=0; i<res.datas.length; i++){
            let html = document.createElement('tr')
            html.className = 'stuInfoItem';
            html.innerHTML = `
                <td>${res.datas[i].id}</td>
                <td>${res.datas[i].name}</td>
                <td>${res.datas[i].sex ? '男' : '女'}</td>
                <td>${res.datas[i].loginId}</td>
                <td>${res.datas[i].birthday}</td>
                <td>${res.datas[i].native}</td>
                <td>${res.datas[i].address}</td>
                <td>${res.datas[i].mobile}</td>
                <td>
                  <div class="edit ${res.datas[i].id}">编辑</div>
                  <div class="delete ${res.datas[i].id}">删除</div>
                </td>
            `;
            tbody.appendChild(html)
          }
          this.sTuSno = '';
        }
      })
    },
    async handlePlugin(e){//点击翻页插件
      const nums = document.querySelectorAll('.plug-in_unit .num')
      const index = this.changeIndex(e,nums);
      if(index < 1)return;
      await api.getStudents({
        params:{
          page: index,
        }
      }).then(res=>{
        this.tbodyArea = res.datas;
      })
      
      this.nowIndex = index;
      for(let i=0; i<nums.length; i++){
        nums[i].classList.remove('current');
      }
      nums[this.nowIndex - 1].classList.add('current');
    },
    changeIndex(e,nums){//获得翻页索引
      if(e.target.classList.contains('plug-in_unit')) return 0;
      if(e.target.classList.contains('prev')){
        if(+this.nowIndex === 1 && +this.nowIndex < 1){
          this.nowIndex = 1;
          return this.nowIndex;
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
      }else if(e.target.classList.contains('cancel')){
        this.getData();
        this.nowIndex = 1;
      }else{
        return this.nowIndex;
      }
      return this.nowIndex;
    }, 
    editOrDelete(e){
      if(e.target.classList.contains('edit')){
        let id = +e.target.classList[1];
        this.editStatus(id);
      }else if(e.target.classList.contains('delete')){
        let id = +e.target.classList[1];
        let isDelete = window.confirm('你定要删除这名学生吗?')
        if(isDelete){
          this.deleteStatus(id);
        }
      }
    },
    editStatus(id){//编辑按钮
      this.setupdateStuData(id);
      this.setisAddOrEdit(1);
      this.$router.push({
        name: 'AddStatus',
      })
    },
    async deleteStatus(id){//删除
      const res = await api.deleteStudent({id})
      if(res){
        this.getData();
      }
    },
    setWidth(){//初始化设置宽度
      const theadWidth = this.$refs.thead.offsetWidth;
      const trs = document.querySelectorAll('.container thead tr th');
      for(let i=0; i<trs.length; i++){//thead->th的宽度
        trs[i].style.width = theadWidth / trs.length + 'px';
      }
    },
    plugStartUp(total,nowIndex){//加载翻页插件
      const plug = this.$refs.plug;
      plug.innerHTML = '';
      const wrapper = pagination({
        allPage: Math.ceil(total / 100),
        currentPage: nowIndex,
        wrap: plug,
      })
      if(this.showCancel){
        const spanDom = document.createElement('span')
        spanDom.innerHTML = '取消'
        spanDom.className = 'cancel'
        plug.appendChild(spanDom);
      }
      plug.appendChild(wrapper);
      const no1 = document.querySelector('.plug-in_unit .my_swiper_page .num')
      no1.click();
    },
    backToTop(){
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    goAddStu(){
      this.setisAddOrEdit(0);
    },
    async searchStu(){//搜索学生
      await api.getbysno({
        params:{
          sNo: this.sTuSno
        }
      }).then(res=>{
        const tbody = document.querySelector('.tbody');
        tbody.innerHTML = '';
        const html = document.createElement('tr')
        html.className = 'stuInfoItem';
        html.innerHTML = `
            <td>${res.id}</td>
            <td>${res.name}</td>
            <td>${res.sex}</td>
            <td>${res.loginId}</td>
            <td>${res.birthday}</td>
            <td>${res.native}</td>
            <td>${res.address}</td>
            <td>${res.mobile}</td>
            <td>
              <div class="edit" @click="editStatus${res.id}">编辑</div>
              <div class="delete" @click="deleteStatus${res.id}">删除</div>
            </td>
        `;
        tbody.appendChild(html)
        this.showCancel = true;
        this.plugStartUp(1,1);
      })
    },
  },
  mounted(){
    this.getData();
    this.setWidth();
    this.plugStartUp(this.total, this.nowIndex);
  },
}
</script>

<style lang="less">
  @import url('@/assets/css/pagination.less');
  .stu_status_wrap{
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #fafafa;
    .stu_status{
      width: 100%;
      .search_area{
        width: 100%;
        height: 50px;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        padding: 0px 20px;
        box-sizing: border-box;
        label{
          line-height: 50px;
          span{
            font-size: 14px;
            margin-right: 10px;
          }
          #search_sNo{
            border: none;
            border: 1px solid #cccccc;
            font-size: 12px;
            line-height: 20px;
            border-radius: 4px;
            background-color: #fff;
            margin-right: 10px;
            padding-left: 10px;
            box-sizing: border-box;
          }
          button{
            border: none;
            border: 1px solid #cccccc;
            line-height: 20px;
            font-size: 12px;
            border-radius: 4px;
            background-color: #fff;
            margin-right: 10px;
            cursor: pointer;
            transition-duration: .2s;
            &:hover{
              border-color: #00a1d6;
            }
          }
        }
        .addStu{
          border: 1px solid #666;
          padding: 5px 15px;
          border-radius: 6px;
          transition-duration: .2s;
          height: 18px;
          a{
            text-decoration: none;
            color: #323232;
            font-size: 14px;
            cursor: pointer;
            transition-duration: .2s;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          &:hover{
            border-color: #00a1d6;
            a{
              color: #00a1d6;
            }
          }
        }
      }
      .container{
        margin-top: 50px;
        width: 100%;
        background-color: #fff;
        thead{
          display: flex;
          width: 100%;
          padding: 20px 0px;
          border-bottom: 1px solid #ddd;
          tr{
            width: 100%;
            padding: 8px 0px;
            display: flex;
            justify-content: space-between;
            th{
              font-size: 16px;
              text-align: left;
              font-weight: bold;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        tbody{
          display: block;
          width: 100%;
          padding: 20px 0px;
          tr{
            width: 100%;
            padding: 10px 0px;
            background-color: #fafafa;
            margin-bottom: 10px;
            display: flex;
            transition-duration: .2s;
            justify-content: space-between;
            &:hover{
              background-color: #f1f1f1;
            }
            &.current{
              td{
                font-weight: bold;
                div{
                  font-weight: bold;
                }
              }
            }
            td{
              font-size: 14px;
              padding: 0px 10px;
              // overflow: auto;
              box-sizing: border-box;
              cursor: default;
              width: 100%;
              text-align: center;
              display: flex;
              line-height: 1.1rem;
              &::-webkit-scrollbar{//改变滚动条宽高
                width: 0px;
                height: 0px;
              }
              div{//操作
                float: left;
                margin-right: 10px;
                height: 16px;
                padding: 1px 10px;
                border: 1px solid #ccc;
                border-radius: 4px;
                font-size: 12px;
                transition-duration: .2s;
                cursor: pointer;
                &:hover{
                  border: 1px solid #00a1d6;
                }
              }
            }
          }
        }
      }
      .plug-in_unit{
        margin-top: 50px;
        width: 100%;
        overflow: hidden;
        height: 50px;
        line-height: 50px;
        background-color: #fff;
        &.special{
          display: flex;
          justify-content: center;
          span{
            display: block;
            height: 20px;
            line-height: 20px;
            padding: 0px 5px;
            margin-top: 11px;
            font-size: 14px;
            border: 2px solid #00a1d6;
            margin-right: 10px;
            border-radius: 4px;
            transition-duration: 0.2s;
            cursor: pointer;
          }
          ul.my_swiper_page{
            width: 50px;
            display: inline-block;
            text-align: center;
            padding: 0;
          }
        }
      }
      .backToTop{
        position: fixed;
        bottom: 100px;
        right: 50px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 14px;
        transition-duration: .3s;
        cursor: pointer;
        a{
          text-decoration: none;
          color: #666;
          font-weight: bold;
          transition-duration: .3s;
        }
        &:hover{
          border: 1px solid #00a1d6;
          a{
            color: #00a1d6;
          }
        }
      }
    }
  }
  
</style>