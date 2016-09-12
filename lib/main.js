import GameView from './game/game_view.js';

document.addEventListener('DOMContentLoaded', ()=>{
  const canvas = document.getElementById('canvas');
  canvas.height = window.innerHeight- 100;
  canvas.width = window.innerWidth - 100;
  const ctx = canvas.getContext('2d');
  const gameView = new GameView(ctx);
  gameView.start();

});
