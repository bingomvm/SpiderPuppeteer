<template>
  <div class="spider-puppeteer-wrapper">
    <div class="logo">
      <img src="https://p0.ssl.qhimg.com/t0182e16f529351fc2e.png" alt="" />
    </div>
    <div class="content">
      <el-input
        class="render-url"
        v-model="url"
        @keyup.enter.native="renderUrl"
      ></el-input>
      <el-button type="primary" size="small" @click="renderUrl">渲染</el-button>
    </div>
  </div>
</template>
<script>
import api from '@api';
export default {
  name: 'Index',
  data() {
    return {
      url: '',
    };
  },
  methods: {
    renderUrl() {
      if (!this.url) return this.$message.error('请填写url');
      location.href = `/render?url=${this.url}`;
    },
  },
};
</script>

<style lang="scss" scoped>
html,
body {
  height: 100%;
  width: 100%;
}
.spider-puppeteer-wrapper {
  .logo {
    overflow: hidden;
    img {
      width: 150px;
      display: block;
      margin: 100px auto 0;
    }
  }
  .content {
    margin: 70px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    /* position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
    .render-url {
      width: 500px;
    }
    button {
      margin-left: 20px;
    }
  }
}
</style>
