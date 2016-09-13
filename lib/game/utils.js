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

export const windowH = window.innerHeight;
export const windowW = window.innerWidth;
// export const windowH = 700;
// export const windowW = 900;

export const Dist = (pos1, pos2) => {
  let xDiff = (parseInt(pos1[0]) - parseInt(pos2[0]));
  let yDiff = (parseInt(pos1[1]) - parseInt(pos2[1]));
  return Math.sqrt( xDiff * xDiff + yDiff * yDiff);
};


export const Norm = ([x1, y1]) =>{
  return Dist([0, 0], [x1, y1]);
};

export const GameDims = {
  x: 0,
  y: 0,
  width: (1 * windowW),
  height: (1 * windowH)
};

export const BallPos = {
  1:[20, 20]
};

export const randomVector = (length) => {
  let x = Math.random() * length;
  let y = Math.sqrt((length * length) - (x * x));
  return [x, y];
};

export const randomBalls = {};

randomBalls[1] = (that) => {
  let i = 0;
  while (i < 20) {
    that.evils.push(new Evil({position: randomPos(), radius: 1.5, vel: randomVel()}))
    i++;
  }

  i = 0;
  while (i < 5) {
    that.evils.push(new Evil({position: randomPos(), radius: 2.5, vel: randomVel()}))
    i++;
  }
  i = 0;
  while (i < 5) {
    that.evils.push(new Evil({position: randomPos(), radius: 10, vel: randomVel()}))
    i++;
  }

  i = 0;
  while (i < 3) {
    that.evils.push(new Evil({position: randomPos(), radius: 20, vel: randomVel()}))
    i++;
  }
  i = 0;
  while (i < 2) {
    that.evils.push(new Evil({position: randomPos(), radius: 30, vel: randomVel()}))
    i++;
  }
};


randomBalls[2] =   (that) => {
  let i = 0;
  while (i < 10) {
    that.evils.push(new Evil({position: randomPos(), radius: 1.5, vel: randomVel()}))
    i++;
  }

  i = 0;
  while (i < 20) {
    that.evils.push(new Evil({position: randomPos(), radius: 2.5, vel: randomVel()}))
    i++;
  }
  i = 0;
  while (i < 15) {
    that.evils.push(new Evil({position: randomPos(), radius: 10, vel: randomVel()}))
    i++;
  }

  i = 0;
  while (i < 6) {
    that.evils.push(new Evil({position: randomPos(), radius: 20, vel: randomVel()}))
    i++;
  }
  i = 0;
  while (i < 4) {
    that.evils.push(new Evil({position: randomPos(), radius: 30, vel: randomVel()}))
    i++;
  }
};


randomBalls[3] =   (that) => {
  let i = 0;
  while (i < 12) {
    that.evils.push(new Evil({position: randomPos(), radius: 1.5, vel: randomVel()}))
    i++;
  }

  i = 0;
  while (i < 20) {
    that.evils.push(new Evil({position: randomPos(), radius: 2.5, vel: randomVel()}))
    i++;
  }
  i = 0;
  while (i < 20) {
    that.evils.push(new Evil({position: randomPos(), radius: 10, vel: randomVel()}))
    i++;
  }

  i = 0;
  while (i < 7) {
    that.evils.push(new Evil({position: randomPos(), radius: 20, vel: randomVel()}))
    i++;
  }
  i = 0;
  while (i < 2) {
    that.evils.push(new Evil({position: randomPos(), radius: 30, vel: randomVel()}))
    i++;
  }
};


export const showModal = () => {
  $("#game-over-modal").addClass("is-active");
};
export const hideModal = () => {
  $("#game-over-modal").removeClass("is-active");
};

export const hideIntroModal = () => {
  $("#intro-modal").removeClass("is-active");
};
