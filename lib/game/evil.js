import MovingObject from './moving_object.js';
import {Norm, randomVector} from './utils.js';
const COLOR = 'black';
const RADIUS = 5;

class Evil extends MovingObject {
  constructor(options) {
    super({pos: options.position, color: COLOR, radius: RADIUS, vel: randomVector(3)});
  }
}

export default Evil;
