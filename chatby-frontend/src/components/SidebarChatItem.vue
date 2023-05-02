<template>
    <div class="person-card">
        <div class="avatar">
            <img :src="mockAvatar()" alt="avatar">
        </div>
        <div class="info">
            <div class="name">{{data.name}}</div>
            <div class="message">{{data.message}}</div>
        </div>
        <div class="time">{{ formatTime(data.time) }}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SidebarChatItem',
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    setup() {
        return {
            mockAvatar() {
                const images = [
                    'https://f1-seo.v3mh.com/social/ad343ac25bb951eeb783bb4efe7403a7-compress-watermark.seo',
                    'https://media.greatfire.org/cdn-cgi/image/width=700/proxy/?url=https://mmbiz.qpic.cn/mmbiz_jpg/sCGqGGJjLG0BU69lQT9REIlOgibClhdXHjXLoKPUm3jnicA2eFDG0uzvas9NZFez0xTksbuqiavVyvY1r2j3G8brA/640?wx_fmt=jpeg',
                    'https://i01piccdn.sogoucdn.com/2a415457e174e5b4',
                    'https://inews.gtimg.com/newsapp_bt/0/13392595208/1000',
                ]
                let result = images[Math.floor(Math.random()*images.length) * 5 % images.length];
                return result;
            },
            // 毫秒时间戳转日期
            formatTime(time: number) {
                // 规则：如果是今天内，显示hh:mm
                // 如果是昨天，显示 昨天hh:mm
                // 如果是前天，显示 前天hh:mm
                // 如果是今年内，显示MM-dd hh:mm
                // 如果不是今年，显示yyyy-MM-dd hh:mm
                // 若分钟数为个位数，则在前面补0
                const now = new Date();
                const date = new Date(time);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const hour = date.getHours();
                const minute = date.getMinutes();
                
                if (now.getFullYear() === year && now.getMonth() + 1 === month && now.getDate() === day) {
                    return `${hour}:${minute < 10 ? '0' + minute : minute}`;
                } else if (now.getFullYear() === year && now.getMonth() + 1 === month && now.getDate() - 1 === day) {
                    return `昨天 ${hour}:${minute < 10 ? '0' + minute : minute}`;
                } else if (now.getFullYear() === year && now.getMonth() + 1 === month && now.getDate() - 2 === day) {
                    return `前天 ${hour}:${minute < 10 ? '0' + minute : minute}`;
                } else if (now.getFullYear() === year) {
                    return `${month}月${day}日 ${hour}:${minute < 10 ? '0' + minute : minute}`;
                } else {
                    return `${year}年${month}月${day}日 ${hour}:${minute < 10 ? '0' + minute : minute}`;
                }
            }
        };
    },
    

});
</script>
<style scoped>
.person-card {
    background-color: #fff;
    height: 80px;
    transition: background-color ease-in-out 0.1s;
    position: relative;
}
/* 当其被Hover时，背景颜色变深 */
.person-card:hover {
    background-color: #f0f0f0;
}
.avatar {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    background-color: #efefef;
    margin: 10px;
    float: left;
}
.avatar img {
    width: 60px;
    height: 60px;
    border-radius: 8px;
}
/* Info在左边，Time在右边 */
.info {
    float: left;
    width: 200px;
    position: absolute;
    left: 90px;
    /* 上下居中显示 */
    top: 50%;
    transform: translateY(-50%);

}
/* Info中name稍稍变粗，文字内容用深灰色表示，缩小一些，在name下方 */
.name {
    font-weight: bold;
    font-size: 16px;
    color: #333;
}
.message {
    font-size: 14px;
    color: #999;
    /* Message设置宽度，不能超过全部的80%，超出部分替换成省略号 */
    width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
/* Time悬浮在右边，和name在同一水平线 */
.time {
    position: absolute;
    margin: 10px;
    font-size: 12px;
    color: #999;
    right: 0;
    top: 0;
}
</style>

   