import MovingObject from './moving_object.js';
import {Norm} from './utils.js';
const COLOR = 'white';
const RADIUS = 5;
const vel = [0,0];
const MaxSpeed = 4;

class Ball extends MovingObject {
  constructor(options) {
    super({pos: options.position, color: COLOR, radius: RADIUS, vel: vel, maze: options.maze});

    this.COLOR = COLOR;
    this.RADIUS = RADIUS;
    this.vel = vel;
  }

  // move(dt){
  //   // MovingObject.prototype.move.call(this, dt);
  //   let newPos = [];
  //   newPos[0] = this.pos[0] + this.vel[0] * dt;
  //   newPos[1] = this.pos[1] + this.vel[1] * dt;
  //   if (this.ifWithinMaze(newPos)){
  //     this.pos[0] += this.vel[0] * dt;
  //     this.pos[1] += this.vel[1] * dt;
  //   }
  //   // debugger
  //   this.vel[0] *= 0.9;
  //   this.vel[1] *= 0.9;
  // }

  power(impulse){
    // console.log(impulse);
    const velX = this.vel[0] + impulse[0];
    const velY = this.vel[1] + impulse[0];
    const speed = Norm([velX, velY]);
    if ( speed < MaxSpeed){
      this.vel[0] += impulse[0];
      this.vel[1] += impulse[1];
    }
  }
}

export default Ball;
