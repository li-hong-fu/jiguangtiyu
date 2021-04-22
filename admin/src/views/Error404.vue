<template>
    <div class="error">
        <h3 class="el-block">404</h3>
        <p class="el-block el-font-14 el-mg-b-20">抱歉，你访问的页面不存在！</p>
        <el-button @click="back()">返回首页</el-button>
    </div>
</template>

<style lang="less" scoped>
.error {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 200px;
    width: 200px;
    text-align: center;

    h3 {
        font-size: 72px;
        font-weight: 600;
        padding: 0;
        margin: 0;
    }

    p {
    }
}
</style>

<script>
export default {
    methods: {
        back() {
        this.$router.push({ path: "/" });
        },
    },
};
</script>