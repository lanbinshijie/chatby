<template>
    <div class="chat-background" :style="{'background-image': `url('${background}')`}"></div>
    <div class="container" id="container" :class="is_login ? 'right-panel-active' : ''">
        <div class="form-container sign-up-container">
            <form action="#" @submit="preventSubmit($event)">
                <h1>注册</h1>
                <span>海纳百川，有容乃大，开启你的旅程！</span>
                <input v-model="username" type="text" placeholder="Username" />
                <input v-model="email" type="email" placeholder="Email" />
                <input v-model="password" type="password" placeholder="Password" />
                <input v-model="nickname" type="text" placeholder="Nickname" />
                <button @click="register" :disabled="loading">开启旅程</button>
            </form>
        </div>
        <div class="form-container sign-in-container">
            <form action="#" @submit="preventSubmit($event)">
                <h1>登录</h1>
                <span>使用账户密码登录</span>
                <input type="username" v-model="username" placeholder="Username / Email" />
                <input type="password" v-model="password" placeholder="Password" />
                <a href="#" @click="baibai = !baibai">忘记密码？</a>
                <!-- 加载中图标：AntDesign -->
                <!-- <a-button type="primary" :loading="loading" @click="login">登录</a-button> -->
                
                <button @click="login" :disabled="loading">登录</button>
            </form>
        </div>
        <div class="overlay-container">
            <div class="overlay">
                <div class="overlay-panel overlay-right">
                    <h1 class="white">Welcome Back!</h1>
                    <p>To keep connected with your friend, please login with your personal info</p>
                    <button class="ghost" id="signIn" @click="toggleLogin">注册账号</button>
                </div>
                <div class="overlay-panel overlay-left">
                    <h1 class="white">Hello, Friend!</h1>
                    <p>Enter your personal details and start your own journey in Chatby</p>
                    <button class="ghost" id="signUp" @click="toggleLogin">已有账号</button>
                </div>
            </div>
        </div>
    </div>
    <!-- 只有data有数据才显示 -->
    <div class="temp-show-info" v-if="baibai">
        <!-- 显示用户名、密码、邮箱、id、昵称、登录时间 -->
        <!-- 显示Token、过期时间和设备ID -->        
        <p>用户名：{{ data.user.username }}</p>
        <p>密码：{{ data.user.password }}</p>
        <p>邮箱：{{ data.user.email }}</p>
        <p>id：{{ data.user.id }}</p>
        <p>昵称：{{ data.user.nickname }}</p>
        <p>登录时间：{{ data.user.lastLoginTime }}</p>
        <p>Token：{{ data.token.token }}</p>
        <p>过期时间：{{ data.token.expireTime }}</p>
        <p>设备ID：{{ data.token.deviceId }}</p>
        <!-- 显示头像 -->
        <img :src="data.user.avatar" alt="头像" width="400" />
        <!-- Payloads -->
        <p>Username：{{ username }}</p>
        <p>Password：{{ password }}</p>
        <p>Email：{{ email }}</p>
        <p>Nickname：{{ nickname }}</p>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import fetch from '../api/axios';
import { message } from 'ant-design-vue';
import { useMainStore } from '../store';
import { storeToRefs } from 'pinia';
import { LoginOutlined } from '@ant-design/icons-vue'
import { UserLoginRDto, UserAuthDeviceDto } from '../dtos/login.dto';
import Cookies from 'js-cookie';


const mainStore = useMainStore();

