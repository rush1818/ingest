import GameView from './game/game_view.js';
import {GameDims} from './game/utils.js';

document.addEventListener('DOMContentLoaded', ()=>{
  let canvas = document.getElementById('canvas');
  canvas.height = GameDims.height;
  canvas.width = GameDims.width;
  let ctx = canvas.getContext('2d');
  let gameView = new GameView(ctx);
  gameView.start();

  $('body').keydown((e) => {
    if (!gameView.inPlay && e.keyCode === 13){
      gameView = new GameView(ctx);
      gameView.start();
    }
  });

});
