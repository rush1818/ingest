const windowH = 500;
const windowW = 800;

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
  width: (0.8 * windowW),
  height: (0.8 * windowH)
};

export const mazeWidth = 40;
// (x, y, width, height)
export const Mazes = {
  1: [[0, 0, mazeWidth, 100 + mazeWidth],
      [0, 100, 140, mazeWidth],
      [140 - mazeWidth, 100, mazeWidth, 200],
      [140 - mazeWidth, 300 - mazeWidth, GameDims.width - 100, mazeWidth],
      [GameDims.width - 5, 300 - mazeWidth, 5, mazeWidth]
    ]
};

export const BallPos = {
  1:[20, 20]
};
export const WinPos = {
  1: [GameDims.width + GameDims.x, 300 - mazeWidth]
};

export const evilPos = {
  1: [[90, 127],
      [220, 290]
    ]
};
