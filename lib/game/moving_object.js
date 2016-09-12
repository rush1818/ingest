import {Dist} from './utils.js';


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
    let newPos = [];
    newPos[0] = this.pos[0] + this.vel[0] * dt;
    newPos[1] = this.pos[1] + this.vel[1] * dt;
    if (this.ifWithinMaze(newPos)){
      this.pos[0] += this.vel[0] * dt;
      this.pos[1] += this.vel[1] * dt;
    }
  }

  isCollidedWith(otherObject){
    return Dist(this.pos, otherObject.pos) <= this.radius + otherObject.radius;
  }

  ifWithinMaze(newPos){
    return this.maze.ballInWall(newPos, this.radius);
  }
}

export default MovingObject;
