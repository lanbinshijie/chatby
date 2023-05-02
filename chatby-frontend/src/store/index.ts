import { defineStore } from "pinia";
import { UserAuthDeviceDto, UserAuthDto, UserTokenDto } from "../dtos/login.dto";
import Cookies from "js-cookie";

export const useMainStore = defineStore('main',{
    /**
     * MainStore是全局信息的Store
     * 储存了包括请求状态和用户登录信息等需要全局储存的东西
     */
    state: () => {
        return {
            loading: false,
            isFinishLogin: false,
            userAuth: {} as UserAuthDto,
            token: {} as UserTokenDto,
            device: {} as UserAuthDeviceDto,
        }
    },
    /**
     * 类似于组件的computed，用来封装计算属性，有缓存的功能
     */
    getters: {
    
    },
    /**
     * 类似于组件的methods，封装业务逻辑
     */
    actions: {
        logout() {
            this.isFinishLogin = false;
            this.userAuth = {} as UserAuthDto;
            this.token = {} as UserTokenDto;
            this.device = {} as UserAuthDeviceDto;
            Cookies.remove("token");
            Cookies.remove("username");
            // 刷新页面
            window.location.reload();
        }
    }
})
