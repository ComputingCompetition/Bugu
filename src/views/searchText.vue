<template>
  <span class="search">
    <el-input
      v-model="subText"
      :fetch-suggestions="querySearchAsync"
      placeholder="搜索动态"
      @select="handleSelect"
    >
      <template #append>
        <el-button :icon="Search" @click="searchActivities()"></el-button>
      </template>
      <!-- <el-button type="primary" icon="el-icon-search">搜索</el-button> -->
    </el-input>
  </span>
</template>

<script>
import { Search } from "@element-plus/icons-vue";
import request from "@/utils/request";
import qs from "qs";
export default {
  name: "search",
  data() {
    return {
      subText: "",
      ArticleItem: [],
      timeout: null,
      hotLabels: [],
      state: {
        searchText: "",
        haveMoreData: false,
        artices: [],
        openActionSheet: false,
        scrollInto: "",
        hotLabels: [],
        showHotLabels: true,
        searchHistory: [],
      },
      page: 1,
      searchTextBefore: "",
    };
  },
  setup() {
    return {
      Search,
    };
  },
  methods: {
    searchActivities() {
      // qs.stringify({ page: this.page,
      //         subText: this.subText,})
      request
        .get(
          "/living/activity/fullTextQuery",
          {
            params: {
              page: this.page,
              subText: this.subText,
            },
            headers: {
              "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
          } //设置返回类型
        )
        .then((res) => {
          console.log(res);
          if (res.code === "00000") {
            let pageSum = res.data.pageSum;
            let artices = res.data.list;
            console.log(artices);
            if (page == 1) {
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
          } else {
            console.log("searchActivities", res.data);
          }
          let searchHistory = this.state.searchHistory;
          if (searchHistory.indexOf(subText) == -1) {
            searchHistory.push(subText);
            if (searchHistory.length > 7) {
              searchHistory.splice(0, 1);
            }
            localStorage.setItem({
              key: "search_history",
              data: searchHistory,
            });
          }
        });
    },
  },
};
</script>

<style scoped>
.search {
  /* display: block; */
  /* width: 500px; */
  margin-left: 50px;
  margin-right: 100px;
  /* background-color: rgb(129, 72, 72); */
}
.el-button:hover {
  background-color: antiquewhite;
  display: inline;
}
</style>