<template>
  <div class="vip-account-manage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>会员账号管理</span>
      </div>
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="搜索 :">
          <el-input v-model="search.key" placeholder="会员卡,会员名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click='filterQuery'>查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="vipinfo" stripe style="width: 100%; margin-bottom:20px;">
        <el-table-column prop="vipcard" label="会员卡卡号" width="200"></el-table-column>
        <el-table-column prop="realname" label="会员姓名" width="200"></el-table-column>
        <el-table-column prop="usergroup" label="会员等级" width="200"></el-table-column>
        <el-table-column prop="address" label="地址" width="200"></el-table-column>
        <el-table-column prop="phonecall" label="手机号" width="200"></el-table-column>
        <el-table-column prop="admin" label="管理">
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
      <el-dialog title="修改会员信息" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form">
          <el-form-item label="会员卡" :label-width="formLabelWidth">
            <el-input v-model="form.vipcard" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="会员姓名" :label-width="formLabelWidth">
            <el-input v-model="form.realname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="会员等级" :label-width="formLabelWidth">
            <el-select v-model="form.usergroup" placeholder="请选择分类">
              <el-option label="青铜会员" value="青铜会员"></el-option>
              <el-option label="白银会员" value="白银会员"></el-option>
              <el-option label="黄金会员" value="黄金会员"></el-option>
              <el-option label="铂金会员" value="铂金会员"></el-option>
              <el-option label="钻石会员" value="钻石会员"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机" :label-width="formLabelWidth">
            <el-input v-model="form.phonecall" autocomplete="off"></el-input>
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
import { vipLists, del, returnData, updateData } from '@/api/vipAccount'
export default {
  data() {
    return {
      search: {
        key: ""
      },
      vipinfo: [],
      pagesize: 5,
      currentpage: 1,
      total: 0,
      form: {
        vipcard: "",
        realname: "",
        usergroup: "",
        address: "",
        phonecall: ""
      },
      formLabelWidth: "70px",
      dialogFormVisible: false,
      vipid: ""
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
      this.queryviplists();
    },
    handleCurrentChange(val) {
      this.currentpage = val;
      this.queryviplists();
    },
    // 数据加载
    queryviplists() {
      // 获取页码,页量
      let params = {
        pagesize: this.pagesize,
        currentpage: this.currentpage,
        key: this.search.key,
      };
      vipLists(params)
        .then(response => {
          let {total, data} = response;
          this.total = total;
          this.vipinfo = data.map(item => {
            return {
              vipcard: item.vipcard,
              realname: item.realname,
              usergroup: item.usergroup,
              address: item.address,
              phonecall: item.phonecall,
              id: item.id
            };
          });
          // 如果没有数据,返回上一页并刷新列表
          if (!data.length && this.currentpage !== 1) {
            // 回到上一页
            this.currentpage -= 1;
            this.queryviplists();
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
                this.queryviplists();
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
    // 数据回填
    returndata(id) {
      this.dialogFormVisible = true;
      this.vipid = id;
      returnData({id})
        .then(res => {
          this.form.vipcard = res[0].vipcard;
          this.form.realname = res[0].realname;
          this.form.usergroup = res[0].usergroup;
          this.form.address = res[0].address;
          this.form.phonecall = res[0].phonecall;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 确认修改
    updatedata() {
      this.dialogFormVisible = false;
      let id = this.vipid;
      let params = {
        id: id,
        vipcard: this.form.vipcard,
        realname: this.form.realname,
        usergroup: this.form.usergroup,
        address: this.form.address,
        phonecall: this.form.phonecall
      };
      updateData(params)
        .then(res => {
          let { code, msg } = res;
          if (code === 0) {
            this.$message({
              message: msg,
              type: "success"
            });
            this.queryviplists();
          } else if (code === 1) {
            this.$message.error(msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 模糊查询
    filterQuery(){
      this.queryviplists();
    }
  },
  created() {
    this.queryviplists();
  }
};
</script>

<style lang="less">
@import url("./vipaccountmanage.less");
</style>
