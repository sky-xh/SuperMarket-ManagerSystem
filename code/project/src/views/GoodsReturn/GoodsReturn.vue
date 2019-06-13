<template>
  <div class="goods-return">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品退货</span>
      </div>
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="订单号 :">
          <el-input v-model="search.key" placeholder="请输入订单号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return{
            search: {

            }
        }
    }
}
</script>

<style lang="less">
    @import url('./goodsreturn.less');
</style>
