import Game from './game.js';

class GameView {
  constructor(ctx){
    this.game = new Game(ctx);
    this.ctx = ctx;
    this.lastTime = 0;
  }

  start() {
    this.game.render();
  }

}

export default GameView;
