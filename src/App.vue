<template>
  <div>
    <!-- <router-view v-if="showRouter"></router-view> -->
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import Login from "./components/Login.vue";
import hotList from "./views/hotList.vue";
export default {
  name: "App",
  mounted() {
    this.$router.push("/hotlist");
  },
  components: {
    //MainPage,
    hotList,
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false; //先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true; //再打开
      });
    },
  },
};
</script>
<style>
#App {
  height: 100%;
}
</style>

