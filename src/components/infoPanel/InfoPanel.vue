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
import { reactive } from 'vue';
import InfoPanel from './InfoPanel';

export default {
  name: 'InfoPanel',
  setup(): Record<string, unknown> {
    const infoPanel = new InfoPanel();
    // const info = reactive({
    //   score: infoPanel.gameScore,
    //   level: infoPanel.gameLevel,
    // });
    const info = reactive(infoPanel.info);

    return {
      info,
    }
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
