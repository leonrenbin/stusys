//对象的属性处理
exports.pick = function(obj, ...props){
    if(!obj || typeof obj !== 'object'){
        return obj;
    }
    const newObj = {};
    for(const key in obj){
        if(props.includes(key)){
            newObj[key] = obj[key]
        }
    }
    return newObj;
}

//得到随机数
exports.getRandom = function(min, max){
    return Math.floor(Math.random() * (max-min) + min)
}