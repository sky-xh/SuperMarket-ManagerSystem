<template>
  <div class="add-vip-account">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加会员账号</span>
      </div>
      <el-form
        :model="vipaccountform"
        :rules="rules"
        ref="vipaccountform"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="真实名字" prop="realname">
          <el-input v-model="vipaccountform.realname"></el-input>
        </el-form-item>
        <el-form-item label="会员卡卡号" prop="vipcard">
          <el-input v-model="vipaccountform.vipcard"></el-input>
        </el-form-item>
        <el-form-item label="用户组" prop="usergroup">
          <el-select v-model="vipaccountform.usergroup" placeholder="请选择用户组">
            <el-option label="普通会员" value="普通会员"></el-option>
            <el-option label="高级会员" value="高级会员"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号" prop="idcard">
          <el-input v-model="vipaccountform.idcard"></el-input>
        </el-form-item>
        <el-form-item label="用户状态" prop="userstatus">
          <el-radio-group v-model="vipaccountform.userstatus">
            <el-radio label="启用"></el-radio>
            <el-radio label="禁用"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号码" prop="phonecall">
          <el-input v-model="vipaccountform.phonecall"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="address">
          <el-input v-model="vipaccountform.address"></el-input>
        </el-form-item>
        <el-form-item label="地区选择" prop="localcheck">
          <el-select v-model="vipaccountform.localcheck" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div>
          <el-button type='primary'>添加</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vipaccountform: {
          realname: '',
          vipcard: '',
          usergroup: '',
          idcard: '',
          userstatus: '',
          phonecall: '',
          address: '',
          localcheck: '',
      },
      rules: {
          realname: [
              { required: true, message: '请输入真实名字', trigger: 'blur' },
          ],
          vipcard: [
              { required: true, message: '请输入会员卡卡号', trigger: 'blur' },
          ],
          usergroup: [
              { required: true, message: '请选择用户组', trigger: 'blur' },
          ]
      }
    };
  }
};
</script>

<style lang="less">
    @import url('./addvipaccount.less');
</style>

