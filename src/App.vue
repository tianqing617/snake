<template>
  <div class="app-wrapper">
    <play-ground />
    <info-panel :info="info" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { PlayGround, InfoPanel, Score } from './components/'
import GameControl from './GameControl'

export default defineComponent({
  name: 'App',
  components: {
    PlayGround,
    InfoPanel,
  },
  setup() {
    let gameControl: GameControl;
    let score: Score;
    let info;

    onMounted(() => {
      gameControl = new GameControl();
      score = gameControl.scoreIns;
      info = reactive(score.info);
      console.log('gameControl', gameControl, score.info);
    });

    return {
      info,
    }
  }
})
</script>

<style lang="scss">
.app-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 360px;
  height: 420px;
  border: 10px solid #000;
  border-radius: 20px;
  margin: auto;
  margin-top: 40px;
  background-color: #BDD4AB;
}
</style>
