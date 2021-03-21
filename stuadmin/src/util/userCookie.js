import cookies from 'js-cookie'

//先假设得到了一个用户，那么它的信息是一个对象
export function setCookie(info){
    let arr = Object.entries(info); //遍历二维数组
    for(let i=0; i<arr.length; i++){
        //设置键值对，第0项为键，1项为值
        cookies.set(arr[i][0], arr[i][1]);
    }
    return true;
}

export function getUserCookie(){
    return {
        id: cookies.get('id'),
        loginId: cookies.get('loginId'),
        role: cookies.get('role'),
        name: cookies.get('name'),
    }
}

export function removeUserCookie(){
    cookies.remove('id');
    cookies.remove('role');
    cookies.remove('loginId');
    cookies.remove('name');
    return true;
}