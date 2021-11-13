export default class InfoPanel {
  score = 0;
  level = 1;

  maxLevel: number;
  upgrade: number;

  constructor(maxLevel = 10, upgrade = 10) {
    this.maxLevel = maxLevel;
    this.upgrade = upgrade;
  }

  get gameScore(): number {
    return this.score;
  }

  get gameLevel(): number {
    return this.level;
  }

  get info(): {score: number, level: number} {
    return {
      score: this.score,
      level: this.level,
    }
  }

  increaseScore(): {score: number, level: number} {
    this.score = this.score + 1;
    // 控制升级
    if (this.score % this.upgrade === 0) {
      this.upLevel();
    }

    console.log('increase', this);

    return {
      score: this.score,
      level: this.level,
    }
  }

  upLevel(): void {
    if (this.level < this.maxLevel) {
      this.level = this.level + 1;
    }
  }
}
