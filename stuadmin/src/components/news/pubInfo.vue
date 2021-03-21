<template>
    <div class="pub_info">
        <div class="pub_title">
            <span>标题</span>
            <input type="text" v-model="data.title">
        </div>
        <div class="pub_content">
            <span>内容</span>
            <textarea v-model="data.content"></textarea>
        </div>
        <div class="submit">
            <button @click="handleSubmit">发布</button>
            <button @click="handleCancel">清除</button>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import popupPlug from '../../util/popUp'
import otherApi from '../../api/other.js'
export default {
    components:{

    },
    data(){
        return{
            data:{
                title: '',
                content:'',
                day: new Date().getDate(),
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1,
            },
        }
    },
    computed:{
        ...mapState({
            schoolPub:(state)=> state.schoolPub,
            popUp: (state) => state.showPopup,
        }),
    },
    mounted(){
    },
    methods:{
        ...mapMutations(['setshowPopup']),
        async handleSubmit(){
            this.setshowPopup(true);
            if(!this.data.title || !this.data.content) return;
            const res = await otherApi.postPub({...this.data})
            if(res.id){
                this.createPopup();
                const popup = document.querySelector('.my_popUp');
                setTimeout(() => {
                    this.handleCancel();
                    popup.classList.add('hideStyle');
                }, 1000);
                setTimeout(() => {
                    document.body.removeChild(popup);
                    this.setshowPopup(false);
                    location.reload();
                }, 2000);
            }
        },
        handleCancel(){
            this.data.title = '';
            this.data.content = '';
        },
        check(i){
            return i = i < 10 ? i = "0" + i : i;
        },
        createPopup(){
            const popup = popupPlug({
                width: 300,
                height: 50,
                dom: '',
                content: '发布成功',
            })
            document.body.appendChild(popup);
        },
    },
}
</script>

<style lang="less">
    .pub_info{
        width: 100%;
        .pub_title{
            width: 100%;
            margin-top: 30px;
            display: flex;
            align-items: center;
            span{
                font-size: 16px;
                font-weight: bold;
                margin-right: 10px;
            }
            input{
                width: 90%;
                border: none;
                border: 1px solid #ccc;
                border-radius: 5px;
                padding: 10px;
                box-sizing: border-box;
                font-size: 16px;
                font-weight: bold;
                letter-spacing: 2px;
                line-height: 24px;
            }
        }
        .pub_content{
            width: 100%;
            margin-top: 30px;
            display: flex;
            align-items: center;
            span{
                font-size: 16px;
                font-weight: bold;
                margin-right: 10px;
            }
            textarea{
                width: 90%;
                min-height: 150px;
                resize: none;
                border: 1px solid #ccc;
                border-radius: 5px;
                padding-left: 10px;
                font-weight: bold;
                box-sizing: border-box;
                font-size: 16px;
                letter-spacing: 2px;
                line-height: 24px;
            }
        }
        .submit{
            margin-top: 20px;
            text-align: center;
            button{
                padding: 3px 20px;
                margin: 0px 10px;
                border: none;
                border-radius: 4px;
                background-color: #fff;
                border: 1px solid #ccc;
                transition-duration: .2s;
                cursor: pointer;
                &:hover{
                    border-color: #00a1d6;
                }
            }
        }
    }
</style>