<template>
  <div class="play-ground">
    <div id="snake">
      <!-- 蛇头 -->
      <b></b>

      <!-- 蛇身 -->
      <i></i>
      <i></i>
    </div>
    <div id="food"></div>

    <div class="test-button" @click="test">test</div>
  </div>
</template>

<script lang="ts">
import { onMounted } from 'vue'
import Food from './Food'

export default {
  name: 'PlayGround',
  setup (): Record<string, unknown> {
    let food: Food

    onMounted(() => {
      food = new Food()
    })

    // 测试方法
    function test (): void {
      food.changeLocation()
      console.log('foodLoc', food.loctionX, food.locationY)
    }

    return {
      test,
    }
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
  display: inline-block;
  position: absolute;
  top: 20px;
  left: 30px;
  height: 10px;
  line-height: 10px;
  > b, i {
    width: 10px;
    height: 10px;
    background-color: #000;
    display: inline-block;
    border: 1px solid #BDD4AB;
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
.test-button {
  width: 60px;
  height: 20px;
  border: 1px solid;
  top: 280px;
  left: 240px;
  position: absolute;
  cursor: pointer;
}
</style>
