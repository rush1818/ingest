import Game from './game.js';

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
    this.game.render();
    if (!this.game.levelWon && !this.game.gameOver){
      window.requestAnimationFrame((dTime) => {
        this.animate(dTime);
      });
    } else if (this.game.gameOver) {
      alert('Over');
    } else {
      alert('Won! :) ');
    }

  }
}

export default GameView;