export default defineComponent({
  name: 'Login',
  components: {
    LoginOutlined,
  },
  setup() {
      return {
          
      }
  },
  data() {
    return {
        // 另一张背景
        background: "https://file.dujin.org/image/fengjing/466f79e8ly1h9gwgox5ljj22yo1o0qv5.jpg",
        is_login: false,
        data: {} as UserLoginRDto,
        username: ref<string>(""),
        password: ref<string>(""),
        email: ref<string>(""),
        nickname: ref<string>(""),
        baibai: false,
        loading: storeToRefs(mainStore).loading,
        device: {} as UserAuthDeviceDto,
    }
  },
  methods: {
    // 切换登录注册
    toggleLogin() {
        this.is_login = !this.is_login;
    },

    preventSubmit(e: Event) {
        return e.preventDefault();
    },

    // 登录（Pre）
    async login() {
        // 验证用户名和密码是否合法（正则表达式）
        let username = this.username.trim();
        let password = this.password.trim();
        if (username.length < 4 || username.length > 20) {
            message.error("用户名长度不合法");
            return;
        }
        if (password.length < 6 || password.length > 20) {
            message.error("密码长度不合法");
            return;
        }
        // 获取设备信息
        const device = await this.get_device();
        // 发送登录请求
        this.do_login(username, password, device);
    },
    // 登录业务逻辑
    do_login(username: string, password: string, device: UserAuthDeviceDto) {
        mainStore.loading = true;
        fetch('/auth/login', {
            method: "POST",
            data: {
                username: username,
                password: password,
                device: device,
            }
        }).then(res => {
            this.data = res.data.data
            message.success(res.data.message);
            this.login_success()
        }).finally(() => {
            setTimeout(() => {
                mainStore.loading = false;
            }, 500);
        })
    },
    login_success() {
        // 储存登录信息进入Cookie
        Cookies.set('token', this.data.token.token)
        Cookies.set('username', this.data.user.username)
        // 储存登录信息进入Pinia
        mainStore.userAuth = this.data.user;
        mainStore.token = this.data.token;
        mainStore.device = this.device;
        mainStore.isFinishLogin = true;
        // 跳转到首页
        this.$router.push('/');
    },

    async register() {
        // 检查输入是否合法
        let username = this.username.trim();
        let password = this.password.trim();
        let email = this.email.trim();
        let nickname = this.nickname.trim();
        // 使用正则表达式检查：用户名、密码、邮箱、昵称
        /*
            用户名：4-20位字母数字下划线和减号
            密码：6-20位字母数字符号（大小写）
            邮箱：邮箱格式
            昵称：1-20位中英文数字下划线和减号
        */
        let usernameReg = /^[a-zA-Z0-9_-]{4,20}$/;
        let passwordReg = /^[a-zA-Z0-9_-]{6,20}$/;
        let emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        let nicknameReg = /^[a-zA-Z0-9_\-\u4e00-\u9fa5]{1,20}$/;
        if (!usernameReg.test(username)) {
            message.error("用户名不合法");
            return;
        }
        if (!passwordReg.test(password)) {
            message.error("密码不合法");
            return;
        }
        if (!emailReg.test(email)) {
            message.error("邮箱不合法");
            return;
        }
        if (!nicknameReg.test(nickname)) {
            message.error("昵称不合法");
            return;
        }
        // 发送注册请求
        this.do_register(username, password, email, nickname);
    },
    do_register(username: string, password: string, email: string, nickname: string) {
        mainStore.loading = true;
        fetch('/auth/register', {
            method: "POST",
            data: {
                username: username,
                password: password,
                email: email,
                nickname: nickname,
            }
        }).then(res => {
            message.success(res.data.message);
            this.toggleLogin();
        }).finally(() => {
            setTimeout(() => {
                mainStore.loading = false;
            }, 500);
        })
    },

    async get_device(): Promise<UserAuthDeviceDto> {
        // 获取设备类型
        let deviceType = "Web";
        // 获取设备唯一标识
        let deviceId: string | null = localStorage.getItem("deviceId");
        // 获取IP地址
        let ip = await this.get_ip();
        const device: UserAuthDeviceDto = {
            deviceType: deviceType,
            deviceId: deviceId!,
            ip: ip,
        }
        this.device = device;
        return device;
        
    },
    async get_ip() {
        // 获取IP地址
        const res = fetch('/auth/ip', {
            method: "GET",
        })
        if((await res).data.code == 200) {
            return (await res).data.ip;
        } else {
            return "";
        }
    }
  }
});
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

