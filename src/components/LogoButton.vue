<template>
 <el-button type="primary" class="logo-button" color="white" size="large" plain>Vue+NetCore Shop</el-button>
</template>

<script setup>

</script>

<style scoped>
.logo-button {
    white-space: nowrap;
    transform: rotate(-10deg);
    /* margin: 20px; */

    color: rgba(99, 167, 245, 0.5);
    font-size:xx-large;

}
.logo-button:hover {
    color: rgba(99, 167, 245, 0.5);

}
.el-button:active {
  background-color: transparent !important; /*或者设置为你想要的颜色*/
  border-color: transparent !important; /*如果需要去掉边框颜色*/
}

</style>