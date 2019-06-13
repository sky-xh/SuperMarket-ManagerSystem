<template>
  <div class="stock-lists">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>库存列表</span>
      </div>
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="选择分类 :">
          <el-select v-model="search.region" placeholder="选择分类">
            <el-option label="优乐美" value="优乐美"></el-option>
            <el-option label="茅台" value="茅台"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键字 :">
          <el-input v-model="search.key" placeholder="商品名称,条形码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="goods" stripe style="width: 100%; margin-bottom:20px;">
        <el-table-column prop="code" label="商品条形码" width="170"></el-table-column>
        <el-table-column prop="name" label="商品名称" width="170"></el-table-column>
        <el-table-column prop="originprice" label="进价(元)" width="170"></el-table-column>
        <el-table-column prop="addstock" label="入库" width="170"></el-table-column>
        <el-table-column prop="stock" label="库存" width="170"></el-table-column>
        <el-table-column prop="saled" label="已售" width="170"></el-table-column>
        <el-table-column prop="handle" label="操作">
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
      goods: [
        {
          code: '639457897803842',
          name: "优乐美",
          originprice: '2.0',
          addstock: '11',
          stock: '2',
          saled: '9'
        },
        {
          code: '639457897801234',
          name: "茅台",
          originprice: '2.0',
          addstock: '11',
          stock: '2',
          saled: '9'
        },
        {
          code: '639457897805342',
          name: "海飞丝",
          originprice: '2.0',
          addstock: '11',
          stock: '2',
          saled: '9'
        },
        {
          code: '639457897806453',
          name: "龙凤呈祥",
          originprice: '2.0',
          addstock: '11',
          stock: '2',
          saled: '9'
        },
      ]
    };
  }
};
</script>

<style lang="less">
    @import url('./stocklists.less');
</style>


