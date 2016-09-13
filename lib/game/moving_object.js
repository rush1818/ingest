import {Dist, GameDims} from './utils.js';


class MovingObject {
  constructor(options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.maze = options.maze;
  }

  draw(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  }

  move(dt) {
    this.pos[0] += this.vel[0] * dt;
    this.pos[1] += this.vel[1] * dt;

    if (this.pos[0] > (GameDims.x + GameDims.width)){
      this.pos[0] = 0;
    }
    if (this.pos[0] < GameDims.x){
      this.pos[0] = (GameDims.x + GameDims.width);
    }

    if (this.pos[1] > (GameDims.y + GameDims.height)){
      this.pos[1] = 0;
    }
    if (this.pos[1] < GameDims.y){
      this.pos[1] = (GameDims.y + GameDims.height);
    }
  }

  isCollidedWith(otherObject){
    return Dist(this.pos, otherObject.pos) <= (parseInt(this.radius) + parseInt(otherObject.radius));
  }

  ifWithinMaze(newPos){
    return this.maze.ballInWall(newPos, this.radius);
  }
}

export default MovingObject;
