export default class Food {
  element: HTMLElement

  constructor () {
    this.element = document.getElementById('food')!
  }

  get loctionX (): number {
    return this.element.offsetLeft
  }

  get locationY (): number {
    return this.element.offsetTop
  }

  changeLocation (): void {
    // 食物的位置最小是0 最大是290
    // 蛇移动一次就是一格，一格的大小就是10，所以就要求食物的坐标必须是整10
    const locX = Math.round(Math.random() * 29) * 10
    const locY = Math.round(Math.random() * 29) * 10

    this.element.style.left = locX + 'px'
    this.element.style.top = locY + 'px'
  }
}
