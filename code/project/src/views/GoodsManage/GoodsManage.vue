<template>
  <div class="goods-manage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品管理</span>
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
        <el-table-column prop="theclass" label="所属分类" width="170"></el-table-column>
        <el-table-column prop="price" label="售价(元)" width="170"></el-table-column>
        <el-table-column prop="saleprice" label="促销价(元)" width="170"></el-table-column>
        <el-table-column prop="number" label="库存" width="170"></el-table-column>
        <el-table-column prop="admin" label="管理">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="returndata(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="delaccount(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          :page-sizes="[3, 5, 10, 15]"
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="pagesize"
          :current-page="currentpage"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
      <!-- 对话框 -->
      <el-dialog title="修改商品信息" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form">
          <el-form-item label="条形码" :label-width="formLabelWidth">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属分类" :label-width="formLabelWidth">
            <el-select v-model="form.theclass" placeholder="请选择分类">
              <el-option label="日用品" value="日用品"></el-option>
              <el-option label="饮品" value="饮品"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="售价" :label-width="formLabelWidth">
            <el-input v-model="form.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="促销价" :label-width="formLabelWidth">
            <el-input v-model="form.saleprice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="库存" :label-width="formLabelWidth">
            <el-input v-model="form.number" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <!-- <template slot-scope="scope"> -->
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updategoods()">确 定</el-button>
          <!-- </template> -->
        </div>
      </el-dialog>
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
      goods: [],
      currentpage: 1, //当前页码
      pagesize: 5, //多少条一页
      total: 0, //总条数
      dialogFormVisible: false,
      form: {
        code: "",
        name: "",
        theclass: "",
        price: "",
        saleprice: "",
        number: ""
      },
      updateid: "",
      formLabelWidth: "70px"
    };
  },
  methods: {
    // 页面刷新加载数据
    queryGoodsLists() {
      let params = {
        currentpage: this.currentpage,
        pagesize: this.pagesize
      };
      this.$http
        .get("http://127.0.0.1:3000/goods/goodslists", params)
        .then(response => {
          this.goods = response.map(list => {
            let item = {
              code: list.code,
              name: list.name,
              theclass: list.theclass,
              price: list.price,
              saleprice: list.saleprice,
              number: list.number,
              id: list.id
            };
            return item;
          });
          // 如果没有数据,返回上一页并刷新列表
          if (!response.length && this.currentpage !== 1) {
            // 回到上一页
            this.currentpage -= 1;
            this.queryGoodsLists();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取多少条一页,并调用分页查询
    handleSizeChange(val) {
      this.pagesize = val;
      this.queryGoodsLists();
    },
    // 获取当前页码,并调用分页查询
    handleCurrentChange(val) {
      this.currentpage = val;
      this.queryGoodsLists();
    },
    // 查询总条数
    querytotal() {
      this.$http
        .get("http://127.0.0.1:3000/goods/querytotal")
        .then(response => {
          this.total = response.length;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 删除
    delaccount(id) {
      this.$confirm("你确定要删除吗?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .get("http://127.0.0.1:3000/goods/delgoods", { id })
            .then(response => {
              let { code, msg } = response;
              if (code === 0) {
                this.$message({
                  message: msg,
                  type: "success"
                });
                // 初始化总条数
                this.querytotal();
                // 初始化列表
                this.queryGoodsLists();
              } else {
                this.$message.error(msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 修改数据回填
    returndata(id) {
      this.updateid = id;
      this.dialogFormVisible = true;
      this.$http
        .get("http://127.0.0.1:3000/goods/returndata", { id })
        .then(response => {
          this.form.code = response[0].code;
          this.form.name = response[0].name;
          this.form.theclass = response[0].theclass;
          this.form.price = response[0].price;
          this.form.saleprice = response[0].saleprice;
          this.form.number = response[0].number;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 修改商品数据
    updategoods() {
      this.dialogFormVisible = false;
      let id = this.updateid;
      let { code, name, theclass, price, saleprice, number } = this.form;
      this.$http
        .post("http://127.0.0.1:3000/goods/updategoods", {
          code,
          name,
          theclass,
          price,
          saleprice,
          number,
          id
        })
        .then(response => {
          let { code, msg } = response;
          if (code === 0) {
            this.$message({
              message: msg,
              type: "success"
            });
            // 初始化列表
            this.queryGoodsLists();
          } else if (code === 1) {
            this.$message.error(msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    // 初始化总条数
    this.querytotal();
    // 初始化列表
    this.queryGoodsLists();
  }
};
</script>

<style lang="less">
@import url("./goodsmanage.less");
</style>

