import Maze from './maze.js';
import Ball from './ball.js';
import {BallPos, GameDims} from './utils.js';

class Game {
  constructor(ctx) {
    this.level = 1;
    this.ctx = ctx;
    this.maze = new Maze(ctx, this.level);
    this.ball = new Ball({position: BallPos[this.level], maze: this.maze});
  }

  render(){
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(GameDims.x, GameDims.y, GameDims.width, GameDims.height);
    this.maze.renderWalls();
    this.ball.draw(this.ctx);
  }

  checkValidPos(){

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
