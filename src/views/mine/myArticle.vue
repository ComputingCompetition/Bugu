<template>
  <p>一共发布{{ total }}条动态</p>
  <div v-if="article.length == 0">
    <el-empty description="空空如也"></el-empty>
  </div>
  <!-- 发布的动态 -->
  <div class="currentPage" v-for="(item, key) in article" :key="key">
    <div class="article">
      <router-link active-class="active" to="/detail">
        {{ item.text }}</router-link
      >
      <span class="time"
        ><svg
          t="1647255835359"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2830"
          width="200"
          height="200"
        >
          <path
            d="M621.674667 408.021333c16.618667-74.24 28.224-127.936 34.837333-161.194666C673.152 163.093333 629.941333 85.333333 544.298667 85.333333c-77.226667 0-116.010667 38.378667-138.88 115.093334l-0.586667 2.24c-13.728 62.058667-34.72 110.165333-62.506667 144.586666a158.261333 158.261333 0 0 1-119.733333 58.965334l-21.909333 0.469333C148.437333 407.808 106.666667 450.816 106.666667 503.498667V821.333333c0 64.8 52.106667 117.333333 116.394666 117.333334h412.522667c84.736 0 160.373333-53.568 189.12-133.92l85.696-239.584c21.802667-60.96-9.536-128.202667-70.005333-150.186667a115.552 115.552 0 0 0-39.488-6.954667H621.674667zM544.256 149.333333c39.253333 0 59.498667 36.48 49.888 84.928-7.573333 38.144-21.984 104.426667-43.221333 198.666667-4.512 20.021333 10.56 39.093333 30.912 39.093333h218.666666c6.101333 0 12.16 1.066667 17.909334 3.168 27.445333 9.984 41.674667 40.554667 31.776 68.266667l-85.568 239.573333C744.981333 838.026667 693.301333 874.666667 635.402667 874.666667H223.498667C194.314667 874.666667 170.666667 850.784 170.666667 821.333333V503.498667c0-17.866667 14.144-32.448 31.829333-32.821334l21.866667-0.469333a221.12 221.12 0 0 0 167.381333-82.56c34.346667-42.602667 59.146667-99.306667 74.869333-169.877333C482.101333 166.336 499.552 149.333333 544.266667 149.333333z"
            p-id="2831"
          ></path></svg
        >{{ item.isLiked }}</span
      >
      <span
        ><svg
          t="1647255745913"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1992"
          width="200"
          height="200"
        >
          <path
            d="M512.1 208.4C264.6 208.4 64 343.7 64 510.6s200.6 302.2 448.1 302.2 448.1-135.3 448.1-302.2-200.6-302.2-448.1-302.2zM864 590.1c-17.2 27.4-42.5 52.5-75.3 74.6-34.9 23.5-75.9 42.1-121.9 55.2-48.8 13.9-100.9 21-154.7 21s-105.9-7.1-154.7-21c-46.1-13.1-87.1-31.7-121.9-55.2-32.8-22.1-58.1-47.2-75.3-74.6-16.1-25.6-24.2-52.3-24.2-79.4s8.1-53.8 24.2-79.4c17.2-27.4 42.5-52.5 75.3-74.6 34.9-23.5 75.9-42.1 121.9-55.2 48.8-13.9 100.9-21 154.7-21s105.9 7.1 154.7 21c46.1 13.1 87.1 31.7 121.9 55.2 32.8 22.1 58.1 47.2 75.3 74.6 16.1 25.6 24.2 52.3 24.2 79.4s-8.2 53.8-24.2 79.4z"
            p-id="1993"
          ></path>
          <path
            d="M512.1 346.2c-90.9 0-164.5 73.7-164.5 164.5s73.7 164.5 164.5 164.5 164.5-73.7 164.5-164.5-73.7-164.5-164.5-164.5z m0 257c-51 0-92.5-41.5-92.5-92.5s41.5-92.5 92.5-92.5 92.5 41.5 92.5 92.5-41.5 92.5-92.5 92.5z"
            p-id="1994"
          ></path></svg
        >{{ item.viewSum }}</span
      >
      <span>{{ item.publishTime }}</span>
      <a class="article-pic"><img :src="item.pic" /></a>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      userId: localStorage.getItem("Id"),
      pageSum: "",
      total: "",
      article: [],
      userInfo: [],
    };
  },

  methods: {
    getMyArticle(userId = this.userId) {
      request
        .get("/living/user/" + userId + "/activity", {
          path: {
            userId: Number(userId),
          },
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          console.log(res);
          this.pageSum = res.data.pageSum;
          this.total = res.data.total;
          this.article = res.data.list;
          // console.log(res.data);
        });
    },
  },
  created() {
    this.getMyArticle();
  },
};
</script>

<style scoped>
svg {
  position: relative;
  top: 2px;
  width: 20px;
  height: 20px;
  color: rgb(112, 111, 111);
}
.article a {
  display: block;
  font-size: 18px;
  text-decoration: none;
  color: rgb(112, 111, 111);
}
.article a:hover {
  color: black;
}

.article {
  color: rgb(112, 111, 111);
  width: 870px;
  height: 150px;
  padding: 0 10px;
  padding-top: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.article-pic {
  position: relative;
  bottom: 10px;
  display: block;
  float: right;
  padding-right: 20px;
  max-height: 120px;
  width: 160px;
  overflow: hidden;
}
.article span {
  padding: 0 10px;
  position: relative;
  top: 80px;
}
.article-pic img {
  max-width: 160px;
}
</style>