<template>
  <div class="upload" title="上传头像">
    <el-upload
      list-type="picture-card"
      multiple
      ref="upload"
      action="https://upload.qiniup.com/"
      :before-upload="beforeAvatarUpload"
      :auto-upload="false"
      :limit="1"
      :data="form"
      :on-change="fileChange"
      :file-list="fileList"
      :on-exceed="handleExceed"
    >
      <el-icon-plus />
    </el-upload>
  </div>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="用户名">
      <el-input v-model="form.name" style="width: 180px"></el-input>
    </el-form-item>
    <!-- <el-form-item label="所在地区">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item label="出生年月">
      <el-col :span="11">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.date1"
          style="width: 180px"
        ></el-date-picker>
      </el-col>
      <!-- <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker
          placeholder="选择时间"
          v-model="form.date2"
          style="width: 100%"
        ></el-time-picker>
      </el-col> -->
    </el-form-item>

    <el-form-item label="性别">
      <el-radio-group v-model="form.sex">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="个性签名">
      <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="back">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      imageUrl: "",
      uploadImages: [],
      imgForm: {
        token: "",

        key: "",
      },
      fileVouchers: [
        {
          token: "",
          key: "",
        },
      ],
      pictureList: [],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        sex: "",
        desc: "",
      },
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    // handleAvatarSuccess(res, file) {
    //   this.imageUrl = URL.createObjectURL(file.raw);
    // },
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === "image/jpeg";
    //   const isLt2M = file.size / 1024 / 1024 < 2;

    //   if (!isJPG) {
    //     this.$message.error("上传头像图片只能是 JPG 格式!");
    //   }
    //   if (!isLt2M) {
    //     this.$message.error("上传头像图片大小不能超过 2MB!");
    //   }
    //   return isJPG && isLt2M;
    // },
    fileChange(file, fileList) {
      this.fileList = fileList;
    },
    fileRemove(file, fileList) {
      this.fileList = fileList;
    },
    changeAvatar() {
      request
        .post("/living/user/avatar/token", {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          if (res.data.code === "00000") {
            const formData = new FormData();
            this.fileVouchers = res.data;
            this.fileVouchers.forEach((item) => {
              this.uploadImages.push(item.fileName);
              console.log(this.uploadImages);
            });
            this.fileVouchers.forEach((item, index) => {
              formData.append(index, item);
            });
            if (this.fileVouchers) {
              this.fileVouchers.forEach((item) => {
                this.imgForm.token = aes.decrypt(item.token);
                this.imgForm.key = item.fileName;
                console.log(this.form.token);
              });
            }
            this.$refs.upload.submit();
          }
        });
    },
    changeName(username) {
      username = this.form.name;
      if (username == "") {
        this.$message("用户名不能为空");
        return;
      }
      request.post("/living/user/username/change/" + username, {
        path: {
          username: this.form.name,
        },
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      });
    },
    changeSex(sex = this.form.sex) {
      let num = 0;
      if (sex == "男") {
        this.num = 1;
      }
      let data = JSON.stringify({
        sex: num.toString(),
      });
      // let data = JSON.stringify({ sex: num });
      request.post("/living/user/sex/update", data, {
        headers: {
          "content-type": "application/json",
        },
      });
    },
    onSubmit() {
      this.changeName();
      this.changeSex();
      console.log("submit!");
    },
  },
};
</script>

<style scoped>
.upload {
  padding: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>