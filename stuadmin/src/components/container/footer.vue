<template>
    <div class="footer">
        <div class="leftArea">
            <div class="logo">
                <span>剪刀石头布</span>
            </div>
            <ul class="content">
                <li v-for="item in data.left" :key="item">{{ item }}</li>
            </ul>
        </div>
        <div class="rightArea">
            <ul class="content">
                <li v-for="item in data.right" :key="item">{{ item }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            data:{
                logo: 'https://gxbimage-gs.gaoxiaobang.com/uploads/institution_top_white_badge_image/link/10a292f5f85d44ee9a652122cf5050a6.png',
                left:['我的花呗','我的粑粑农场','我的能量'],
                right:['梁氏酒业','梁氏股份','梁氏保险','梁氏酒店','梁氏路运','梁氏水运'],
            }
        }
    },
}
</script>

<style lang="less">
    .footer{
        width: 100%;
        display: flex;
        line-height: 50px;
        color: #f4f2f2;
        background-color: #a57e81;
        margin-top: 100px;
        padding: 10px 0px;
        .leftArea{
            width: 50%;
            display: flex;
            .logo{
                margin-right: 50px;
                padding-top: 5px;
                span{
                    width: 190px;
                    height: 40px;
                    display: block;
                    background-color: #8e4f5f;
                    line-height: 40px;
                    text-align: center;
                    color: #fff;
                    cursor: pointer;
                }
            }
            .content{
                width: 100%;
                display: flex;
                li{
                    margin: 0px 5px;
                    font-size: 12px;
                    cursor: pointer;
                }
            }
        }
        .rightArea{
            width: 50%;
            display: flex;
            .content{
                width: 100%;
                display: flex;
                justify-content: flex-end;
                li{
                    margin: 0px 5px;
                    font-size: 12px;
                    cursor: pointer;
                }
            }
        }
    }
</style>