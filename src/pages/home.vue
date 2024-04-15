<template>
    <div class="homePage">
        <router-link class="homeItem" to="/trendPage">上滑效果</router-link>
        <router-link class="homeItem" to="/dingPage">钉钉官网效果</router-link>

        <!-- <router-view></router-view> -->
    </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style scoped>

    .homeItem{
        margin: 20px;
        color: aqua;
        font-size: 20px;
    }
</style>