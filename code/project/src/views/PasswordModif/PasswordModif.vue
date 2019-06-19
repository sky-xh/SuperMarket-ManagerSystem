<template>
  <div class="password-modif">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改账号密码</span>
      </div>
      <div class="text item">
        <el-form
          :model="passwordModif"
          status-icon
          :rules="rules"
          ref="passwordModif"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="原密码" prop="oldpass">
            <el-input type="password" v-model="passwordModif.oldpass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpass">
            <el-input type="password" v-model="passwordModif.newpass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="checknewpass">
            <el-input type="password" v-model="passwordModif.checknewpass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">修改</el-button>
            <el-button @click="resetForm()" type="danger">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { passwordValidator } from "@/utils/validator";
import local from '../../utils/localStorage';
import { setTimeout } from 'timers';
import { checkOldPass, passwordModify } from '@/api/account';
export default {
  data() {
    // 自定义验证
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("新密码不能为空!"));
      } else if (!passwordValidator(value)) {
        callback(new Error("密码只能是3-6位的大小字母数字下划线!"));
      } else if (value === this.passwordModif.oldpass) {
        callback(new Error("新密码与旧密码不能一样!"));
      } else {
        if (this.passwordModif.checknewpass !== "") {
          this.$refs.passwordModif.validateField("checknewpass");
        }
        callback();
      }
    };
    const validateCheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码!"));
      } else if (value !== this.passwordModif.newpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    // 原密码验证
    const validateOldpass = (rule, value, callback) => {
        checkOldPass({ value })
            .then(res => {
                let {code, msg} = res;
                if(code === 0){
                    callback();
                }else if(code === 1){
                    callback(new Error(msg));
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    return {
      passwordModif: {
        oldpass: "",
        newpass: "",
        checknewpass: ""
      },
      rules: {
        oldpass: [
          { required: true, validator: validateOldpass, trigger: "blur" }
        ],
        newpass: [
            { required: true, validator: validatePass, trigger: "blur" }
        ],
        checknewpass: [
          { required: true, validator: validateCheckPass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    resetForm() {
      this.$refs.passwordModif.resetFields();
    },
    // 修改
    submitForm() {
      this.$refs.passwordModif.validate(valid => {
        if (valid) {
          let params = {
            password: this.passwordModif.newpass
          };
          passwordModify( params )
          .then(res => {
            let {code, msg} = res ;
            if(code === 0){
                this.$message({
                    type: 'success',
                    message: msg,
                })
                local.remove('this_is_not_token');
                setTimeout(() => {
                    this.$router.push('/login')
                }, 700);
            }else if(code === 1){
                this.$message.error(msg);
            }
          })
          .catch(err => {
            this.$message.error('修改失败!');
          })
        } else {
          this.$message.error('修改失败!');
          return false;
        }
      });
    },
  }
};
</script>

<style lang="less">
@import url("./passwordmodif.less");
</style>
