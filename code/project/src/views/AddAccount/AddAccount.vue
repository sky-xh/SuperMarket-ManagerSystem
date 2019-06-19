<template>
  <div class="add-account">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加管理员账号</span>
      </div>
      <div class="text item">
        <el-form
          :model="addAccountForm"
          status-icon
          :rules="rules"
          ref="addAccountForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="account">
            <el-input type="text" v-model="addAccountForm.account" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="addAccountForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="addAccountForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="选择用户组" prop="region">
            <el-select v-model="addAccountForm.region" placeholder="请选择用户组">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通用户" value="普通用户"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">添加</el-button>
            <el-button @click="resetForm()" type="danger">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { passwordValidator } from "@/utils/validator";
import { constants } from "crypto";
import { addAccount, isRepeat } from '@/api/account';
export default {
  data() {
    // 自定义验证
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空!"));
      } else if (!passwordValidator(value)) {
        callback(new Error("密码只能是3-6位的大小字母数字下划线!"));
      } else {
        if (this.addAccountForm.checkPass !== "") {
          this.$refs.addAccountForm.validateField("checkPass");
        }
        callback();
      }
    };
    const validateCheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码!"));
      } else if (value !== this.addAccountForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    const nameIsRepeat = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("账号不能为空!"));
      } else if (value.length < 3 || value.length > 5) {
        callback(new Error("账号长度在 3 到 5 个字符!"));
      }
      // 重复性验证
      isRepeat({ value })
      .then(response => {
        let {code, msg} = response;
        if(code === 0){
          callback();
        }else if(code === 1){
          callback(new Error(msg))
        }
      })
      .catch(err => {
        this.$message.error(err)
      })
    };
    return {
      addAccountForm: {
        account: "",
        password: "",
        checkPass: "",
        region: "",
        repeat: "",
      },
      rules: {
        account: [{ required: true, validator: nameIsRepeat, trigger: "blur" }],
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: validateCheckPass, trigger: "blur" }
        ],
        region: [{ required: true, message: "请选择用户组", trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.addAccountForm.validate(valid => {
        if (valid) {
          let params = {
            account: this.addAccountForm.account,
            password: this.addAccountForm.password,
            region: this.addAccountForm.region
          };
          addAccount( params )
            .then(res => {
              let { code, msg } = res;
              if (code === 0) {
                this.$message({
                  message: msg,
                  type: "success"
                });
                this.$router.push("/home/accountmanage");
              } else {
                this.$message.error(msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          alert("添加失败!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.addAccountForm.resetFields();
    },
  }
};
</script>

<style lang="less">
@import "./addaccount.less";
</style>

