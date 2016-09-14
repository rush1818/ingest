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
  1:[GameDims.width / 2, GameDims.height / 2]
};

export const randomVector = (length) => {
  let x = Math.random() * length;
  let y = Math.sqrt((length * length) - (x * x));
  return [x, y];
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

export const showLevelModal = () => {
  $("#new-level-modal").addClass("is-active");
};
export const hideLevelModal = () => {
  $("#new-level-modal").removeClass("is-active");
};
