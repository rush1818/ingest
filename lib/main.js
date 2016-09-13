import GameView from './game/game_view.js';
import {GameDims, hideModal, hideIntroModal} from './game/utils.js';

document.addEventListener('DOMContentLoaded', ()=>{
  let canvas = document.getElementById('canvas');
  canvas.height = GameDims.height;
  canvas.width = GameDims.width;
  let ctx = canvas.getContext('2d');
  let gameView;

  $('body').keydown((e) => {
    if (!gameView && e.keyCode === 13){
      hideIntroModal();
      gameView = new GameView(ctx);
      console.log('first');
      gameView.start();
    }
    if (!gameView.inPlay && e.keyCode === 13){
      hideModal();
      gameView = new GameView(ctx);
      console.log('restart');
      gameView.start();
    }
  });


});
