<template>
    <div>
        <div class="common-layout">
            <el-container>
                <el-header>
                    <el-row :gutter="20">
                        <el-col :span="4">
                            <logo-button />
                        </el-col>
                        <el-col :span="2">
                        </el-col>
                        <el-col :span="12">
                            <Search />
                        </el-col>
                        <el-col :span="2">
                            <!-- //login -->
                        </el-col>
                        <el-col :span="2">
                            <CartCounter />
                        </el-col>

                    </el-row>
                </el-header>
                <el-main>
                    <Nav />
                    <router-view />
                </el-main>
            </el-container>
        </div>
    </div>
</template>

<script setup>
import Nav from '@/components/Nav.vue';
import LogoButton from '@/components/LogoButton.vue';
import Search from '@/components/Search.vue';
import CartCounter from '@/components/CartCounter.vue';
</script>

<style scoped></style>