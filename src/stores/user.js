// 用户相关pinia 数据
import { defineStore } from 'pinia'
import http from '@/utils/http'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

export const useUserStore = defineStore('user', ()=>{

    // 用户数据
    const userInfo = ref({})

    // 获取用户数据（login接口 提交用户表单，返回用户信息)
    const getUserInfo = async({ phone_number, password })=>{
        const result = await http.loginCommit({ phone_number, password })
        if(result.code === 200){
            userInfo.value = result.data
            userInfo.value.user.avatar = http.server_host + '/media/avatar/' + result.data.user.avatar
        }else{
            ElMessage.error(result.message)
        }
        return result
    }
    // 退出登陆逻辑
    const clearUserInfo = ()=>{
        userInfo.value = {}
    }
    // 修改用户个人信息
    const settingUserInfo = async({username, avatar})=>{
        const result = await http.settingUser({username, avatar})
        if (result.code === 200){
            userInfo.value.user.username = result.data.username
        }else{
            return Promise.reject(new Error(result.message))
        }
    }
    // 修改用户头像
    const exitAvatar = (img)=>{
        userInfo.value.user.avatar = img
    }
    // 以对象的形式返回
    return {
        userInfo,
        getUserInfo,
        clearUserInfo,
        settingUserInfo,
        exitAvatar
    }
},{ // pinia持久护插件
    persist: true,
}
)