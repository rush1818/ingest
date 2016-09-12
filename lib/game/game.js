import Maze from './maze.js';
import {GameDims} from './utils.js';

class Game {
  constructor(ctx) {
    this.level = 1;
    this.ctx = ctx;
    this.maze = new Maze(ctx, this.level);
  }

  render(){
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(GameDims.x, GameDims.y, GameDims.width, GameDims.height);
    this.maze.render();
  }
}

export default Game;
