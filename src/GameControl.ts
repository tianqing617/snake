import { Pointer } from './tools'
import Snake from './components/playGround/Snake'
import Food from './components/playGround/Food'
import InfoPanel from './components/infoPanel/InfoPanel'

export default class GameControl {
  snake: Snake;
  food: Food;
  infoPanel: InfoPanel;

  timer = -1;
  direction = 'ArrowRight';
  isAlive = true;
  setup = 10; // 每次移动的距离

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.infoPanel = new InfoPanel();

    this.init();
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
      this.run();
    }, this.getSpeed());
  }

  keydownHandler(event: KeyboardEvent): void {
    console.log(event);
    this.direction = event.key;
    // this.run();
  }

  getSpeed(): number {
    return 300 - (this.infoPanel.level - 1) * 30;
  }

  checkEat(pointer: Pointer): void {
    console.log('checkEat', pointer.isSame(this.food.pointer));
    if (pointer.isSame(this.food.pointer)) {
      this.food.changeLocation();
      this.infoPanel.increaseScore();
      this.snake.increaseBody();
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
      this.isAlive = false;
    }
  }
}
