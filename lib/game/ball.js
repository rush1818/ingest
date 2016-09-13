import MovingObject from './moving_object.js';
import {Norm} from './utils.js';
const COLOR = 'white';
const RADIUS = 5;
const vel = [0,0];
const MaxSpeed = 4;

class Ball extends MovingObject {
  constructor(options) {
    super({pos: options.position, color: COLOR, radius: RADIUS, vel: vel});

    this.COLOR = COLOR;
    this.RADIUS = RADIUS;
    this.vel = vel;
  }

  draw(ctx){
    var x1 = this.pos[0] - this.radius , x2 = this.pos[0] + this.radius , y1 = this.pos[1] - this.radius , y2 = this.pos[1] + this.radius ;

    var lingrad = ctx.createLinearGradient(x1,y1,x2,y1);
    lingrad.addColorStop(0, 'gray');
    lingrad.addColorStop(0.5, '#3c09fa');
    lingrad.addColorStop(1, 'gray');
    ctx.fillStyle = lingrad;
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

  move(dt){
    MovingObject.prototype.move.call(this, dt);
    this.vel[0] *= 0.96;
    this.vel[1] *= 0.96;
  }

  power(impulse){
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
