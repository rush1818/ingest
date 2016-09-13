import MovingObject from './moving_object.js';
import {Norm} from './utils.js';
const COLOR = 'black';
const RADIUS = 5;

class Evil extends MovingObject {
  constructor(options) {
    super({pos: options.position, color: COLOR, radius: RADIUS});
  }
}

export default Evil;
