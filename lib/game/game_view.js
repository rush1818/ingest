import Game from './game.js';
const maxLevel = 3;
class GameView {
  constructor(ctx){
    this.level = 1;
    this.game = new Game(ctx, this.level);
    this.ctx = ctx;
    this.lastTime = 0;
  }

  start() {
    this.game.bindKeyHandlers();
    this.animate(0);
  }

  animate(time) {
    console.log(this.game.gameOver);
    let dt = time  - this.lastTime;
    this.lastTime = time;
    this.game.moveBall(dt / 20);
    this.game.moveEvils(dt / 20);
    this.game.render();
    if (!this.game.gameWon && !this.game.gameOver){
      window.requestAnimationFrame((dTime) => {
        this.animate(dTime);
      });
    } else if (this.game.gameOver) {
      alert('Over');
    } else {
      prompt('Play next?');
      this.level += 1;
      this.level = this.level > maxLevel ? 1 : this.level;
      this.game = new Game(this.ctx, this.level);
      window.requestAnimationFrame((dTime) => {
        this.animate(dTime);
      });
    }

  }
}

export default GameView;
