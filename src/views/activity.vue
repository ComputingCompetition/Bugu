<template>
  <div class="currentPage" v-for="(item, key) in result" :key="item.id">
    <!-- 头部 -->
    <div class="header">
      <span class="user" v-if="item.publisher && item.publisher == null">
        <img src="../assets/images/head2.png" alt=""
      /></span>
      <span class="user" v-if="item.publisher && item.publisher.avatar == null">
        <img :src="item.publisher.avatar" alt=""
      /></span>
      <span class="user" v-if="item.publisher && item.publisher.avatar != null">
        <img :src="item.publisher.avatar" alt=""
      /></span>
      <span
        class="username"
        v-if="item.publisher && item.publisher.username != null"
      >
        {{ item.publisher.username }}
      </span>
      <span class="username1" v-show="item.isAnonymity == 1"> 匿名 </span>
      <span
        class="username2"
        v-show="item.publisher && item.publisher.username == null"
        >无名
      </span>

      <span class="sex" v-if="item.publisher">
        <img v-show="item.publisher.sex == 1" src="../assets/images/girl.png" />
        <img v-show="item.publisher.sex == 0" src="../assets/images/boy.png" />
      </span>

      <span class="attention" v-show="item.isAnonymity == 0"
        ><el-button
          color="#45bce2"
          style="color: white"
          @click="getname($event, item.id)"
          >关注</el-button
        ></span
      >

      <span class="more">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <img src="../assets/images/more.png" alt="" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="取消关注" @click="cancleAttention()"
                >取消关注</el-dropdown-item
              >
              <el-dropdown-item @click="privateChat()">私聊</el-dropdown-item>
              <el-dropdown-item command="举报" @click="report()"
                >举报</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </span>
    </div>
    <!-- 内容部分 -->
    <div class="text-content">
      <p>{{ item.text }}</p>
    </div>
    <div class="imageContainer">
      <span v-for="(item, key) in item.pic" :key="key">
        <el-image
          fit="cover"
          :src="item"
          :preview-src-list="[item]"
          style="height: 300px; width: 33%"
        >
        </el-image>
      </span>
    </div>
    <!-- 底部 -->
    <div class="footer">
      <span class="share">
        <img src="../assets/images/share.png" alt="" />
      </span>

      <span class="like" @click="like(item.id)"
        ><img src="../assets/images/like.png" alt="" />{{ item.likeSum }}</span
      >
      <span class="comments">
        <router-link
          :to="{
            path: '/detail',
            query: {
              id: item.id,
            },
          }"
          ><img src="../assets/images/comment.png" /> </router-link
        >{{ item.commentSum }}
      </span>
    </div>
  </div>

  <!-- 分页 -->
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage"
    :page-size="pagesize"
    layout="total,prev, pager, next, jumper"
    :total="total"
    :key="currentPage"
  >
  </el-pagination>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "Question",
  data() {
    return {
      result: JSON.parse(sessionStorage.getItem("res")),
      lists: [],
      pic: [],
      pageSum: 0,
      publisher: {},
      currentPage: 2, //初始页
      pagesize: 5, //    每页的数据
      total: 0,
    };
  },
  methods: {
    deleteDynamics() {
      request
        .delete(
          "/living/activity/640/delete",
          {
            headers: {
              "content-type": "application/x-www-form-urlencoded",
            },
          } //设置返回类型
        )
        .then((res) => {
          this.lists = res.data.list;
          console.log(res.data.list);
        });
    },
    // 刷新
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage; //修改currentPage
      this.getList();
    },
    getname(e, id) {
      e.target.innerText = "已关";
    },
    getList() {
      request
        .get(
          "/living/activity/square",
          {
            params: {
              page: this.currentPage,
            },
          },
          {
            headers: {
              "content-type": "application/x-www-form-urlencoded",
            },
          } //设置返回类型
        )
        .then((res) => {
          this.lists = res.data.list;
          this.pageSum = res.data.pageSum;
          this.total = res.data.total;
        });
    },
    like(id) {
      request
        .post("/living/activity/" + id + "/like", {
          path: {
            // id: qs.stringify(id),
            id: Number(id),
          },
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          if (res.code === "00000") {
            console.log(res.data);
          }
          console.log(res);
          this.lists.likesum = this.lists.likesum + 1;
          console.log(this.lists);
          // res.data.list.isLiked = 1;
        });
    },
    Cancelike(id) {
      request.post("/living/activity/" + id + "/like/remove", {
        path: {
          // id: qs.stringify(id),
          id: Number(id),
        },
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      });
    },
    pagination() {
      let pageSum = res.data.pageSum;
      let artices = res.data.list;
      console.log(artices);
      if (this.page == 1) {
        this.setState({
          artices: artices,
          scrollInto: "",
          haveMoreData: true,
        });
      } else {
        if (page > pageSum) {
          this.setState({
            haveMoreData: false,
          });
        } else {
          let allArtices = this.state.artices.concat(artices);
          this.setState({
            artices: allArtices,
          });
          if (page == pageSum) {
            this.setState({
              haveMoreData: false,
            });
          } else {
            this.setState({
              haveMoreData: true,
            });
          }
        }
      }
      if (artices.length < 1) {
        //如果这一页没有动态则切换到下一页
        if (page < pageSum) {
          this.page = page + 1;
        }
      }
      // } else {
      //   console.log("searchActivities", res.data);
      // }
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style scoped>
.publish {
  background-color: pink;
  margin-left: 660px;
  position: relative;
  top: -10px;
}
.refresh {
  margin-left: -5px;
}
.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 200px;
  height: 100%;
}
.currentPage {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.text-content {
  /* background-color: pink; */
  text-align: left;
  line-height: 25px;
}
/* 头部样式 */
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.header {
  width: 770px;
  height: 50px;
  /* background-color: pink; */
}
.header span {
  float: left;
  height: 50px;
  line-height: 30px;
  /* background-color: pink; */
}
.username,
.username2,
.username1 {
  width: 100px;
  /* line-height: 30px; */
  /* background-color: pink; */
}

.header img {
  height: 35px;
}
.header .user img {
  height: 40px;
}
.sex img {
  height: 25px;
  margin-top: 5px;
}
.sex {
  /* background-color: rgb(146, 16, 38); */
  width: 50px;
  line-height: 30px;
}
.attention {
  display: block;
  height: 50px;
  /* background-color: pink; */
  margin-left: 60%;
}
.more {
  margin-left: 10px;
  /* float: right; */
  /* background-color: gray; */
}
.header .more image {
  height: 10px;
}
.header.attention.el-button {
  margin-top: -10px;
}
/* 底部样式 */
.footer {
  width: 770px;
  margin-top: 30px;
  height: 50px;
}
.footer span {
  float: left;
  line-height: 50px;
}
.like {
  margin-left: 560px;
}
.footer img {
  height: 40px;
}
</style>