<template>
  <el-header> <nav-header></nav-header></el-header>
  <div class="wrapper">
    <div class="home">
      <div class="head">
        <div class="avatar">
          <img :src="userInfo.avatar" alt="" />
        </div>
        <div class="basic">
          <div>
            <span class="h-name">{{ userInfo.username }}</span>
            <span class="h-sex">{{ userInfo.sex }}</span>
          </div>
          <div class="user-profile-head">
            <ul>
              <li>
                <div class="visited-num">{{ userInfo.visitorSum }}</div>
                <div class="visited-name">被访问</div>
                <div class="bar"></div>
              </li>
              <li>
                <div class="visited-num">{{ userInfo.beAttentionSum }}</div>
                <div class="visited-name">粉丝</div>
                <div class="bar"></div>
              </li>
              <li>
                <div class="visited-num">{{ userInfo.attentionSum }}</div>
                <div class="visited-name">关注</div>
                <div class="bar"></div>
              </li>
            </ul>
          </div>
          <div class="h-basic-spacing"></div>
          <div class="operate-btn">
            <!-- <el-button @click="open"><p>编辑资料</p></el-button> -->
            <el-button round @click="toedit()"><p>编辑资料</p></el-button>
          </div>
        </div>
      </div>
      <!-- 侧边栏部分 -->
      <div class="home-aside">
        <el-row class="tac">
          <el-col :span="12">
            <h5>个人动态</h5>
            <el-menu
              default-active="/myarticle"
              class="el-menu-vertical-demo"
              :default-active="this.$route.path"
              router
            >
              <el-menu-item index="/myarticle">
                <i class="el-icon-menu"></i>
                <span slot="title" name="myarticle">我发布的</span>
              </el-menu-item>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title" @click="open">实名认证</span>
              </el-menu-item>
              <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">改变主题</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">退出登录</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <!-- main -->
      <div class="home-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import navHeader from "../components/navHeader.vue";
import request from "@/utils/request";
import myArticle from "./mine/myArticle.vue";
import edit from "./mine/edit.vue";
import { Plus } from "@element-plus/icons-vue";
export default {
  components: {
    navHeader,
    myArticle,
    edit,
  },
  data() {
    return {
      userId: localStorage.getItem("Id"),
      pageSum: "",
      total: "",
      article: [],
      userInfo: [],
    };
  },
  components: { Plus },
  methods: {
    toedit() {
      this.$router.push("/edit");
    },
    //  handleSelect(name){
    //     this.sidebarItem = name;
    //     this.$router.push({
    //       name: name,
    //     });
    //  },
    changeSex(sex = this.form.sex) {
      let num = 0;
      if (sex == "男") {
        this.num = 1;
      }
      // let data = JSON.stringify({
      //   sex: num.toString(),
      // });
      let data = qs.stringify({
        sex: num,
      });
      request.post("ving/userx/update", data, {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      });
    },

    open() {
      this.$prompt("请输入邮箱", "实名认证", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /[1-9][0-9]{9}/,
        inputErrorMessage: "邮箱格式不正确",
        inputPwd: /[1-9][0-9]{9}/,
        inputErrorMessage: "密码格式不正确",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的邮箱是: " + value,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    getUserInfo(userId = this.userId) {
      console.log(userId);
      request
        .get(
          "/living/user/" + userId + "/info",
          //"/living/user/{useId}/info",
          {
            path: {
              userId: Number(userId),
            },
            headers: {
              "content-type": "application/x-www-form-urlencoded",
            },
          } //设置返回类型
        )
        .then((res) => {
          this.userInfo = res.data;
          // console.log(res.data);
        });
    },
  },
  mounted() {
    this.selectItem = this.$route.name;
  },
  created() {
    this.getUserInfo();
    this.$router.push("/myarticle");
  },
};
</script>

<style scoped>
.wrapper {
  height: 100%;
  width: 100%;
  background-color: #ebebee;
  position: absolute;
}
.home {
  margin: 0 auto;
  width: 1200px;
}
.head {
  display: block;
  height: 192px;
  background-position: 50%;
  background-color: rgba(255, 255, 255, 0.7);
}

.basic {
  margin-top: 40px;
  margin-left: 90px;
}
.avatar {
  position: relative;
  top: 110px;
  left: 20px;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  margin: 0;
  padding: 0;
  border: 1px solid #ddd;
  overflow: hidden;
}
.h-name {
  font-size: 22px;
  line-height: 24px;
}
.user-profile-head {
  position: relative;
  right: 35px;
}
li {
  list-style: none;
  display: block;
  float: left;
}
li div {
  float: left;
}
.avatar img {
  height: 62px;
  width: 62px;
}
.visited-num {
  color: #222226;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  margin-right: 4px;
}
.visited-name {
  color: #555666;
  font-size: 14px;
  line-height: 21px;
  margin-top: 2px;
}
.bar {
  width: 1px;
  height: 16px;
  background: #e8e8ed;
  margin: 0 16px;
}

.operate-btn {
  /* border: 1px solid #ccccd8;
  border-radius: 20px; */
  position: relative;
  right: 20px;
  bottom: 10px;
  font-size: 0;
  float: right;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
/* .operate-btn :hover {
  border: 1px solid #848488;
  border-radius: 20px;
} */

.operate-btn p {
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 14px;
  width: 96px;
  text-align: center;
  height: 32px;
  color: #555666;
  /* text-decoration: none; */
}

.home-aside {
  display: block;
  margin-top: 5px;
  padding: 10px;
  float: left;
  position: absolute;
  height: 100%;
  width: 285px;
  background-color: #fff;
}

.el-col-12 {
  /* max-width: 100%; */
  min-width: 305;
}
.home-main {
  position: absolute;
  display: block;
  margin-left: 310px;
  margin-top: 5px;
  height: 100%;
  width: 890px;
  background-color: #fff;
}
</style>