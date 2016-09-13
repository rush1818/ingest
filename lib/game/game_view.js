import Game from './game.js';
const maxLevel = 3;
class GameView {
  constructor(ctx){
    this.level = 1;
    this.ctx = ctx;
    this.lastTime = 0;
    this.inPlay = false;

  }

  start() {
    this.inPlay = true;
    this.game = new Game(this.ctx, this.level);
    this.game.bindKeyHandlers();
    this.animate(0);
  }

  animate(time) {
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
      this.inPlay = false;
      this.ctx.fillStyle = "white";
      this.ctx.font = "italic "+24+"pt Arial ";
      this.ctx.fillText(`Game Over \n Press Enter to restart`, 100,200 );
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
