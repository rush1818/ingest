import GameView from './game/game_view.js';
import {GameDims, hideModal, hideIntroModal, hideLevelModal} from './game/utils.js';

let gameView, ctx, resetButton, pauseButton;
document.addEventListener('DOMContentLoaded', ()=>{
  resetButton = $('.reset-game');
  pauseButton = $('.pause-game');
  let canvas = document.getElementById('canvas');
  canvas.height = GameDims.height;
  canvas.width = GameDims.width;
  ctx = canvas.getContext('2d');
  const maxLevel = 3;

  $('body').keydown((e) => {
    if (!gameView && e.keyCode === 13){
      hideIntroModal();
      gameView = new GameView(ctx);
      gameView.start();
      gameControls();

    }
    if (gameView && e.keyCode === 13){
      if (!gameView.inPlay){
        hideModal();
        gameView = new GameView(ctx);
        gameView.start();
      }

      if (gameView.inPlay && gameView.game.gameWon){
        hideLevelModal();
        let newLevel = gameView.level + 1;
        newLevel = newLevel > maxLevel ? maxLevel : newLevel;
        gameView = new GameView(ctx, newLevel);
        gameView.start();
      }
    }

  });

});

const gameControls = () => {
  $('.game-controls').addClass('visible');
  $('.footer-content').addClass('visible');
  resetButton.click((e) => {
    gameView.paused = true; //stops current game from running code in background
    hideModal();
    hideLevelModal();
    gameView = new GameView(ctx);
    gameView.start();
  });

  pauseButton.click((e) => {

    if (gameView.paused){
      e.target.innerText = 'Pause Game';
      gameView.resume();
    } else {
      e.target.innerText = 'Resume Game';
      gameView.pause();
    }
  });
};
