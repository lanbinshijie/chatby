<template>
    <!-- Nav栏在最左侧，最上方有三个按钮，分别为黄、红、绿 -->
    <div class="buttons">
        <div class="y"></div>
        <div class="r"></div>
        <div class="g"></div>
    </div>
    <!-- 下方是一个头像栏，方形圆角 -->
    <div class="avatar"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Navbar',
    setup() {
        return {};
    },
});
</script>

   