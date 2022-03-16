<template>
  <div class="hotlist">
    <div class="hotItem" v-for="(item, key) in lists" :key="key">
      <div class="hot-index">{{ item.id }}</div>
      <div class="hot-content">
        <a href="">
          <p>{{ item.text }}</p>
        </a>
      </div>

      <span class="time">{{ item.createTime }}</span>

      <!-- <a class="hot-img">{{ item.pic }}</a> -->
      <span class="hot"
        ><svg
          t="1646044788301"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1474"
          width="200"
          height="200"
        >
          <path
            d="M421.4 960S34.1 872.6 207.2 438.8c0 0 39.3 48.2 33.9 71.4 0 0 30.8-109.5 97.3-174.9C395.5 279.1 453.5 121.1 400 64c0 0 265 57.1 294.5 342.7 0 0 33.9-91 103.5-100 0 0-21.4 50 0 125 0 0 219.5 385.5-158.8 515.8 0 0 113.4-132.1-127.1-358.8 0 0-56.7 121.4-90.6 164.2-0.1 0.1-94.7 108.9-0.1 207.1z"
            fill="#707070"
            p-id="1475"
          ></path>
        </svg>
        {{ item.commentSum }}</span
      >
      <a class="hot-img"><img :src="item.pic" /></a>
    </div>
  </div>

  <!-- <div class="hotItem" v-for="(item, key) in lists">
    <div class="hot-index">{{ item.id }}</div>
  </div> -->
</template>

<script>
import request from "@/utils/request";
//import { pathway } from "@/utils/common";
export default {
  name: "HotList",
  data() {
    return {
      lists: [],
      imgurl:
        "http://file.buguxingqiu.xyz/user/activity/242-308ba75a-bebf-4170-9f98-9f5ced030822",
    };
  },
  mounted() {
    request
      .get(
        "/living/activity/hot",
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        } //设置返回类型
      )
      .then((res) => {
        // this.lists = data.lists;
        //this.text = res.data.list[0].text;
        this.lists = res.data.list;
        console.log(res.data.list);
        //this.imgSrc =
        //= res.data.list.pic;
        // "data:image/png;base64," +
        // Buffer.from(res.data.list).toString("base64");
        //console.log(item.pic);
        //lists.value = data.content;
        //let a = data.list.text[1];
      });
  },
};
</script>


<style scoped>
.hot-index {
  display: inline;
  text-align: center;
  width: 57px;
  line-height: 58px;
  font-size: 18px;
  color: #999;
}

.hot-content {
  flex: 1 1;
  font-size: 18px;
  line-height: 18px;
  min-height: 120px;
  text-align: left;
  width: 400px;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  /* -webkit-box-orient: vertical; */
  font-weight: 600;
  font-synthesis: style;
}

a {
  text-decoration: none;
}

p {
  font-family: "Microsoft YaHei";
  color: black;
}

.hotItem {
  border: 1px solid #ddd;
  background-color: rgb(247, 246, 255);
  padding: 16px 16px 16px 0;
  min-height: 57px;
  display: flex;
}
svg {
  position: relative;
  top: 2px;
  width: 20px;
  height: 20px;
}
.hot-img {
  display: block;
  height: 120px;
  width: 160px;
  overflow: hidden;
}
.hot-img img {
  max-width: 160px;
}

.time {
  display: inline;
  font-size: 14px;
  height: 16px;
  line-height: 50px;
  color: rgb(184, 184, 184);
  position: relative;
  top: 90px;
  right: 350px;
  flex-direction: column;
  margin-bottom: 8px;
}

.hot {
  position: relative;
  top: 90px;
  right: 540px;
  line-height: 50px;
}
</style>
