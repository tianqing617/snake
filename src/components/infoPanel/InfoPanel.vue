<template>
  <ul class="info-panel">
    <li>
      <span class="title">SCORE: </span>
      <span class="num">{{info.score}}</span>
    </li>
    <li>
      <span class="title">LEVEL: </span>
      <span class="num">{{info.level}}</span>
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  name: 'InfoPanel',
  props: {
    info: {
      type: Object,
    }
  },
  setup(): Record<string, unknown> {
    // Record<string, unknown>
    // const score = new Score();
    // const info = reactive({
    //   score: infoPanel.gameScore,
    //   level: infoPanel.gameLevel,
    // });
    // const info = reactive(score.info);

    return {}
  }
}
</script>

<style scoped lang="scss">
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
