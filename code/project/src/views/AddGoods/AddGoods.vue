<template>
  <div class="add-goods">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加商品</span>
      </div>
      <el-form
        ref="addGoodsForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="所属分类" prop="theclass">
          <el-select v-model="addGoodsForm.theclass" placeholder="选择分类">
            <el-option label="日用品" value="日用品"></el-option>
            <el-option label="食品" value="食品"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品条形码" prop="code">
          <el-input v-model="addGoodsForm.code"></el-input>
          <el-button type="success" @click="createRandomCode">生成条形码</el-button>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="addGoodsForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品售价" prop="saleprice">
          <el-input v-model="addGoodsForm.saleprice"></el-input>
          <span>元</span>
        </el-form-item>
        <el-form-item label="市场价" prop="price">
          <el-input v-model="addGoodsForm.price"></el-input>
          <span>元</span>
        </el-form-item>
        <el-form-item label="商品进价" prop="originprice">
          <el-input v-model="addGoodsForm.originprice"></el-input>
          <span>元</span>
        </el-form-item>
        <el-form-item label="入库数量" prop="number">
          <el-input v-model="addGoodsForm.number"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" prop="weight">
          <el-input v-model="addGoodsForm.weight"></el-input>
        </el-form-item>
        <el-form-item label="商品单位" prop="unit">
          <el-input v-model="addGoodsForm.unit"></el-input>
        </el-form-item>
        <el-form-item label="会员优惠" prop="preferential">
          <el-radio-group v-model="addGoodsForm.preferential">
            <el-radio label="享受"></el-radio>
            <el-radio label="不享受"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否促销" prop="promote">
          <el-radio-group v-model="addGoodsForm.promote">
            <el-radio label="启用"></el-radio>
            <el-radio label="禁用"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品简介" prop="introduce">
          <el-input type="textarea" v-model="addGoodsForm.introduce"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addGoods">立即创建</el-button>
          <el-button @click='resetForm'>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addGoodsForm: {
        theclass: "",
        code: "",
        name: "",
        saleprice: "",
        price: "",
        originprice: "",
        number: "",
        weight: "",
        unit: "",
        preferential: "",
        promote: "",
        introduce: "",
      },
      rules: {
        theclass: [{ required: true, message: "选择分类", trigger: "change" }],
        code: [{ required: true, message: "生成条形码", trigger: "blur" }],
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        saleprice: [
          { required: true, message: "请输入商品售价", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 生成随机条形码
    createRandomCode() {
      this.addGoodsForm.code =
        Math.floor(
          (Math.random() + Math.floor(Math.random() * 12 + 1)) *
            Math.pow(13, 12)
        ) + "";
    },
    // 添加货物
    addGoods() {
      let params = {
        theclass: this.addGoodsForm.theclass,
        code: this.addGoodsForm.code,
        name: this.addGoodsForm.name,
        saleprice: this.addGoodsForm.saleprice,
        price: this.addGoodsForm.price,
        originprice: this.addGoodsForm.originprice,
        number: this.addGoodsForm.number,
        weight: this.addGoodsForm.weight,
        unit: this.addGoodsForm.unit,
        preferential: this.addGoodsForm.preferential,
        promote: this.addGoodsForm.promote,
        introduce: this.addGoodsForm.introduce
      };
      this.$http
        .post("/goods/addgoods", params)
        .then(response => {
          let { code, msg } = response;
          if (code === 0) {
            this.$message({
              message: msg,
              type: "success"
            });
          } else if (code === 1) {
            this.$message.error(msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 重置表单
    resetForm() {
      this.$refs.addGoodsForm.resetFields();
    },
  },
};
</script>
<style lang="less">
@import url("./addgoods.less");
</style>
