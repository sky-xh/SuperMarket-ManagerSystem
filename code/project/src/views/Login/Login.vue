<template>
  <div class="login">
    <div class="login-box">
      <h2>
        <span class="el-icon-s-custom"></span>&nbsp;超市管理系统
      </h2>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="account">
          <el-input type="text" v-model="loginForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="loginForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain @click="submitForm()">提交</el-button>
          <el-button plain @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 引入正则
import { passwordValidator } from "../../utils/validator";
import { constants } from "crypto";
import local from '../../utils/localStorage'

export default {
  data() {
    // 自定义密码验证
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码!"));
      } else if (!passwordValidator(value)) {
        callback(new Error("密码只能是3-6位的大小字母数字下划线!"));
      } else {
        if (this.loginForm.checkPass !== "") {
          this.$refs.loginForm.validateField("checkPass");
        }
      }
      callback();
    };
    // 自定义确认密码验证
    const validateCheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码!"));
      } else if (value !== this.loginForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else if (!passwordValidator(value)) {
        callback(new Error("密码只能是3-6位的大小字母数字下划线"));
      } else {
        callback();
      }
    };
    return {
      // 双向绑定数据
      loginForm: {
        account: "",
        password: "",
        checkPass: ""
      },
      // 验证规则
      rules: {
        account: [
          { required: true, message: "账号不能为空!", trigger: "blur" },
          {
            min: 3,
            max: 5,
            message: "账号长度在 3 到 5 个字符",
            trigger: "blur"
          }
        ],
        // 自定义验证
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: validateCheckPass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 提交表单
    submitForm() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let params = {
            account: this.loginForm.account,
            password: this.loginForm.password
          };
          this.$http.post('/login/check', params)
          .then(res => {
            let{code, msg, token} = res;
            // token放入本次存储
            local.set('this_is_not_token', token)
            if(code === 0){
              this.$message({
                type: 'success',
                message: msg,
              })
              this.$router.push('/home')
            }else if(code === 1){
              this.$message.error(msg)
            }
          })
          .catch(err => {
            console.log(err);
          })
        } else {
          this.$message.error('登陆失败!请重新登陆!');
          return false;
        }
      });
    },
    // 重置表单
    resetForm() {
      this.$refs.loginForm.resetFields();
    }
  }
};
</script>

<style lang="less">
// 引入样式
@import "./login.less";
</style>
