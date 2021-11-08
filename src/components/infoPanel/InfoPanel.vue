<template>
  <ul class="info-panel">
    <li>
      <span class="title">SCORE: </span>
      <span class="num">3</span>
    </li>
    <li>
      <span class="title">LEVEL: </span>
      <span class="num">1</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'InfoPanel',
}
</script>

<style scoped>
.info-panel {
  outline: 1px solid;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  font-size: 20px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  .title {
    font-weight: 800;
  }
}
</style>
