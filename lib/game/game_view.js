import Game from './game.js';
import {showModal, showLevelModal} from './utils.js';

const maxLevel = 3;
class GameView {
  constructor(ctx, level = 1){
    this.level = level;
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
      showModal();
    } else {
      showLevelModal();
    }

  }
}

export default GameView;
