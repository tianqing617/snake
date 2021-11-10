import Snake from './components/playGround/Snake'
import Food from './components/playGround/Food'
import InfoPanel from './components/infoPanel/InfoPanel'

export default class GameControl {
  snake: Snake;
  food: Food;
  infoPanel: InfoPanel;

  direction = '';
  isAlive = true;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.infoPanel = new InfoPanel();

    this.init();
  }

  init(): void {
    // 注册键盘事件
    document.addEventListener('keydown', this.keydownHandler.bind(this));
  }

  keydownHandler(event: KeyboardEvent): void {
    console.log(event);
    this.direction = event.key;
  }
}
