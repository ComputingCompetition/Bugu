<template>
  <div class="detail">
    <div style="height: 90px">
      <span class="refresh" title="刷新">
        <el-icon style="font-size: 25px"><refresh @click="refresh" /></el-icon
      ></span>

      <span class="publish">
        <el-button @click.native="publish">发布动态</el-button>
      </span>
    </div>

    <div class="currentPage" v-for="(item, key) in lists" :key="item.id">
      <!-- 头部 -->
      <div class="header">
        <span class="user" v-if="item.isAnonymity == 1">
          <img src="../assets/images/head2.png" alt=""
        /></span>
        <span
          class="user"
          v-if="item.publisher && item.publisher.avatar == null"
        >
          <img src="../assets/images/head2.png" alt=""
        /></span>

        <span
          class="user"
          v-if="item.publisher && item.publisher.avatar != null"
        >
          <img :src="item.publisher.avatar" :onerror="errorImage"
        /></span>
        <span
          class="username"
          v-if="item.publisher && item.publisher.username != null"
        >
          {{
            item.publisher.username.length > 8
              ? item.publisher.username.slice(0, 8) + ""
              : item.publisher.username
          }}
        </span>
        <span class="username1" v-show="item.isAnonymity == 1"> 匿名 </span>
        <span
          class="username2"
          v-show="item.publisher && item.publisher.username == null"
          >无名</span
        >
        <span class="time"> {{ timeDifference(item.createTime) }}</span>

        <span class="sex" v-if="item.publisher">
          <img
            v-show="item.publisher.sex == 1"
            src="../assets/images/girl.png"
          />
          <img
            v-show="item.publisher.sex == 0"
            src="../assets/images/boy.png"
          />
        </span>

        <span class="attention" v-show="item.publisher && item.isAnonymity == 0"
          ><el-button
            color="#45bce2"
            style="color: white"
            @click="getname($event, item.publisher.id)"
            >关注</el-button
          ></span
        >

        <!-- <span class="more">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <img src="../assets/images/arrow.png" alt="" />
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
        </span> -->
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
          ><img src="../assets/images/like.png" alt="" />{{
            item.likeSum
          }}</span
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
    <span>
      <el-button @click.native="deleteDynamics">删除指定id动态</el-button>
    </span>
  </div>
  <div><el-button @click="test">test</el-button></div>
</template>


<script>
import request from "@/utils/request";

