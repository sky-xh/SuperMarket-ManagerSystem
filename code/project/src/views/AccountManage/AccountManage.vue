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
            :page-sizes="[1, 5, 10, 20]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="20"
            style="margin-top: 20px"
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
      accountManage: [],
      dialogVisible: false,
      ids: [],
      dialogFormVisible: false,
      form: {
        name: "",
        region: ""
      },
      formLabelWidth: "70px",
      updateid: ""
    };
  },
  methods: {
    // 页面刷新加载数据
    queryaccountlists() {
      this.$http
        .get("http://127.0.0.1:3000/accounts/accountlists")
        .then(response => {
          // 如果没有数据,直接返回
          if (response == []) {
            return;
          }
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
    }
  },
  created() {
    this.queryaccountlists();
  }
};
</script>

<style lang="less">
@import url("./accountmanage.less");
</style>