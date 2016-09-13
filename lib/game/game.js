import Maze from './maze.js';
import Ball from './ball.js';
import {BallPos, GameDims, WinPos, evilPos, mazeWidth} from './utils.js';
import Evil from './evil.js';

class Game {
  constructor(ctx) {
    this.level = 1;
    this.ctx = ctx;
    this.maze = new Maze(ctx, this.level);
    this.ball = new Ball({position: BallPos[this.level], maze: this.maze});
    this.evils = [];
    this.setupEvil();
    this.winPos = WinPos[this.level];
    this.levelWon = false;
  }

  render(){
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(GameDims.x, GameDims.y, GameDims.width, GameDims.height);
    this.maze.renderWalls();
    this.ball.draw(this.ctx);
    this.evils.forEach(evil => evil.draw(this.ctx));
    this.checkWin();
    this.eatEvil();
  }

  checkWin(){
    console.log(this.ball.pos);
    console.log(this.winPos);
    if ((this.ball.pos[0] <= (this.winPos[0] + this.ball.radius) && (this.ball.pos[0] >= this.winPos[0]-this.ball.radius)) &&
     ((this.ball.pos[1] <= this.winPos[1] + mazeWidth) && this.ball.pos[1] >= this.winPos[1] - mazeWidth )){
       this.levelWon = true;
    }
  }

  eatEvil(){
    this.evils.forEach((evil, idx) => {

      if ( evil.isCollidedWith(this.ball) ) {
        this.ball.radius = 10;
      }
    });
  }

  setupEvil(){
    evilPos[this.level].forEach(pos => {
      this.evils.push(new Evil({position: pos}));
    });
  }
  moveBall(dt){
    this.ball.move(dt);
  }

  bindKeyHandlers(){
    key('up', ()=>{
      this.ball.power([0,-1]);
    });

    key('left', ()=>{
      this.ball.power([-1,0]);
    });
    key('down', ()=>{
      this.ball.power([0,1]);
    });

    key('right', ()=>{
      this.ball.power([1,0]);
    });
  }
}

export default Game;
