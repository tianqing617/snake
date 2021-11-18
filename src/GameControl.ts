import PubSub from 'pubsub-js'
import { Pointer } from './tools'
import { DirectionEnum } from './enums'
import Snake from './components/playGround/Snake'
import Food from './components/playGround/Food'
import Score from './components/infoPanel/Score'

export default class GameControl {
  snake: Snake;
  food: Food;
  score: Score;

  timer = -1;
  direction = DirectionEnum.ArrowRight;
  isAlive = true;
  setup = 10; // 每次移动的距离

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.score = new Score();
    console.log(DirectionEnum)

    this.init();
  }

  get scoreIns(): Score {
    return this.score;
  }

  init(): void {
    // 注册键盘事件
    document.addEventListener('keydown', this.keydownHandler.bind(this));

    this.timer = this.initTimer();
  }

  initTimer(): number {
    clearInterval(this.timer);

    return window.setInterval(() => {
      // console.log('setInterval', this)
      // !!!蛇爬动
      this.run();
    }, this.getSpeed());
  }

  keydownHandler(event: KeyboardEvent): void {
    console.log(event);
    // TODO: 枚举，判断是否属于枚举中的某项目的方案
    console.log('enum', DirectionEnum);
    const keys = Object.keys(DirectionEnum);
    // 是否是此四个键：ArrowRight ArrowLeft ArrowUp ArrowDown
    if (keys.includes(event.key)) {
      // @ts-ignore
      console.log('num', DirectionEnum[event.key], this.direction);

      // @ts-ignore 2 表示枚举中间值
      const available = (DirectionEnum[event.key] > 2 && this.direction < 2) || (DirectionEnum[event.key] < 2 && this.direction > 2);
      if (available) {
        // 大于2，表示左右；小于2，表示上下
        // @ts-ignore
        this.direction = DirectionEnum[event.key];
      }
    }
  }

  getSpeed(): number {
    return 300 - (this.score.level - 1) * 30;
  }

  checkEat(pointer: Pointer): void {
    console.log('checkEat', pointer.isEqual(this.food.pointer));
    if (pointer.isEqual(this.food.pointer)) {
      this.food.changeLocation();
      this.score.increaseScore();
      this.snake.increaseBody();

      PubSub.publish('bus', this.score.info);
    }
  }

  run(): void {
    // ArrowRight ArrowLeft ArrowUp ArrowDown
    const pointer = this.snake.headPointer;

    switch (this.direction) {
      case DirectionEnum.ArrowUp:
        pointer.y -= 10;
        break;
      case DirectionEnum.ArrowDown:
        pointer.y += 10;
        break;
      case DirectionEnum.ArrowLeft:
        pointer.x -= 10;
        break;
      case DirectionEnum.ArrowRight:
        pointer.x += 10;
        break;
    }

    this.checkEat(pointer);

    try {
      this.snake.headPointer = pointer;
    } catch (error: any) {
      const message = error.message;
      console.log(message);
      clearInterval(this.timer);
      this.isAlive = false;

      PubSub.publish('result', message);
    }
  }
}
