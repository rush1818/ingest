import Maze from './maze.js';
import Ball from './ball.js';
import {BallPos, GameDims, randomVector, randomBalls} from './utils.js';
import Evil from './evil.js';

const randomVel = () => {
  const speeds = [ -0.5, -0.25, -0.10, 0.10, 0.25, 0.5];
  const randomSpeed = speeds[Math.floor(Math.random() * speeds.length)];
  return randomVector(randomSpeed);
};

const randomPos = () => {
  let x = Math.floor(Math.random() * (GameDims.x + GameDims.width));
  let y = Math.floor(Math.random() * (GameDims.y + GameDims.height));
  return [x, y];
};

class Game {
  constructor(ctx, level = 1) {
    this.level = level;
    this.ctx = ctx;
    this.ball = new Ball({position: [...BallPos[1]]});
    this.evils = [];
    this.setupEvil();
    this.gameWon = false;
    this.gameOver = false;
  }

  render(){
    this.ctx.fillStyle = '#cdcdcd';
    this.ctx.fillRect(GameDims.x, GameDims.y, GameDims.width, GameDims.height);
    this.ball.draw(this.ctx);
    this.evils.forEach(evil => evil.draw(this.ctx));
    this.eatEvil();
    this.checkWin();
  }

  checkWin(){
    if (!this.evils.length){
      this.gameWon = true;
    }
  }

  eatEvil(){
    this.evils.forEach((evil, idx) => {

      if ( evil.isCollidedWith(this.ball) ) {
        // this.remove(evil);
        // this.ball.radius += evil.radius;
        if (evil.radius <= this.ball.radius){
          this.remove(evil);
          this.ball.radius += evil.radius;
        } else {
          this.gameOver = true;
        }
      }
    });
  }

  setupEvil(){
    console.log(` setup for level: ${this.level}`);
    const numBalls = {
      1: [20, 5, 5, 3, 2 ],
      2: [10, 15, 20, 6, 4 ],
      3: [10, 10, 25, 10, 8]
    };
    // const numBalls = {
    //   1: [3, 0, 0, 0, 0 ],
    //   2: [6, 0, 0, 0, 0],
    //   3: [9, 0, 0, 0, 0]
    // };

    let ballsToCreate = numBalls[this.level];
    let i = 0;
    while (i < ballsToCreate[0]) {
      this.evils.push(new Evil({position: [...randomPos()], radius: 1.5, vel: [...randomVel()]}));
      i++;
    }

    i = 0;
    while (i < ballsToCreate[1]) {
      this.evils.push(new Evil({position: [...randomPos()], radius: 2.5, vel: [...randomVel()]}));
      i++;
    }
    i = 0;
    while (i < ballsToCreate[2]) {
      this.evils.push(new Evil({position: [...randomPos()], radius: 10, vel: [...randomVel()]}));
      i++;
    }

    i = 0;
    while (i < ballsToCreate[3]) {
      this.evils.push(new Evil({position: [...randomPos()], radius: 20, vel: [...randomVel()]}));
      i++;
    }
    i = 0;
    while (i < ballsToCreate[4]) {
      this.evils.push(new Evil({position: [...randomPos()], radius: 30, vel: [...randomVel()]}));
      i++;
    }
  }

  moveBall(dt){
    this.ball.move(dt);
  }

  moveEvils(dt){
    this.evils.forEach(evil => {
      evil.move(dt);
    });
  }

  remove(obj) {
    let idx = this.evils.indexOf(obj);
    let left = this.evils.slice(0,idx);
    let right = this.evils.slice(idx + 1);
    this.evils = [...left, ...right];
  }

  bindKeyHandlers(){
    key('up', ()=>{
      this.ball.power([0,-1]);
    });

    key('w', ()=>{
      this.ball.power([0,-1]);
    });

    key('left', ()=>{
      this.ball.power([-1,0]);
    });
    key('a', ()=>{
      this.ball.power([-1,0]);
    });
    key('down', ()=>{
      this.ball.power([0,1]);
    });
    key('s', ()=>{
      this.ball.power([0,1]);
    });

    key('right', ()=>{
      this.ball.power([1,0]);
    });
    key('d', ()=>{
      this.ball.power([1,0]);
    });
  }
}

export default Game;
