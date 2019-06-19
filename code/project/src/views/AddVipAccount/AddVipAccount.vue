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
            <el-option label="青铜会员" value="青铜会员"></el-option>
            <el-option label="白银会员" value="白银会员"></el-option>
            <el-option label="黄金会员" value="黄金会员"></el-option>
            <el-option label="铂金会员" value="铂金会员"></el-option>
            <el-option label="钻石会员" value="钻石会员"></el-option>
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
          <div class="block">
            <el-cascader
              v-model="vipaccountform.value"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
            ></el-cascader>
          </div>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" @click="addaccount">添加</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { addAccount } from '@/api/vipAccount'
export default {
  data() {
    return {
      options: [
        {
          value: "武侯区",
          label: "武侯区",
          children: [
            { value: "高升桥", label: "高升桥" },
            { value: "红牌楼", label: "红牌楼" },
            { value: "外双楠", label: "外双楠" },
            { value: "内双楠", label: "内双楠" },
            { value: "肖家河", label: "肖家河" }
          ]
        },
        {
          value: "高新区",
          label: "高新区",
          children: [
            { value: "天府一街", label: "天府一街" },
            { value: "天府二街", label: "天府二街" },
            { value: "天府三街", label: "天府三街" },
            { value: "金融城", label: "金融城" },
            { value: "软件园", label: "软件园" }
          ]
        },
        {
          value: "锦江区",
          label: "锦江区",
          children: [
            { value: "春熙路", label: "春熙路" },
            { value: "牛王庙", label: "牛王庙" },
            { value: "东门大桥", label: "东门大桥" },
            { value: "牛市口", label: "牛市口" },
            { value: "塔子山公园", label: "塔子山公园" }
          ]
        }
      ],
      vipaccountform: {
        realname: "",
        vipcard: "",
        usergroup: "",
        idcard: "",
        userstatus: "",
        phonecall: "",
        address: "",
        value: [],
      },
      rules: {
        realname: [
          { required: true, message: "请输入真实名字", trigger: "blur" }
        ],
        vipcard: [
          { required: true, message: "请输入会员卡卡号", trigger: "blur" }
        ],
        usergroup: [
          { required: true, message: "请选择用户组", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 添加账号
    addaccount() {
      // 地区数组转字符串
      let values = `${this.vipaccountform.value}`;
      let params = {
        realname: this.vipaccountform.realname,
        vipcard: this.vipaccountform.vipcard,
        usergroup: this.vipaccountform.usergroup,
        idcard: this.vipaccountform.idcard,
        userstatus: this.vipaccountform.userstatus,
        phonecall: this.vipaccountform.phonecall,
        address: this.vipaccountform.address,
        value: values
      };
      addAccount(params)
        .then(response => {
          let { code, msg } = response;
          if (code === 0) {
            this.$message({
              message: msg,
              type: "success"
            });
            this.$router.push('/home/vipaccountmanage')
          } else if (code === 1) {
            this.$message.error(msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less">
@import url("./addvipaccount.less");
</style>

