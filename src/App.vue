<template>
  <div class="app-wrapper">
    <play-ground />
    <info-panel :info="info"/>

    <div class="result">
      <span v-show="result">{{result}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import PubSub from 'pubsub-js'
import { defineComponent, onMounted, ref, reactive } from 'vue'
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
    const result = ref('');

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

      PubSub.subscribe('result', (name, data) => {
        console.log('result', name, data);
        result.value = data;
      });
    });

    return {
      info,
      result,
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
  .result {
    height: 25px;
    line-height: 25px;
    padding-top: 2px;
    color: red;
    font-weight: 800;
  }
}
</style>
