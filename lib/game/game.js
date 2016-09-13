import Maze from './maze.js';
import Ball from './ball.js';
import {BallPos, GameDims, WinPos, evilPos, mazeWidth} from './utils.js';
import Evil from './evil.js';

class Game {
  constructor(ctx, level = 1) {
    this.level = level;
    this.ctx = ctx;
    this.maze = new Maze(ctx, this.level);
    this.ball = new Ball({position: BallPos[this.level], maze: this.maze});
    this.evils = [];
    this.setupEvil();
    this.winPos = WinPos[this.level];
    this.levelWon = false;
    this.gameOver = false;
  }

  render(){
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(GameDims.x, GameDims.y, GameDims.width, GameDims.height);
    this.maze.renderWalls();
    this.ball.draw(this.ctx);
    this.evils.forEach(evil => evil.draw(this.ctx));
    this.eatEvil();
    this.checkOver();
    this.checkWin();
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
        this.remove(evil);
        this.ball.radius = 50;
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

  remove(obj) {
    let idx = this.evils.indexOf(obj);
    let left = this.evils.slice(0,idx);
    let right = this.evils.slice(idx + 1);
    this.evils = [...left, ...right];
  }

  checkOver () {
    if ((this.ball.radius * 2) >= mazeWidth){
      this.gameOver = true;
      console.log(this.gameOver);
    }
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
