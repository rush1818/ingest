import GameView from './game/game_view.js';
import {GameDims} from './game/utils.js';

document.addEventListener('DOMContentLoaded', ()=>{
  const canvas = document.getElementById('canvas');
  canvas.height = GameDims.height;
  canvas.width = GameDims.width;
  const ctx = canvas.getContext('2d');
  const gameView = new GameView(ctx);
  gameView.start();

});
