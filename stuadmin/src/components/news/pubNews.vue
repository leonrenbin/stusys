<template>
    <div class="news_wrap">
        <div class="publish_wrap">
          <!-- 标题 -->
          <div class="pubInfo_title">
            <span>标题:</span>
            <input type="text" v-model="newsData.title">
          </div>
          <!-- 段落 -->
          <div class="pubInfo_para">
            <span>新闻内容</span>
            <div id="w_editor">
              <!-- wangeditor 插件 -->
            </div>
          </div>
          <div class="submit">
            <button @click="handleSubmit">发布</button>
            <button @click="handleCancel">取消</button>
          </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import popupPlug from '@/util/popUp'
import E from 'wangeditor'
import otherapi from '../../api/other'
import uploadApi from '../../api/upload'

export default {
  props:['changeOverSwitch'],
  data(){
    return{
      newsBox: {},
      uploadPic: false,
      years: ['2021'],
      newsData:{
        title: '',
        content:'',
      },
      domSize: 0,
    }
  },
  computed:{
  },
  methods:{
    ...mapMutations(['setshowPopup']),
    deleteImg(index){
      const list = document.querySelectorAll('.img_box .img_list');
      const imgBox = this.$refs.imgBox;
      imgBox.removeChild(list[index]);
      this.newNews.imgBox.splice(index, 1)
    },
    async handleSubmit(){//上传
      if(!this.newsData.title)return;//未填写标题
      await otherapi.upload({
        ...this.newsData
      }).then((res)=>{
        this.createPopup();
        this.editContext('')
        setTimeout(() => {
          this.handleCancel();
          var my_popUp = document.querySelector('.my_popUp');
          document.body.removeChild(my_popUp);
        }, 1500);
      })
    },
    handleCancel(){
      this.newsData.title = '';
      this.newsData.content = '';
    },
    inspect(){//检查
      if(!this.newsData.title)return;
    },
    createPopup(){//发布成功
        const popup = popupPlug({
            width: 300,
            height: 50,
            dom: '',
            content: '发布成功',
        })
        document.body.appendChild(popup);
        setTimeout(() => {
          document.body.removeChild(popup);
          location.reload();
        }, 1000);
    },
    //w_editor 插件
    editContext(content){
      const editor = new E('#w_editor');
      editor.config.uploadImgMaxSize = 10 * 1024 * 1024 // 10M
      editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
      editor.config.uploadImgMaxLength = 5 // 一次最多上传 5 个图片
      editor.config.uploadFileName = 'img'

      editor.config.customUploadImg = async(files, insert)=>{//自定义上传图片
        let formData = new FormData();
        for (const file of files) {
          formData.append('img', file);
        }
        await uploadApi.upload(formData).then(res=>{
          // console.log(res);
          const objectURL = URL.createObjectURL(res);//createObjectURL必须是一个file对象
          insert(objectURL)//将图片插入到编辑器中
        })
      }

      editor.config.uploadImgHooks = {
        customInsert: function (insertImg, result) {
          insertImg(result);
        }
      }
      editor.config.onchange = (html)=>{
        this.newsData.content = html;
      }
      editor.config.menus = [// 菜单配置
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'code', // 插入代码
        'undo', // 撤销
        'redo', // 重复
      ];
      editor.create();
      editor.txt.html(content)
    },
  },
  mounted(){
    this.editContext('');
  },
}
</script>

<style lang="less">

</style>