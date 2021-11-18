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
  direction = DirectionEnum.RIGHT;
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
    // console.log(event);
    const key = Object.keys(DirectionEnum).find(key => {
      // @ts-ignore
      return DirectionEnum[key] === event.key;
    });

    console.log('directionType', key);

    if (key) {
      // @ts-ignore
      this.direction = DirectionEnum[key];
    }

    // this.run();
  }

  getSpeed(): number {
    return 300 - (this.score.level - 1) * 30;
  }

  checkEat(pointer: Pointer): void {
    console.log('checkEat', pointer.isSame(this.food.pointer));
    if (pointer.isSame(this.food.pointer)) {
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
      case 'ArrowUp':
        pointer.y -= 10;
        break;
      case 'ArrowDown':
        pointer.y += 10;
        break;
      case 'ArrowLeft':
        pointer.x -= 10;
        break;
      case 'ArrowRight':
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
