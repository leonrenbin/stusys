//翻页插件

//1.传入
    //祖父元素，当前页面，总页面，
//2。生成父元素，
//3。生成上一页，下一页，
    // 中间页面：小于等于，
        //大于：curr - code > 1 && curr + code < all
                //curr + code > all
                //curr - code < 1
//4.绑定事件
//5.导出
const pagination = (function(){
    const page = function(options){
        this.wrap = options.wrap || document.body;
        this.currentPage = options.currentPage || 1;
        this.allPage = options.allPage || 10;

        this.dom = document.createElement('ul');
        this.dom.className = 'my_swiper_page';
        this.code = 5;//作为中间页码可以显示的条件
    }
    page.prototype.init = function(){
        this.initHTML();
    }

    page.prototype.initHTML = function(){
        //先清空，防止累加
        this.dom.innerHTML = '';
        //上一页
        if(this.currentPage > 1){
            const prev = document.createElement('li');
            prev.innerText = '<';
            prev.title="上一页"
            prev.className = 'prev';
            this.dom.appendChild(prev);
        }
        //中间项
        if(this.allPage <= 10){
            for(let i=1; i<=this.allPage; i++){
                const oLi = document.createElement('li');
                oLi.innerText = i;
                oLi.className = 'num';
                if(i === this.currentPage){
                    oLi.classList.add('current');
                }
                this.dom.appendChild(oLi);
            }
        }else{ // > 10
            if(this.currentPage - this.code >= 1 && +this.currentPage + this.code <= this.allPage){
                for(let i=this.currentPage - this.code; i< +this.currentPage + this.code; i++){
                    const oLi = document.createElement('li');
                    oLi.innerText = i;
                    oLi.className = 'num';
                    if(+this.currentPage === i){
                        oLi.classList.add('current');
                    }
                    this.dom.appendChild(oLi);
                }
            }else if(+this.currentPage + this.code > this.allPage){
                for(let i= this.currentPage - 6; i<= this.allPage; i++){
                    const oLi = document.createElement('li');
                    oLi.innerText = i;
                    oLi.className = 'num';
                    if(+this.currentPage === i){
                        oLi.classList.add('current');
                    }
                    this.dom.appendChild(oLi);
                }
            }else if(this.currentPage - this.code < 1){
                for(let i=1; i<= 10; i++){
                    const oLi = document.createElement('li');
                    oLi.innerText = i;
                    oLi.className = 'num';
                    if(+this.currentPage === i){
                        oLi.classList.add('current');
                    }
                    this.dom.appendChild(oLi);
                }
            }
        }
        //下一页
        if(+this.currentPage < this.allPage){
            const next = document.createElement('li');
            next.innerText = '>';
            next.title="下一页"
            next.className = 'next';
            this.dom.appendChild(next);
        }
    }
    return function(options){
        const newPage = new page(options);
        newPage.init();
        return newPage.dom;
    }

}())

export default pagination;