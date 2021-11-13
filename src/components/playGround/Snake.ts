import { Pointer } from '@/tools';

export default class Snake {
  // 蛇的容器
  snakeEl: HTMLElement;
  // 蛇头
  headEl: HTMLElement;
  // 蛇身，含蛇头
  bodyListEl: HTMLCollection;

  constructor() {
    this.snakeEl = document.getElementById('snake')!;
    this.headEl = this.snakeEl.firstElementChild as HTMLElement;
    this.bodyListEl = this.snakeEl.children;
  }

  get headPointer(): Pointer {
    return new Pointer(
      this.headEl.offsetLeft,
      this.headEl.offsetTop
    );
  }

  set headPointer(pointer: Pointer) {
    // console.log('pointer', pointer);
    // 设置蛇头
    // console.log('headPointer', pointer);
    this.headEl.style.top = pointer.y + 'px';
    this.headEl.style.left = pointer.x + 'px';
  }

  // 增加蛇的长度
  increaseBody(): void {
    // The insertAdjacentHTML() method inserts a text as HTML, into a specified position.
    this.snakeEl.insertAdjacentHTML('beforeend', '<i></i>');
  }

  // 移动蛇身
  moveBody(): void {
    //
  }

  // 检查是否撞到自己
  checkAccident(): void {
    //
  }
}
