import MovingObject from './moving_object.js';
import {Norm, randomVector, GameDims} from './utils.js';
const COLOR = 'black';

class Evil extends MovingObject {
  constructor(options) {
    super({pos: options.position, color: COLOR, radius: options.radius, vel: options.vel});
  }
}

export default Evil;
