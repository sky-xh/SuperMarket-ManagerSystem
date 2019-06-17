<template>
  <div class="personal">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>个人中心</span>
      </div>
      <div>
        <el-row>
        <el-col :span="5"><div class="grid-content bg-purple">
          
          <div>
          <el-upload
            class="avatar-uploader"
            action="suiyi"
            :http-request='upLoad'
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        </div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">
            <div style="margin-top:20px;">
          <p>&emsp;&emsp;&emsp;ID:&emsp;&emsp;{{ accountinfo.id }}</p>
          <p>&emsp;用户名:&emsp;&emsp;{{ accountinfo.account }}</p>
          <p>&emsp;用户组:&emsp;&emsp;{{ accountinfo.region }}</p>
          <p>创建时间:&emsp;&emsp;{{ accountinfo.createtime | filtertime }}</p>
        </div>
        </div></el-col>
        </el-row>
        
        
      </div>
    </el-card>
  </div>
</template>

<script>
import moment from "moment";
import axios from 'axios';
export default {
  data() {
    return {
      accountinfo: {
        id: "",
        account: "",
        region: "",
        createtime: ""
      },
      imageUrl: ""
    };
  },
  methods: {
    accountInfo() {
      this.$http
        .get("/accounts/accountinfo")
        .then(res => {
          let { id, account, region, createtime } = res[0];
          this.accountinfo.id = id;
          this.accountinfo.account = account;
          this.accountinfo.region = region;
          this.accountinfo.createtime = createtime;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 头像上传之前回调
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 自定义上传函数
    upLoad(file){
        // 创建一个formData对象
        let formData = new FormData();
        //  把文件数据放入formData
        formData.append('file', file.file)
        // 发送axios到后端
        axios.post('accounts/uploadavatar', formData, {
            header: {'Content-Type': 'multipart/form-data'}
        })
        .then(res => {
            let {code, msg, path} = res.data;
            if(code === 0){
                this.$message({
                    type: 'success',
                    message: msg,
                })
                // 回填头像
                this.imageUrl = `http://127.0.0.1:3000${path}`
                this.$emit('A');
            }else if(code === 1){
                this.$message.error(msg);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
  },
  filters: {
    filtertime(val) {
      return moment(val).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  created() {
    this.accountInfo();
  }
};
</script>

<style lang='less'>
  @import url('./personal.less');
</style>
