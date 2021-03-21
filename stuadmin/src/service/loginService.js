//实现登录的功能
import request from './request'

export async function login(loginId, loginPwd){
    const resp = await request().post("/api/admin/login",{loginId, loginPwd})
    return resp.data;
}

export function loginOut(){
    localStorage.removeItem("token");
}

export async function whoami(){
    const resp = await request().get("/api/admin/whoami")
    return resp.data;
}