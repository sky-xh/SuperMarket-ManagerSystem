<template>
  <div class="home">
    <el-container>
      <el-header>
        <!-- 顶部 -->
        <HomeTopBar ref='top'></HomeTopBar>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 侧栏 -->
          <HomeSideBar></HomeSideBar>
        </el-aside>
        <el-container>
          <el-main>
            <!-- 路由出口 -->
            <router-view @A='B'></router-view>
          </el-main>
          <el-footer>
            <!-- 底部 -->
            <HomeFooterBar></HomeFooterBar>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HomeTopBar from "../../components/HomeTopBar/HomeTopBar.vue";
import HomeSideBar from "../../components/HomeSideBar/HomeSideBar.vue";
import HomeFooterBar from "../../components/HomeFooterBar/HomeFooterBar.vue";
export default {
  components: {
    HomeTopBar,
    HomeSideBar,
    HomeFooterBar
  },
  methods:{
    B(){
      this.$refs.top.getUserInfo();
    }
  }
};
</script>

<style lang="less">
@import url("./home.less");
</style>

