<template>
    <!-- 搜索框 -->
    <a-input v-model:value="search" class="search-input" placeholder="搜索">
      <template #prefix>
        <search-outlined />
      </template>
    </a-input>
    <!-- 短的分割线 -->
    <hr class="diver">
    <div class="chat-list">
        <SidebarChatItem v-for="item in mockdata" :key="item.uid" :data="item"></SidebarChatItem>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import SidebarChatItem from '../components/SidebarChatItem.vue';

export default defineComponent({
    name: 'Sidebar',
    setup() {
        const search = ref<string>('');
        const mockdata = [
            {uid: 5,name: "张三", message: "怎么样？", time: 1682761614000},
            {uid: 6,name: "李四", message: "你好！你好！你好！你好！你好！你好！你好！你好！你好！你好！你好！你好！你好！", time: 1682761657000},
            {uid: 7,name: "王五", message: "膜拜大佬~", time: 1633381657000},
            {uid: 8,name: "赵六", message: "你跟他说签一下就好", time: 1682761222000},
            // 随机生成2023年的时间戳
            {uid: 9,name: "孙七", message: "我也不知道", time: 1682761657000},
            {uid: 10,name: "周八", message: "我也不知道", time: 1682733357000},
            {uid: 11,name: "吴九", message: "我也不知道", time: 1681111657000},
            {uid: 12,name: "郑十", message: "我也不知道", time: 1681561657000},
        ]
        const sortMockdata = (data: any) => {
            console.log(data);
            console.log(data.sort((a: any, b: any) => b.time - a.time))
            return data.sort((a: any, b: any) => b.time - a.time);
        };
        return {
            search,
            mockdata: sortMockdata(mockdata)
        };
    },
    components: {
        SearchOutlined,
        SidebarChatItem,
    },
});
</script>

<style scoped>
.search-input {
    margin: 10px;
    margin-top: 15px;
    width: 90%;
    border-radius: 5px;
    font-size: large;
}

/* 分割线 */
.diver {
    width: 100%;
    border: none;
    /* 颜色为深灰色 */
    border-bottom: #efefef 1.5px solid;
    /* 底部边距设为0 */
    margin-bottom: 0;
}

.chat-list {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding-bottom: 60px;
}
</style>

