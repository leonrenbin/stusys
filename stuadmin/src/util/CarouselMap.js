//轮播图插件

//1.生成主盒子（绝对定位）
//2.根据图片数量生成小圆点用来切换ol li
//3.生成按钮
//4.生成图片元素 ul li img
//5.运动方式
//6.自动轮播
//7.结束的情况
const carouselMap = (function(){
    const Slider = function(options){
        this.width = options.width;
        this.height = options.height;
        this.wrap = options.wrap;
        this.type = options.type || 'slide'; //slide滑动或flash闪过
        this.icon = options.icon;
        this.showBtn = options.showBtn || 'need'; //need需要,hide不需要，hover悬停显示
        this.domList = options.domList || [];//轮播图列表内容
        // this.size = this.domList.length; //需要几张图片
        this.nowIndex = options.nowIndex || 0;//当前展示的图片的索引值
        this.lock = false; //锁
        this.iconPosition = options.iconPosition || 'center';//小圆点的位置
        this.autoTime = options.autoTime || 3000; //自动轮播的时间间隔
        this.dom = document.createElement('div');//1.生成主元素
        this.timer = null;//计时器
        this.isAutoChange = options.isAutoChange;//是否自动轮播
    }
    Slider.prototype.init = function(){
        this.createElement();
        this.initStyle();
        this.bindEvent();
        this.monitor();
    }
    // 创建轮播图结构
    Slider.prototype.createElement = function(){

        this.dom.style.width = this.width + "px";//主元素
        this.dom.style.height = this.height + "px";
        this.dom.className = "my-swiper";

        let ol = document.createElement('ol');//2.生成小圆点
        ol.className = 'icon-list';
        let imgDomList = document.createElement('ul');//ul,轮播图的父元素
        imgDomList.className = 'my-swiper-list';
        
        for(let i=0; i<this.domList.length; i++){
            let oLi = document.createElement('li');//图片
            oLi.className = 'my-swiper-item';
            oLi.appendChild(this.domList[i]);
            imgDomList.appendChild(oLi);

            var span = document.createElement('span');//小圆点
            span.innerText = i;
            span.className = 'icon_item'
            ol.appendChild(span);
        }

        //3.生成按钮
        let btnLeft = document.createElement('div');
        let btnRight = document.createElement('div');
        btnLeft.innerText = "<"
        btnLeft.className = "my-swiper-Lbtn my-swiper-btn"
        btnRight.innerText = `>`
        btnRight.className = "my-swiper-Rbtn my-swiper-btn"

        // 如果是轮播，复制第一张到最后一张
        // if(this.type === 'slide'){
        //     let oLi = document.createElement('li');
        //     oLi.className = 'my-swiper-item';
        //     oLi.appendChild(this.domList[this.domList.length - 1]);
        //     imgDomList.appendChild(oLi);
        // }

        this.dom.appendChild(imgDomList)
        this.dom.appendChild(ol)
        this.dom.appendChild(btnLeft)
        this.dom.appendChild(btnRight)
        this.wrap.appendChild(this.dom);
    }


    //设置样式
        //图片盒子li宽高，小圆点对齐方式，当前索引值加active
        //滑动=> 设置ul样式，li样式
        //闪烁=> 设置ul样式，li样式
        //小圆点=> 没有传递、隐藏、移入显示、一直显示
    Slider.prototype.initStyle = function(){
        let swiperList = document.querySelector('.my-swiper-list')//ul
        // console.log(this.width);
        let swiperItem = document.querySelectorAll('.my-swiper-item');//li
        for(let i=0; i<swiperItem.length; i++){
            swiperItem[i].style.width = this.width + 'px';
            swiperItem[i].style.height = this.height + 'px';
        }
        let iconList = document.querySelector('.icon-list');//小圆点盒子
        let icons = document.querySelectorAll('.icon-list span');//小圆点
        for(let i = 0; i<icons.length; i++){
            icons[this.nowIndex].classList.add('active');
        }

        if(this.type === 'slide'){//滑动
            swiperList.style.width = this.width * (this.domList.length + 1) + 'px';
            swiperList.style.height = this.height + 'px';
            swiperList.style.position = 'absolute';
            swiperList.style.left = -(this.width * this.nowIndex);
            for(let i=0; i<swiperItem.length; i++){
                swiperItem[i].style.float="left";
            }
        }else if(this.type === 'flash'){//幻灯片，一闪而过
            swiperList.style.width = this.width + 'px';
            swiperList.style.height = this.height + 'px';
            swiperList.style.position = 'relative';
            for(let i=0; i<swiperItem.length; i++){
                swiperItem[i].style.display = 'none';
                swiperItem[i].style.position = 'absolute';
            }
            swiperItem[this.nowIndex].style.display = 'block';
        }

        //小圆点样式
        if(!this.icon){//没有传入小圆点
            for(let i=0; i<icons.length; i++){
                icons[i].style.display = 'none';
            }
        }

        //设置按钮显示情况
        let btns = document.querySelectorAll('.my-swiper-btn');//按钮
        if(this.showBtn === 'hide'){//隐藏
            for(let i=0; i<btns.length; i++){
                btns[i].style.display = 'none';
            }
        }else if(this.showBtn === 'hover'){//悬停显示
            for(let i=0; i<btns.length; i++){
                btns[i].style.display = 'none';
            }
            this.dom.addEventListener('mouseenter',function(){
                for(let i=0; i<btns.length; i++){
                    btns[i].style.display = 'block';
                }
            })
        }else{//need
            for(let i=0; i<btns.length; i++){//一直显示
                btns[i].style.display = 'block';
            }
        }
    }

    //添加事件,行为
        //左右按钮添加事件
            //左按钮点击，索引--,change()切换样式
            //右按钮点击，索引++,change()切换样式
        //小圆点悬停，添加索引
        //主盒子悬停，暂停轮播，离开自动轮播，autoChange()
    Slider.prototype.bindEvent = function(){
        var self = this;
        let swiperList = document.querySelector('.my-swiper-list')//ul
        let iconList = document.querySelector('.icon-list');//小圆点盒子
        let icons = document.querySelectorAll('.icon-list span');//小圆点
        let leftBtn = document.querySelector('.my-swiper-Lbtn')//左按钮
        let rightBtn = document.querySelector('.my-swiper-Rbtn')//右按钮
        leftBtn.addEventListener('click',function(){//左按钮点击
            if(self.lock){
                return false;
            }
            self.lock = true;
            if(self.nowIndex === 0){
                self.nowIndex = self.domList.length - 1;
                if(self.type === 'slide'){
                    swiperList.style.left = -self.width * self.nowIndex + 'px';
                }
            }else{
                self.nowIndex --;
                if(self.type === 'slide'){
                    swiperList.style.left = -self.width * self.nowIndex + 'px';
                }
            }
            self.change();
        })
        rightBtn.addEventListener('click',function(){//右按钮点击
            if(self.type === 'slide'){
                if(self.lock){
                    return false;
                }
                self.lock = true;
                if(self.nowIndex === self.domList.length - 1){
                    self.nowIndex = 0;
                    swiperList.style.left = 0 + 'px';
                }else{
                    self.nowIndex ++;
                }
            }else if(self.type === 'flash'){
                if(self.lock){
                    return false;
                }
                self.lock = true;
                if(self.nowIndex === self.domList.length - 1){
                    self.nowIndex = 0;
                }else{
                    self.nowIndex ++;
                }
            }
            self.change();
        })
        //小圆点 点击
        iconList.addEventListener('click', function(e){
            if(e.target.classList.contains('icon_item')){
                self.nowIndex = e.target.innerText;
                self.change();
            }
        },true)

        //主盒子悬停
        this.dom.addEventListener('mouseover',function(){
            if(self.timer){
                clearInterval(self.timer);
                self.timer = null;
            }
        })
        this.dom.addEventListener('mouseleave',function(){
            if(self.isAutoChange){
                self.autoChange();
            }
        })
    }

    //切换样式
    Slider.prototype.change = function(){
        //若slide => ul left：-宽度 * nowindex
        //若flash => li 添加nowindex
        //小圆点 nowindex添加active
        var self = this;
        let icons = document.querySelectorAll('.icon-list span');//icons
        let swiperList = document.querySelector('.my-swiper-list')//ul
        if(swiperList == null)return;
        let swiperItem = document.querySelectorAll('.my-swiper-item');//li
        if(this.type === 'slide'){
            swiperList.style.left = -self.width * self.nowIndex + 'px';
            swiperList.style.transform = `translateX(-${self.width * self.nowIndex} + 'px')`;
            setTimeout(() => {
                self.lock = false;
            }, 1000);
        }else{//flash
            for(let i=0; i<swiperItem.length; i++){
                swiperItem[i].style.display = 'none';
            }
            swiperItem[this.nowIndex].style.display = 'block';
            setTimeout(() => {
                self.lock = false;
            }, 1000);
        }

        //小圆点
        for(let i=0; i<icons.length; i++){
            icons[i].classList.remove('active');
            icons[this.nowIndex].classList.add('active');
        }
    }

    //自动轮播
    Slider.prototype.autoChange = function(){
        //定时器让右按钮自动点击
        if(this.timer){
            clearInterval(this.timer)
        }
        let self = this;
        let rightBtn = document.querySelector('.my-swiper-Rbtn')//右按钮
        this.timer = setInterval(() => {
            if(self.lock){
                return false;
            }
            rightBtn.click();
            self.lock = true;
        }, self.autoTime);//3000
    }

    Slider.prototype.monitor = function(){//监听
        document.onvisibilitychange = () => 
        document.visibilityState == 'hidden' ? clearInterval(this.timer) : this.autoChange();
    }
    

    return function(options){
        const map = new Slider(options);
        map.init();
        if(map.isAutoChange){
            map.autoChange();
        }
        return map.wrap;
    }
}())

export default carouselMap;