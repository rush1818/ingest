import Game from './game.js';

class GameView {
  constructor(ctx){
    this.game = new Game(ctx);
    this.ctx = ctx;
    this.lastTime = 0;
  }

  start() {
    this.game.bindKeyHandlers();
    this.animate(0);
  }

  animate(time) {
    let dt = time  - this.lastTime;
    this.lastTime = time;
    this.game.moveBall(dt / 20);
    this.game.render();
    if (!this.game.levelWon){
      window.requestAnimationFrame((dTime) => {
        this.animate(dTime);
      });
    } else {
      alert('Won! :) ')
    }

  }
}

export default GameView;
