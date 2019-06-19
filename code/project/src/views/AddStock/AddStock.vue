<template>
  <div class="add-stock">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品入库</span>
      </div>
      <el-form
        :model="addStock"
        status-icon
        :rules="rules"
        ref="addStock"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品条形码" prop="code">
          <el-input type="text" v-model="addStock.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input type="text" v-model="addStock.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="number">
          <el-input type="text" v-model="addStock.number" autocomplete="off"></el-input>
          <span>&nbsp;(计重商品单位为千克)</span>
        </el-form-item>
        <el-form-item label="进价" prop="originprice">
          <el-input type="text" v-model="addStock.originprice" autocomplete="off"></el-input>
          <span>&nbsp;元</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addstock">入库</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addStock } from "@/api/stock"
export default {
  data() {
    return {
      addStock: {
        code: "",
        name: "",
        number: "",
        originprice: ""
      },
      rules: {
        code: [
          { required: true, message: "商品条形码不能为空!", trigger: "blur" }
        ],
        name: [
          { required: true, message: "商品名称不能为空!", trigger: "blur" }
        ],
        number: [{ required: true, message: "数量不能为空!", trigger: "blur" }],
        originprice: [
          { required: true, message: "进价不能为空!", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    addstock() {
      this.$refs.addStock.validate(valid => {
        if (valid) {
          let params = {
            code: this.addStock.code,
            name: this.addStock.name,
            number: this.addStock.number,
            originprice: this.addStock.originprice
          };
          addStock(params)
            .then(res => {
              let { code, msg } = res;
              if (code === 0) {
                this.$message({
                  message: msg,
                  type: "success"
                });
                this.$router.push("/home/stocklists");
              } else if (code === 1) {
                this.$message.error(msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message.error("添加失败!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
@import url("./addstock.less");
</style>


