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
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="100"></el-table-column>
          <el-table-column prop="name" label="姓名" width="250"></el-table-column>
          <el-table-column prop="region" label="用户组" width="250"></el-table-column>
          <el-table-column label="日期" width="250">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="handle" label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" @click="returndata(scope.row.id)">修改</el-button>
              <el-button type="danger" icon="el-icon-delete" @click="delaccount(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div>
          <el-pagination
            :page-sizes="[3, 5, 10, 15]"
            layout="total, sizes, prev, pager, next, jumper"
            style="margin-top: 20px"
            :page-size="pagesize"
            :current-page="currentpage"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
        <div style="margin-top: 20px">
          <el-button type="danger" @click="delchooseitem">批量删除</el-button>
          <el-button type="success" @click="toggleSelection()">取消选择</el-button>
        </div>
      </div>
      <!-- 对话框 -->
      <el-dialog title="修改资料" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户组" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择用户组">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通用户" value="普通用户"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <!-- <template slot-scope="scope"> -->
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateaccount()">确 定</el-button>
          <!-- </template> -->
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { constants } from "crypto";
export default {
  data() {
    return {
      accountManage: [],  //账号列表数据
      ids: [],  //多选按钮的id集合
      dialogFormVisible: false, //对话框状态
      form: {name: "", region: ""}, //修改对话框表单属性
      formLabelWidth: "70px",   //修改对话框宽度
      updateid: "",   //保存选择的行的id
      currentpage: 1,  //当前页码
      pagesize: 3,     //多少条一页
      total: 0,     //总条数
    };
  },
  methods: {
    // 页面刷新加载数据
    queryaccountlists() {
      let params = {
        currentpage : this.currentpage,
        pagesize : this.pagesize,
      }
      this.$http
        .get("http://127.0.0.1:3000/accounts/accountlists", params)
        .then(response => {
          this.accountManage = response.map(list => {
            // 处理时间
            let ctime = this.$moment(list.createtime).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            let item = {
              date: ctime,
              name: list.account,
              region: list.region,
              id: list.id
            };
            return item;
          });
          // 如果没有数据,返回上一页并刷新列表
          if (!response.length && this.currentpage !== 1) {
            // 回到上一页
            this.currentpage -= 1;
            this.queryaccountlists();
          }

        })
        .catch(err => {
          console.log(err);
        });
    },
    // 取消多选
    toggleSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    // 删除某项
    delaccount(id) {
      this.$confirm("你确定要删除吗?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .get("http://127.0.0.1:3000/accounts/delaccount", { id })
            .then(response => {
              let { code, msg } = response;
              if (code === 0) {
                this.$message({
                  message: msg,
                  type: "success"
                });
                // 更新列表
                this.queryaccountlists();
                // 更新总条数
                this.querytotal();
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
    // 用于获取选中的项的id(把id集保存出去)
    handleSelectionChange(value) {
      this.ids = value.map(item => {
        return item.id;
      });
    },
    // 批量删除
    delchooseitem() {
      // 如果没有选择,阻止发送axios
      if(this.ids.length === 0){
        this.$message.error('没有选择任何选项!');
        return;
      }
      this.$confirm("你确定要删除吗?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let ids = this.ids;
          this.$http
            .get("http://127.0.0.1:3000/accounts/delchooseitem", { ids })
            .then(response => {
              let { code, msg } = response;
              if (code === 0) {
                this.$message({
                  message: msg,
                  type: "success"
                });
                // 更新列表
                this.queryaccountlists();
                // 更新总条数
                this.querytotal();
              } else if (code === 1) {
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
      (this.dialogFormVisible = true),
        this.$http
          .get("http://127.0.0.1:3000/accounts/returndata", { id })
          .then(response => {
            this.form.name = response[0].account;
            this.form.region = response[0].region;
          })
          .catch(err => {
            console.log(err);
          });
    },
    // 修改数据
    updateaccount() {
      this.dialogFormVisible = false;
      let id = this.updateid;
      let { name, region } = this.form;
      this.$http
        .post("http://127.0.0.1:3000/accounts/updateaccount", {
          name,
          region,
          id
        })
        .then(response => {
          let { code, msg } = response;
          if (code === 0) {
            this.$message({
              message: msg,
              type: "success"
            });
            // 更新列表
            this.queryaccountlists();
          } else if (code === 1) {
            this.$message.error(msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取多少条一页,并调用分页查询
    handleSizeChange(val){
      this.pagesize = val;
      this.queryaccountlists();
    },
    // 获取当前页码,并调用分页查询
    handleCurrentChange(val){
      this.currentpage = val;
      this.queryaccountlists();
    },
    // 查询总条数
    querytotal(){
      this.$http.get("http://127.0.0.1:3000/accounts/querytotal")
      .then(response => {
        this.total = response.length;
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
  created() {
    // 初始化总条数
    this.querytotal();
    // 初始化列表
    this.queryaccountlists();
  },
};
</script>

<style lang="less">
@import url("./accountmanage.less");
</style>