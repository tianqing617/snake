<template>
  <div class="app-wrapper">
    <play-ground />
    <info-panel :info="info"/>
  </div>
</template>

<script lang="ts">
import PubSub from 'pubsub-js'
import { defineComponent, onMounted, reactive } from 'vue'
import { PlayGround, InfoPanel } from './components/'
import GameControl from './GameControl'

export default defineComponent({
  name: 'App',
  components: {
    PlayGround,
    InfoPanel,
  },
  setup() {
    let gameControl: GameControl;
    const info = reactive({
      score: 0,
      level: 1,
    });

    onMounted(() => {
      gameControl = new GameControl();
      console.log('gameControl', gameControl);

      // 订阅score.info的改变
      PubSub.subscribe('bus', (name, data) => {
        console.log('sub', name, data);
        const { score, level } = data;
        info.score = score;
        info.level = level;
      });
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
