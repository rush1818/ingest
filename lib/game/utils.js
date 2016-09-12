const windowH = window.innerHeight;
const windowW = window.innerWidth;

export const Dist = (pos1, pos2) => {
  let xDiff = (pos1[0] - pos2[0]);
  let yDiff = (pos1[1] - pos2[1]);
  return Math.sqrt( xDiff * xDiff + yDiff * yDiff);
};


export const Norm = ([x1, y1]) =>{
  return Dist([0, 0], [x1, y1]);
};

const mazeWidth = 40;
// (x, y, width, height)
export const Mazes = {
  1: [[0, 0, mazeWidth, 105],
      [95, 100, mazeWidth, 200],
      [0, 100, 100, mazeWidth]]
};

export const BallPos = {
  1:[187, 209]
};

export const GameDims = {
  x: 100,
  y: 100,
  width: (0.8 * windowW),
  height: (0.8 * windowH)
};
