<template>
  <div class="stock-lists">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>库存列表</span>
      </div>
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="关键字 :">
          <el-input v-model="search.key" placeholder="商品名称,条形码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click='querylists()'>查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="goods" stripe style="width: 100%; margin-bottom:20px;">
        <el-table-column prop="code" label="商品条形码" width="220"></el-table-column>
        <el-table-column prop="name" label="商品名称" width="220"></el-table-column>
        <el-table-column prop="originprice" label="进价(元)" width="220"></el-table-column>
        <el-table-column prop="number" label="库存"></el-table-column>
        <el-table-column prop="handle" label="操作">
          <template slot-scope="scope">
            <el-button @click="returndata(scope.row.id)" type="primary" icon="el-icon-edit" circle></el-button>
            <el-button @click="removedata(scope.row.id)" type="danger" icon="el-icon-delete" circle></el-button>
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
      <el-dialog title="修改库存信息" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form">
          <el-form-item label="条形码" :label-width="formLabelWidth">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="进价(元)" :label-width="formLabelWidth">
            <el-input v-model="form.originprice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="库存" :label-width="formLabelWidth">
            <el-input v-model="form.number" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updatedata()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { queryStock, del, returnData, updateData } from '@/api/stock'
export default {
  data() {
    return {
      search: {
        key: ""
      },
      goods: [],
      pagesize: 5,
      currentpage: 1,
      total: 0,
      rowid: "",
      dialogFormVisible: false,
      form: {
        code: '',
        name: '',
        originprice: '',
        number: '',
      },
      formLabelWidth: "70px"
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
      this.querystock();
    },
    handleCurrentChange(val) {
      this.currentpage = val;
      this.querystock();
    },
    // 数据加载
    querystock() {
      // 获取页码,页量
      let params = {
        pagesize: this.pagesize,
        currentpage: this.currentpage,
        key: this.search.key,
      };
      queryStock(params)
        .then(response => {
          let {total, data} = response;
          this.total = total;
          this.goods = data.map(item => {
            return {
              code: item.code,
              name: item.name,
              originprice: item.originprice,
              number: item.number,
              id: item.id
            };
          });
          // 如果没有数据,返回上一页并刷新列表
          if (!data.length && this.currentpage !== 1) {
            // 回到上一页
            this.currentpage -= 1;
            this.querystock();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 删除
    removedata(id) {
      this.$confirm("你确定要删除吗?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          del({id})
            .then(res => {
              let { code, msg } = res;
              if (code === 0) {
                this.$message({
                  message: msg,
                  type: "success"
                });
                // 更新列表
                this.querystock();
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
    // 回填
    returndata(id) {
      this.dialogFormVisible = true;
      this.rowid = id;
      returnData({id})
        .then(res => {
          this.form.code = res[0].code;
          this.form.name = res[0].name;
          this.form.originprice = res[0].originprice;
          this.form.number = res[0].number;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 修改
    updatedata() {
      this.dialogFormVisible = false;
      let id = this.rowid;
      let params = {
        id: id,
        code: this.form.code,
        name: this.form.name,
        originprice: this.form.originprice,
        number: this.form.number
      };
      updateData(params)
        .then(res => {
          let { code, msg } = res;
          if (code === 0) {
            this.$message({
              message: msg,
              type: "success"
            });
            this.querystock();
          } else if (code === 1) {
            this.$message.error(msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 模糊查询
    querylists(){
      this.querystock();
    }
  },
  created() {
    this.querystock();
  }
};
</script>

<style lang="less">
@import url("./stocklists.less");
</style>


