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
  }

  start() {
    this.inPlay = true;
    this.game = new Game(this.ctx, this.level);
    this.game.bindKeyHandlers();
    this.animate(0);
  }

  resume(){
    this.animate((dt + this.lastTime));
  }

  animate(time) {
    if (!this.paused){
      dt = time  - this.lastTime;
      this.lastTime = time;
      this.game.moveBall(dt / 20);
      this.game.moveEvils(dt / 20);
      this.game.render();
      if (!this.paused && !this.game.gameWon && !this.game.gameOver){
        window.requestAnimationFrame((dTime) => {
          this.animate(dTime);
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
