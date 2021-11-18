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
    // 处理边界问题
    if (pointer.x < 0 || pointer.x > 290 || pointer.y < 0 || pointer.y > 290) {
      throw Error('撞到墙了！');
    }
    // 身体跟随蛇头移动
    this.moveBody();

    // 设置蛇头
    // console.log('headPointer', pointer);
    this.headEl.style.top = pointer.y + 'px';
    this.headEl.style.left = pointer.x + 'px';

    // 检查是否撞到自己
    this.checkAccident();
  }

  // 增加蛇的长度
  increaseBody(): void {
    // The insertAdjacentHTML() method inserts a text as HTML, into a specified position.
    this.snakeEl.insertAdjacentHTML('beforeend', '<i></i>');
  }

  // 移动蛇身
  moveBody(): void {
    /**
     * 将后边的身体设置为 前面身体的位置
     * 第4节 = 第3节的位置
     * 第3节 = 第2节的位置
     * 第2节 = 蛇头的位置
     */
    for (let i = this.bodyListEl.length - 1; i > 0; i--) {
      const currentEl = this.bodyListEl.item(i) as HTMLElement;
      const previousEl = this.bodyListEl.item(i - 1) as HTMLElement;

      if (currentEl && previousEl) {
        currentEl.style.left = previousEl.offsetLeft + 'px';
        currentEl.style.top = previousEl.offsetTop + 'px';
      }
    }
  }

  // 检查是否撞到自己
  checkAccident(): void {
    const headPointer = this.headPointer;

    for (let i = 3; i < this.bodyListEl.length; i++) {
      const currentPartEl = this.bodyListEl[i] as HTMLElement;
      const currentPointer = new Pointer(currentPartEl.offsetLeft, currentPartEl.offsetTop);

      if (headPointer.isEqual(currentPointer)) {
        throw new Error('撞到自己了！');
      }
    }
  }
}
