<template>
  <div class="goods-checkout">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品出库</span>
      </div>
      <el-form
        :model="goodscheckout"
        status-icon
        :rules="rules"
        ref="goodscheckout"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品条形码" prop="code">
          <el-input type="text" v-model="goodscheckout.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="number">
          <el-input type="text" v-model="goodscheckout.number" autocomplete="off"></el-input>
          <span>&nbsp;(计重商品单位为千克)</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">加入订单</el-button>
          <el-button type="danger">重新出库</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="salelists" stripe style="width: 100%; margin-bottom:20px;">
        <el-table-column prop="name" label="名称" width="250"></el-table-column>
        <el-table-column prop="counts" label="数量" width="250"></el-table-column>
        <el-table-column prop="price" label="单价(元)" width="250"></el-table-column>
        <el-table-column prop="allprice" label="总价(元)" width="250"></el-table-column>
        <el-table-column prop="discount" label="优惠总价(元)"></el-table-column>
      </el-table>
      <el-form
        :model="vipcode"
        status-icon
        :rules="rules"
        ref="vipcode"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="会员卡号:" prop="number">
          <el-input type="text" v-model="vipcode.card" autocomplete="off"></el-input>
          <span>&nbsp;(填写会员卡号)</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">确认提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodscheckout: {},
      vipcode: {},
      rules: {
        code: [
          { required: true, message: "商品条形码不能为空!", trigger: "blur" }
        ],
        number: [
          { required: true, message: "商品数量不能为空!", trigger: "blur" }
        ],
        card: [
          { required: true, message: "会员卡号不能为空!", trigger: "blur" }
        ]
      },
      salelists: [
        {
          name: "暂无商品",
          counts: "",
          price: "",
          allprice: "",
          discount: "",
        },
        {
          name: "总价: 0 元 , 优惠 0 元 , 小计: 0 元",
          counts: "",
          price: "",
          allprice: "",
          discount: "",
        },
      ]
    };
  }
};
</script>

<style lang="less">
@import url("./goodscheckout.less");
</style>
