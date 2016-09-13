import {Mazes} from './utils.js';
import Wall from './wall.js';

class Maze {
  constructor(ctx, level){
    this.ctx = ctx;
    this.wallsCoords = Mazes[level];
    let lastWallId = this.wallsCoords.length - 1;
    this.walls = this.wallsCoords.map((wall, idx)=>{
      if (idx === lastWallId) {
        return new Wall(...wall, 'blue');
      }
      return new Wall(...wall, 'green');
    });


    this.renderWalls = this.renderWalls.bind(this);
    this.ballInWall = this.ballInWall.bind(this);
    this.render = this.render.bind(this);
  }

  renderWalls(){
    this.walls.forEach(wall => {
      wall.draw(this.ctx);
    });
  }

  ballInWall(ballPos, ballRadius){
    let ans = false;
    this.walls.forEach(wall => {
      if (wall.ballInWall(ballPos, ballRadius)){
        ans = true;
      }
    });
    return ans;
  }

  render(){
    this.renderWalls();
  }
}

export default Maze;
