import Game from './game.js';
import {showModal, showLevelModal} from './utils.js';

let dt;
const maxLevel = 3;
class GameView {
  constructor(ctx, level = 1){
    this.level = level;
    this.ctx = ctx;
    this.lastTime = 0;
    this.inPlay = false;
    this.paused = false;
    this.frameId = null;
  }

  start() {
    this.inPlay = true;
    this.game = new Game(this.ctx, this.level);
    this.game.bindKeyHandlers();
    this.animate(0);
  }

  pause(){
    this.paused = true;
    window.cancelAnimationFrame(this.frameId);
  }
  resume(){
    this.paused = false;
    this.animate((dt + this.lastTime));
  }

  animate(time) {
    if (!this.paused){
      if (!this.game.gameWon && !this.game.gameOver){
        dt = (time  - this.lastTime) / 20;
        dt = dt > 1 ? 1 : dt;
        this.lastTime = time;
        this.game.moveBall(dt);
        this.game.moveEvils(dt);
        this.game.render();
        const that = this;
        this.frameId = window.requestAnimationFrame((dTime) => {
          that.animate(dTime);
        });
      } else if (this.game.gameOver) {
        this.inPlay = false;
        showModal();
      } else if (this.game.gameWon) {
        showLevelModal();
      }
    }
  }
}

export default GameView;
