<template>
  <div class="home-top-bar">
    <el-row :gutter="20">
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <h3>
            <span class="el-icon-eleme"></span>&nbsp;军尼玛的管理系统
          </h3>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">
          <img src alt class="avatar">
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link" style="color:#fff;">
              {{ account }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="personal">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import local from "../../utils/localStorage";
export default {
  data() {
      return{
          account: '',
      }
  },
  methods: {
    handleCommand(command) {
      if (command === "personal") {
        console.log("进入个人中心");
      } else if (command === "logout") {
        local.remove("this_is_not_token");
        this.$message({
          type: "success",
          message: "下次再来玩丫"
        });
        setTimeout(() => {
          this.$router.push("/login");
        }, 600);
      }
    },
    queryUsername() {
      this.$http
        .get("http://127.0.0.1:3000/login/query")
        .then(res => {
          this.account = res;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.queryUsername();
  }
};
</script>

<style lang='less'>
@import url("./hometopbar.less");
</style>