import { ArrowDown, Refresh } from "@element-plus/icons-vue";
export default {
  // 依赖注入reload
  inject: ["reload"],
  data() {
    return {
      errorImage: 'this.src="' + require("../assets/images/erro.png") + '"',
      lists: [],
      pic: [],
      pageSum: 0,
      publisher: {},
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据
      total: 0,
    };
  },
  components: {
    Refresh,
    ArrowDown,
  },
  methods: {
    GettimeifferenceOfNow(lastDate) {
      var lastDate = lastDate.replace(/\-/g, "/"); //使用replace函数，调用data.replace(/\-/g, "/")将全部的“-”替换为”/“
      var date = new Date(lastDate);
      var date_last = date.getTime();
      var date_now = new Date().getTime();
      var day = Math.round((date_now - date_last) / (1000 * 60 * 60 * 24)); //核心：时间戳相减，然后除以天数
      var hours = Math.round((date_now - date_last) / (1000 * 60 * 60)); //核心：时间戳相减，然后除以天数
      var minutes = Math.round((date_now - date_last) / (1000 * 60)); //核心：时间戳相减，然后除以天数
      var myYear = date.getFullYear(); //获取完整的年份(4位,1970-????)
      var myMonth = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
      var myToday = date.getDate(); //获取当前日(1-31)
      var myDay = date.getDay(); //获取当前星期X(0-6,0代表星期天)
      var myHour = date.getHours(); //获取当前小时数(0-23)
      var myMinute = date.getMinutes(); //获取当前分钟数(0-59)
      var mySecond = date.getSeconds(); //获取当前秒数(0-59)
      var week = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      var nowTime;

      if (day > 0) {
        return {
          DistanceNow: `${day}天前`,
          Detailed:
            myYear +
            "-" +
            myMonth +
            "-" +
            myToday +
            " " +
            (myHour < 10 ? "0" + myHour : myHour) +
            ":" +
            (myMinute < 10 ? "0" + myMinute : myMinute),
          MinuteDifference: minutes,
          HourDifference: hours,
        };
      } else if (hours > 0) {
        return {
          DistanceNow: `${hours}小时前`,
          Detailed:
            (myHour < 10 ? "0" + myHour : myHour) +
            ":" +
            (myMinute < 10 ? "0" + myMinute : myMinute),
          MinuteDifference: minutes,
          HourDifference: hours,
        };
      } else if (minutes > 0) {
        return {
          DistanceNow: `${minutes}分钟前`,
          Detailed:
            (myHour < 10 ? "0" + myHour : myHour) +
            ":" +
            (myMinute < 10 ? "0" + myMinute : myMinute),
          MinuteDifference: minutes,
          HourDifference: hours,
        };
      } else {
        return {
          DistanceNow: `刚刚`,
          Detailed:
            (myHour < 10 ? "0" + myHour : myHour) +
            ":" +
            (myMinute < 10 ? "0" + myMinute : myMinute),
          HourDifference: hours,
          MinuteDifference: minutes,
        };
      }
    },
    deleteDynamics() {
      request
        .delete(
          "/living/activity/678/delete",
          {
            headers: {
              "content-type": "application/x-www-form-urlencoded",
            },
          } //设置返回类型
        )
        .then((res) => {
          if (res.code == "00000") {
            this.lists = res.data.list;
          }
        });
    },

    timeDifference(time) {
      var time = this.GettimeifferenceOfNow(time);
      return time.DistanceNow;
    },
    publish() {
      this.$router.push("/publish");
    },
    // 刷新
    refresh() {
      this.reload();
    },
    // handleSizeChange(val) {
    //   this.pageSize = val;
    //   this.getList();
    // },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage; //修改currentPage
      this.getList();
    },
    getname(e, id) {
      var buttonText = "已关注";
      var userId = id;
      e.target.innerText = buttonText;
      localStorage.setItem(" buttonText", "已关注");
      request
        .post("/living/social/attention/" + userId, {
          path: {
            userId: Number(id),
          },
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          if (res.code === "00000") {
            console.log(res.data);
          }
        });
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
          if (res.code == "00000") {
            this.reload;
            this.lists = res.data.list;
            this.pageSum = res.data.pageSum;
            this.total = res.data.total;
          }
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
            this.lists.likesum = this.lists.likesum + 1;
            this.getList();
          } else if (res.code === "A0004") alert("请不要重复点赞");
        });
    },
    Cancelike(id) {
      request
        .post("/living/activity/" + id + "/like/remove", {
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
            this.lists.likesum = this.lists.likesum - 1;
            this.getList();
          } else if (res.code === "A0004") alert("");
        });
    },
  },

  created() {
    this.getList();
  },
};
</script>

<style scoped>
.publish[data-v-4f1447e8] {
  margin-left: 660px;
  position: relative;
  top: -170px;
}

/* 内容部分 */

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
/* .example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
} */
.header {
  width: 770px;
  height: 50px;
  /* background-color: pink; */
  overflow: hidden;
}
.header span {
  float: left;
  display: line-block;
  width: 60px;
  height: 45px;
  line-height: 30px;
  /* background-color: blue; */
  margin-top: 0px;
  font-size: 10px;
}
span.username,
span.username2,
span.username1 {
  width: 90px;
}

.header .user img {
  height: 35px;
  border-radius: 50%;
  margin-left: -18px;
  margin-top: 4px;
}
.header .more img {
  height: 25px;
}
.sex img {
  height: 15px;
  margin-top: 5px;
}
.sex {
  width: 50px;
  line-height: 30px;
}
.attention {
  /* display: block;
  height: 20px; */
  margin-left: 400px;
  margin-top: 4px;
}
.el-button[data-v-4f1447e8] {
  height: 23px;
  margin-top: 7px;
}
.more {
  margin-left: 10px;
}
.more image {
  height: 5px;
}

/* 底部样式 */
.footer {
  width: 770px;
  margin-top: 30px;
  height: 50px;
  overflow: hidden;
}
.footer span {
  float: left;
  line-height: 70px;
  display: line-block;
}
.like {
  margin-left: 600px;
}
.comments {
  margin-left: 20px;
}
.footer img {
  height: 30px;
}
.el-pagination {
  width: 110px;
}
</style>
