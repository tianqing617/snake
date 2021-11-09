export default class Score {
  _score = 0;
  _level = 1;

  _maxLevel: number;
  _upgrade: number;

  constructor(maxLevel = 10, upgrade = 10) {
    this._maxLevel = maxLevel;
    this._upgrade = upgrade;
  }

  get score(): number {
    return this._score;
  }

  // set score(num: number) {
  //   this._score = this._score + num;
  // }

  get level(): number {
    return this._level;
  }

  increaseScore(): {score: number, level: number} {
    this._score = this._score + 1;
    // 控制升级
    if (this._score % this._upgrade === 0) {
      this.upLevel();
    }

    return {
      score: this._score,
      level: this._level,
    }
  }

  upLevel(): void {
    if (this._level < this._maxLevel) {
      this._level = this._level + 1;
    }
  }
}
