<template>
  <!-- 动态详情 -->
  <div class="detail">
    <!-- 详情头部 -->
    <div class="header">
      <span class="user" v-if="activityInfo.isAnonymity == 1">
        <img src="../assets/images/head2.png" alt=""
      /></span>
      <span
        class="user"
        v-if="activityInfo.publisher && activityInfo.publisher.avatar == null"
      >
        <img src="../assets/images/head2.png" alt=""
      /></span>

      <span
        class="user"
        v-if="activityInfo.publisher && activityInfo.publisher.avatar != null"
      >
        <img :src="activityInfo.publisher.avatar" :onerror="errorImage"
      /></span>
      <span
        class="username"
        v-if="activityInfo.publisher && activityInfo.publisher.username != null"
      >
        {{
          activityInfo.publisher.username.length > 8
            ? activityInfo.publisher.username.slice(0, 8) + ""
            : activityInfo.publisher.username
        }}
      </span>
      <span class="username1" v-show="activityInfo.isAnonymity == 1">
        匿名
      </span>
      <span
        class="username2"
        v-show="
          activityInfo.publisher && activityInfo.publisher.username == null
        "
        >无名
      </span>

      <span class="sex" v-if="activityInfo.publisher">
        <img
          v-show="activityInfo.publisher.sex == 1"
          src="../assets/images/girl.png"
        />
        <img
          v-show="activityInfo.publisher.sex == 0"
          src="../assets/images/boy.png"
        />
      </span>

      <span class="attention" v-show="activityInfo.isAnonymity == 0"
        ><el-button
          color="#45bce2"
          style="color: white"
          @click="getname($event, activityInfo.id)"
          >关注</el-button
        ></span
      >
    </div>
    <!--详情 内容部分 -->
    <div class="text-content">
      <p>{{ activityInfo.text }}</p>
    </div>
    <div class="imageContainer">
      <span v-for="(item, index) in activityInfo.pic" :key="item.id">
        <el-image
          fit="cover"
          :src="item"
          :preview-src-list="[item]"
          style="height: 300px; width: 33%"
        >
        </el-image>
      </span>
    </div>
    <!--详情 底部 -->
    <div class="footer">
      <span class="share">
        <img src="../assets/images/share.png" alt="" />
      </span>

      <span class="like" @click="like(activityInfo.id)"
        ><img src="../assets/images/like.png" alt="" />{{
          activityInfo.likeSum
        }}</span
      >
      <span class="comments">
        <router-link
          :to="{
            path: '/detail',
            query: {
              id: activityInfo.id,
            },
          }"
          ><img src="../assets/images/comment.png" /> </router-link
        >{{ activityInfo.commentSum }}
      </span>
      <!-- 动态评论-->
      <span class="response">
        <img
          src="../assets/images/response.png"
          @click.native.stop="toggleBox1"
        />
      </span>
    </div>
    <!-- 动态评论输入框-->
    <div v-show="open1">
      <el-input v-model="content1">
        <template #append>
          <el-icon @click="commentDynamic(activityInfo.id)"
            ><position
          /></el-icon>
        </template>
      </el-input>
    </div>
  </div>
  <!-- 评论详情部分 -->
  <div class="commentList">
    <div
      v-for="(item, index) in commentList"
      :key="item.id"
      class="commentInfo"
    >
      <!-- 每个评论头部 -->
      <div class="commentHeader">
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
          >无名
        </span>
      </div>
      <!-- 每个评论内容 -->
      <div class="content">
        <p>{{ item.content }}</p>
      </div>
      <!-- 每个评论底部 -->
      <div class="footer">
        <span class="like" @click="like(item.id)"
          ><img src="../assets/images/like.png" alt="" />{{
            item.likeSum
          }}</span
        >
        <span class="comments">
          <img
            src="../assets/images/comment.png"
            @click="getResponse(item.id)"
          />{{ item.responseSum }}
        </span>
        <span class="response">
          <img
            src="../assets/images/response.png"
            @click.native.stop="toggleBox(index)"
          />
        </span>
      </div>
      <el-input v-model="content[index]" v-show="open[index]">
        <template #append>
          <el-icon @click="response(item.id, index, item.publisher.id)"
            ><position
          /></el-icon>
        </template>
      </el-input>
      <!-- 回复列表 -->
      <div
        class="rsponse"
        v-show="item.responseSum > 0"
        v-for="(list, index) in responseLists"
        :key="list.id"
      >
        <div class="reponseContent">
          <div class="header">
            <span class="user">
              <img :src="list.fromUserAvatar" :onerror="errorImage"
            /></span>
            <span class="username3">
              {{
                list.fromUsername.length > 8
                  ? list.fromUsername.slice(0, 8) + ""
                  : list.fromUsername
              }}
            </span>
          </div>
          <!-- 回复内容 -->
          <div class="content">
            <p>{{ list.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import qs from "qs";
import { Position } from "@element-plus/icons-vue";
export default {
  data() {
    return {
      activityInfo: {},
      content: [],
      content1: "",
      type: 1,
      commentList: [],
      responseLists: [],
      open1: "",
      open: [],
    };
  },
  components: { Position },
  methods: {
    toggleBox1() {
      this.open1 = !this.open1;
    },
    toggleBox(index) {
      this.open[index] = !this.open[index];
    },
    // 评论动态
    commentDynamic(id) {
      let data = qs.stringify({
        id: id,
        type: this.type,
        text: this.content1,
      });

      request
        .post("/living/activity/" + id + "/comment", data, {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          if (res.code === "00000") {
            this.getCommentList();
            this.getInfo();
          }
        });
    },
    // 回复
    response(id, index, idpub) {
      var toUserId = parseInt(idpub);
      let data = qs.stringify({
        id: Number(id),
        content: this.content[index],
        type: this.type,
        toUserId: toUserId,
      });
      request
        .post("/living/activity/comment/" + id + "/response", data, {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          this.responseLists = res.data;
          console.log(res);
        });
    },
    // 获取评论回复列表
    getResponse(id) {
      request
        .get(
          "/living/activity/comment/" + id + "/responseList",

          {
            headers: {
              "content-type": "x-www-form-urlencoded",
            },
          } //设置返回类型
        )
        .then((res) => {
          this.responseLists = res.data;
        });
    },
    // 获取动态详情
    getInfo() {
      var id = this.$route.query.id;
      request
        .get(
          "/living/activity/" + id + "/info",

          {
            headers: {
              "content-type": "x-www-form-urlencoded",
            },
          } //设置返回类型
        )
        .then((res) => {
          this.activityInfo = res.data;
        });
    },
    getCommentList() {
      var id = this.$route.query.id;
      request
        .get(
          "/living/activity/" + id + "/commentList",
          {
            headers: {
              "content-type": "x-www-form-urlencoded",
            },
          } //设置返回类型
        )
        .then((res) => {
          // console.log(res);
          this.commentList = res.data;
        });
    },
  },
  created() {
    // console.log(this.$route.query.id);

    this.getCommentList();
    this.getInfo();
  },
};
</script>

<style scoped>
/* 动态详情 */

.detail {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.text-content {
  text-align: left;
  line-height: 25px;
  width: 760px;
}
/* 头部样式 */

.commentHeader,
.header {
  width: 760px;
  height: 45px;
  /* background-color: gray; */
  overflow: hidden;
}
.commentHeader span,
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

.commentHeader .user img,
.header .user img {
  height: 35px;
  border-radius: 50%;
  margin-left: -18px;
  margin-top: 2px;
}
.commentHeader .more img,
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
  display: block;
  height: 20px;
  margin-left: 450px;
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
.header.attention.el-button {
  margin-top: -10px;
}
.el-button {
  height: 25px;
}
/* 底部样式 */
.footer {
  width: 770px;
  margin-top: 30px;
  height: 50px;
  /* border-bottom: 1px solid #000; */
}
.footer span {
  float: left;
  line-height: 70px;
  display: line-block;
}
.like {
  margin-left: 580px;
  margin-right: 10px;
}
.comments {
  margin-left: 10px;
  margin-right: 10px;
}

.footer img {
  height: 30px;
}
/* 评论详情 */

.commentInfo {
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
  border-bottom: solid #eee thin;
  min-height: 100px;
  line-height: 100px;
  border-collapse: collapse;
}
.reponseContent {
  border-top: solid #eee thin;
  min-height: 100px;
  line-height: 100px;
  border-collapse: collapse;
}
.content {
  text-align: left;
  line-height: 25px;
}
.el-input-group {
  width: 92%;
}
</style>