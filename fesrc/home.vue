<template>
  <div class="spider-puppeteer-wrapper">
    <div class="content">
      <el-input class="render-url" v-model="url" @keyup.enter.native="renderUrl"></el-input>
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
      url: ''
    }
  },
  methods: {
    renderUrl() {
      const re = /^https?::\/\//
      if (!this.url) return this.$message.error('请填写url');
      location.href = `/render?url=${this.url}`;
    }
  },
}
</script>

<style lang="scss" scoped>
.spider-puppeteer-wrapper {
  min-height: 100vh;
  min-width: 1220px;
  .content {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .render-url {
      width: 500px;
    }
    button {
      margin-left: 20px;
    }
  }
}
</style>
