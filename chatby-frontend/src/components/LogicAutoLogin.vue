<template>

</template>
<script lang="ts">
import Cookies from 'js-cookie';
import router from '../router/main';
import fetch from '../api/axios';
import { TgetDevice } from '../tools'
import { useMainStore } from '../store';
import { UserLoginRDto } from '../dtos/login.dto';

export default {
    name: 'LogicAutoLogin',
    async setup() {
        const mainStore = useMainStore()
        if (!Cookies.get('token') || !Cookies.get('username')) {
            router.push('/login')
        } else if (mainStore.isFinishLogin === false) {
            // // 跳转到首页
            // this.$router.push('/');
            fetch('/auth/loginByToken', {
                method: 'POST',
                data: {
                password: Cookies.get('token'),
                username: Cookies.get('username'),
                device: await TgetDevice()
            }
            }).then(res => {
                console.log(res)
                if (res.data.code === 200) {
                    const data: UserLoginRDto = res.data.data
                    // 登录成功
                    mainStore.isFinishLogin = true
                    mainStore.userAuth = data.user
                    mainStore.token = data.token
                    router.push('/')
                } else {
                    // 登录失败
                    router.push('/login')
                }
            })
        } else {
            // 已经登录
            return
        }
    }
}

// 判断是否登录：Cookie是否有token和username

</script>