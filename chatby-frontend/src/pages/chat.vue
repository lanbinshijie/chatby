<template>
    <!-- Chat包含一个背景层和一个窗口 -->
    <div class="chat-background"></div>
    <div class="chat-window">
        <div class="nav">
            <!-- Nav栏在最左侧，最上方有三个按钮，分别为黄、红、绿 -->
            <div class="buttons">
                <div class="y"></div>
                <div class="r"></div>
                <div class="g"></div>
            </div>
            <!-- 下方是一个头像栏，方形圆角 -->
            <div class="avatar"></div>
            <!-- AntDesign Vue 测试 -->
            <a-button type="primary">你好世界！</a-button>
        </div>
        <div class="sidebar">
            <Sidebar></Sidebar>
        </div>
        <div class="main"></div>
    </div>
</template>
<script lang="ts">
// 导入Sidebar组件

export default {
    name: 'Chat',
    setup() {
        return {}
    }
}
</script>
<style>
/* 设置背景：全屏，背景图片，不缩放 */
.chat-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('https://file.dujin.org/image/fengjing/466f79e8ly1gzb0wwlmh9j21hc0u0qby.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    /* 模糊毛玻璃效果 */
    filter: blur(8px);
    outline: #000 solid 10px;
}

/* 设置主窗口： 宽为80%，高为80%，背景设置成淡黄色*/
.chat-window {
    /* 窗口居中 */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    background-color: rgba(245, 244, 239, 0.8);
    border-radius: 10px;
    /* 最小宽度为1000px，最小高度为800px */
    min-width: 800px;
    min-height: 500px;
}

/* nav栏设置：宽度为88px，颜色为深灰色 */
.chat-window .nav {
    width: 78px;
    height: 100%;
    background-color: #3a3a3a;
    float: left;
    border-radius: 10px 0 0 10px;
    /* 因为显示的BUG，左边给0.1px的边框，颜色和背景一样 */
    outline: 0.1px solid #3a3a3a;
}

/* 三个按钮设置，在最上方，中间有间距，横向排列 */
.chat-window .nav .buttons {
    margin-top: 12px;
    display: flex;
    padding: 8px;
    flex-direction: row;
    justify-content: space-between;
}

/* 三个按钮设置：宽度8px，横向排列，有间距 */
.chat-window .nav .buttons div {
    width: 15px;
    height: 15px;
    border-radius: 7px;
    display: inline-block;
    outline: 2px solid transparent;
    transition: ease-in-out 0.2s;
    position: relative;
}

/* 三个按钮设置：黄色按钮 */
.chat-window .nav .buttons .y {
    background-color: #f5c300;
}

/* 三个按钮设置：红色按钮 */
.chat-window .nav .buttons .r {
    background-color: #f44336;
}

/* 三个按钮设置：绿色按钮 */
.chat-window .nav .buttons .g {
    background-color: #4caf50;
}

/* 按钮鼠标悬浮状态下外面出现各自颜色更深色的边框 */
.chat-window .nav .buttons .y:hover {
    outline: 2px solid #b38f01;
}

.chat-window .nav .buttons .r:hover {
    outline: 2px solid #b71c1c;
}

.chat-window .nav .buttons .g:hover {
    outline: 2px solid #2e7d32;
}

/* 鼠标悬浮在按钮上时，按钮显示对应的图标，分别为-、x、+ */
/* 我们使用伪元素来达到这一点，里面的内容颜色是白色的 */
/* 最重要的一点就是图标需要在整个元素的正中心：居中 */

/* 设置未被Hover的样式 */
/* 每种图标单独设置 */
.chat-window .nav .buttons .y::before {
    content: '';
    /* 深黄色 */
    color: #896e00;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.chat-window .nav .buttons .r::before {
    content: '';
    /* 深红色 */
    color: #861515;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.chat-window .nav .buttons .g::before {
    content: '';
    /* 深绿色 */
    color: #15711a;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}


/* 每个按钮有不同的图标 */
.chat-window .nav .buttons .y:hover::before {
    content: '-';
}

.chat-window .nav .buttons .r:hover::before {
    content: '×';
}

.chat-window .nav .buttons .g:hover::before {
    content: '+';
}

/* 头像设置 */
.chat-window .nav .avatar {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    background-color: #fff;
    margin: 20px auto;
    transition: all 0.2s;
    background-image: url('https://img2.woyaogexing.com/2020/05/01/f7b9586dca084c7881d57dce3d0064ed!400x400.jpeg');
    background-size: cover;
    background-repeat: no-repeat;
    outline: #fff 2px solid; /* 近似白色的边框 */
    
}

/* 头像鼠标悬浮时出现阴影，背景图片出现模糊 */
.chat-window .nav .avatar:hover {
    box-shadow: 0 0 10px #000;
    filter: blur(2px);
}

</style>
