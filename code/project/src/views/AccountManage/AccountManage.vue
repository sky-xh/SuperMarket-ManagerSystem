<template>
  <div class="account-manage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号管理列表</span>
      </div>
      <div class="text item">
        <el-table
          ref="multipleTable"
          :data="accountManage"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column type="selection" width="100"></el-table-column>
          <el-table-column prop="name" label="姓名" width="250"></el-table-column>
          <el-table-column prop="region" label="用户组" width="250"></el-table-column>
          <el-table-column label="日期" width="250">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="handle" label="操作" show-overflow-tooltip>
            <el-button type="primary" icon="el-icon-edit">修改</el-button>
            <el-button type="danger" icon="el-icon-delete">删除</el-button>
          </el-table-column>
        </el-table>
        <div>
            <el-pagination
            :page-sizes="[1, 5, 10, 20]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="20"
            style="margin-top: 20px"
            ></el-pagination>
        </div>
        <div style="margin-top: 20px">
            <el-button type="danger">批量删除</el-button>
            <el-button type="success">取消选择</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accountManage: [
        { date: "2016-05-03", name: "吉安娜", region: "超级管理员" },
        { date: "2016-05-04", name: "希尔瓦娜斯", region: "普通用户" },
        { date: "2016-05-03", name: "安度因", region: "普通用户" },
        { date: "2016-05-03", name: "古尔丹", region: "普通用户" },
        { date: "2016-05-03", name: "萨格拉斯", region: "超级管理员" }
      ]
    };
  }
};
</script>

<style lang="less">
@import url("./accountmanage.less");
</style>