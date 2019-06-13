<template>
  <div class="system-info">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>系统信息</span>
      </div>
      <el-alert
        title="商品总数: 5 .已经销售的总金额: 890.00 . 库存商品总价: 1231.32 "
        type="success"
        style="margin-bottom:20px;"
      ></el-alert>
      <el-alert title="导入数据" type="success" style="margin-bottom:20px;"></el-alert>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>销售排行</span>
              </div>
              <el-table :data="sellList" stripe style="width: 100%">
                <el-table-column prop="name" label="商品名称" width="280"></el-table-column>
                <el-table-column prop="num" label="销量"></el-table-column>
              </el-table>
            </el-card>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>缺货的商品</span>
              </div>
              <el-table :data="defaultGoods" stripe style="width: 100%">
                <el-table-column prop="name" label="商品名称" width="180"></el-table-column>
                <el-table-column prop="surplus" label="库存" width="180"></el-table-column>
                <el-table-column prop="handle" label="操作">
                    <el-button type="success">入库</el-button>
                </el-table-column>
              </el-table>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return{
            sellList:[
                {name: '海飞丝', num: 8},
                {name: '茅台酒', num: 6},
                {name: '利群', num: 5},
                {name: '龙凤呈祥', num: 2},
            ],
            defaultGoods:[
                {name: '优乐美',  surplus: 0}
            ]
        }
    }
};
</script>

<style lang="less">
    @import url("./systeminfo.less");
</style>

