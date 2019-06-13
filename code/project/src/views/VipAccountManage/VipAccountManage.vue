<template>
  <div class="vip-account-manage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>会员账号管理</span>
      </div>
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="搜索 :">
          <el-input v-model="search.key" placeholder="会员卡,会员名,电话,手机"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="vipinfo" stripe style="width: 100%; margin-bottom:20px;">
        <el-table-column prop="cardnumber" label="会员卡卡号" width="170"></el-table-column>
        <el-table-column prop="name" label="会员姓名" width="170"></el-table-column>
        <el-table-column prop="level" label="会员等级" width="170"></el-table-column>
        <el-table-column prop="grade" label="会员积分" width="170"></el-table-column>
        <el-table-column prop="discount" label="折扣" width="170"></el-table-column>
        <el-table-column prop="tell" label="手机号" width="170"></el-table-column>
        <el-table-column prop="admin" label="管理">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          :page-sizes="[5, 10, 15, 20]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="200"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: {
        region: "",
        key: ""
      },
      vipinfo: [
        {
          cardnumber: 119996622,
          name: "阿尔萨斯",
          level: "青铜会员",
          grade: "564",
          discount: "20%",
          tell: '13388776655'
        },
        {
          cardnumber: 119993377,
          name: "萨格拉斯",
          level: "白银会员",
          grade: "1564",
          discount: "30%",
          tell: '13388776655'
        },
        {
          cardnumber: 119996611,
          name: "吉安娜",
          level: "黄金会员",
          grade: "2542",
          discount: "40%",
          tell: '13388776655'
        },
        {
          cardnumber: 119996600,
          name: "安度因",
          level: "铂金会员",
          grade: "4564",
          discount: "50%",
          tell: '13388776655'
        },
        
      ]
    };
  }
};
</script>

<style lang="less">
    @import url('./vipaccountmanage.less');
</style>
