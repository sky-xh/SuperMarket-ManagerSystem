<template>
    <div class="home-top-bar">
        <el-row :gutter="20">
            <el-col :span="20">
                <div class="grid-content bg-purple">
                    <h3><span class="el-icon-menu"></span>&nbsp;军尼玛的管理系统</h3>    
                </div>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple-light">
                    <img src="" alt="" class="avatar">
                </div>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple-light">
                    <el-dropdown>
                    <span class="el-dropdown-link">
                        admin<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">个人中心</el-dropdown-item>
                        <el-dropdown-item command="b">退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {

}
</script>

<style lang='less'>
    @import url('./hometopbar.less');
</style>
