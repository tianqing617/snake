<template>
  <div class="play-ground">
    <div id="snake">
      <!-- 蛇头 -->
      <b></b>

      <!-- 蛇身 -->
      <!-- <i></i> -->
      <!-- <i></i> -->
    </div>
    <div id="food"></div>
  </div>
</template>

<script lang="ts">
import { onMounted } from 'vue'
import Food from './Food'

export default {
  name: 'PlayGround',
  setup (): void {
    let food: Food

    onMounted(() => {
      food = new Food()
      console.log('food', food);
    })
  }
}
</script>

<style scoped lang="scss">
.play-ground {
  width: 304px;
  height: 304px;
  border: 2px solid #000;
  position: relative;
}
#snake {
  > b {
    width: 10px;
    height: 10px;
    background-color: #000;
    border: 1px solid #BDD4AB;
    top: 110px;
    left: 30px;
    position: absolute;
  }
}
#food {
  height: 10px;
  width: 10px;
  background-color: green;
  top: 40px;
  left: 100px;
  position: absolute;
}
</style>
