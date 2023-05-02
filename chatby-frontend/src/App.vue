<template>
  <!-- <Suspense>
    <LogicAutoLogin />
  </Suspense> -->
  <div>
    <RouterView />
  </div>
</template>

<script lang="ts">
  import LogicAutoLogin from './components/LogicAutoLogin.vue'
  import Cookies from 'js-cookie';
  import router from './router/main';
  import fetch from './api/axios';
  import { TgetDevice } from './tools'
  import { useMainStore } from './store';
  import { UserLoginRDto } from './dtos/login.dto';
  import { getCurrentInstance } from 'vue';
  
  export default {
    name: 'Main',
    components: {
      LogicAutoLogin
    },

    // 逻辑：如果没有token和username，跳转到登录页
    async created () {
      console.log('Main created')
      // 设置DeviceID（如果没有就设置，如果有就不管）
      if (!localStorage.getItem('deviceId')) {
        localStorage.setItem('deviceId', Math.random().toString(36).substr(2)) // 生成一个随机的设备ID
      }

      // 登录逻辑
      const mainStore = useMainStore() // 获取store
      const instance = getCurrentInstance() // 获取路由实例

      if (!Cookies.get('token') || !Cookies.get('username')) { // 如果没有token或者username
        router.push('/login') // 跳转到登录页
      } else if (mainStore.isFinishLogin === false) {
        fetch('/auth/loginByToken', {
          method: 'POST',
          data: {
            password: Cookies.get('token'),
            username: Cookies.get('username'),
            device: await TgetDevice()
          }
        }).then(res => {
          if (res.data.code === 200) {
            const data: UserLoginRDto = res.data.data
            // 登录成功，更新 store
            mainStore.isFinishLogin = true
            mainStore.userAuth = data.user
            mainStore.token = data.token
            // 使用路由实例跳转到首页
            instance?.proxy?.$router.push('/')
          } else {
            // 登录失败，跳转到登录页
            instance?.proxy?.$router.push('/login')
          }
        })
      } else {
        return
      }
    }
  }
  
</script>


<style scoped>

</style>