.chat-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    /* 模糊毛玻璃效果 */
    filter: blur(8px);
    outline: #000 solid 10px;
}

.temp-show-info {
    position: fixed;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    background-color: #4a4a4a;
    color: #fff;
    padding: 20px;
    overflow: auto;
}

* {
	box-sizing: border-box;
}

body {
	background: #f6f5f7;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-family: 'Montserrat', sans-serif;
	height: 100vh;
	margin: -20px 0 50px;
}

h1 {
	font-weight: bold;
	margin: 0;
}

.white {
    color: #fff;
}

h2 {
	text-align: center;
}

p {
	font-size: 14px;
	font-weight: 100;
	line-height: 20px;
	letter-spacing: 0.5px;
	margin: 20px 0 30px;
}

span {
	font-size: 12px;
}

a {
	color: #333;
	font-size: 14px;
	text-decoration: none;
	margin: 15px 0;
}

button {
	border-radius: 20px;
	border: 1px solid #2b8aff;
	background-color: #2b8aff;
	color: #FFFFFF;
	font-size: 12px;
	font-weight: bold;
	padding: 12px 45px;
	letter-spacing: 1px;
	text-transform: uppercase;
	transition: transform 80ms ease-in;
    transition: opacity .2s ease-in-out;
}

button:active {
	transform: scale(0.95);
}

button:focus {
	outline: none;
}

button:disabled {
    opacity: 0.6;
    
}

button.ghost {
	background-color: transparent;
	border-color: #FFFFFF;
}

form {
	background-color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 50px;
	height: 100%;
	text-align: center;
}

input {
	background-color: #eee;
	border: none;
	padding: 12px 15px;
	margin: 8px 0;
	width: 100%;
}

.container {
	background-color: #fff;
	border-radius: 10px;
  	box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
			0 10px 10px rgba(0,0,0,0.22);
	position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
	overflow: hidden;
	width: 768px;
	max-width: 100%;
	min-height: 480px;
}

.form-container {
	position: absolute;
	top: 0;
	height: 100%;
	transition: all 0.6s ease-in-out;
}

.sign-in-container {
	left: 0;
	width: 50%;
	z-index: 2;
}

.container.right-panel-active .sign-in-container {
	transform: translateX(100%);
}

.sign-up-container {
	left: 0;
	width: 50%;
	opacity: 0;
	z-index: 1;
}

.container.right-panel-active .sign-up-container {
	transform: translateX(100%);
	opacity: 1;
	z-index: 5;
	animation: show 0.6s;
}

@keyframes show {
	0%, 49.99% {
		opacity: 0;
		z-index: 1;
	}
	
	50%, 100% {
		opacity: 1;
		z-index: 5;
	}
}

.overlay-container {
	position: absolute;
	top: 0;
	left: 50%;
	width: 50%;
	height: 100%;
	overflow: hidden;
	transition: transform 0.6s ease-in-out;
	z-index: 100;
}

.container.right-panel-active .overlay-container{
	transform: translateX(-100%);
}

.overlay {
	background: #4184ff;
	background: -webkit-linear-gradient(to right, #2b8aff, #4184ff);
	background: linear-gradient(to right, #2b8aff, #4184ff);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 0 0;
	color: #FFFFFF;
	position: relative;
	left: -100%;
	height: 100%;
	width: 200%;
  	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  	transform: translateX(50%);
}

.overlay-panel {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 40px;
	text-align: center;
	top: 0;
	height: 100%;
	width: 50%;
	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.overlay-left {
	transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
	transform: translateX(0);
}

.overlay-right {
	right: 0;
	transform: translateX(0);
}

.container.right-panel-active .overlay-right {
	transform: translateX(20%);
}

.social-container {
	margin: 20px 0;
}

.social-container a {
	border: 1px solid #DDDDDD;
	border-radius: 50%;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	margin: 0 5px;
	height: 40px;
	width: 40px;
}

</style>