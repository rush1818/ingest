import {GameDims} from './utils.js';

class Wall{
  constructor(leftX, leftY, width, height, color){
    this.leftX = (GameDims.x + leftX);
    this.leftY = (GameDims.y + leftY);
    this.width = width;
    this.height = height;
    this.color = color;
    this.draw = this.draw.bind(this);
    this.ballInWall = this.ballInWall.bind(this);
  }

  draw(ctx){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.leftX, this.leftY, this.width, this.height);
  }

  ballInWall(ballPos, ballRadius){
    let result =  (
      (parseInt(ballPos[0]) - parseInt(ballRadius)) >= parseInt(this.leftX) &&
      (parseInt(ballPos[0]) + parseInt(ballRadius)) <= (parseInt(this.leftX) + parseInt(this.width)) &&
      (parseInt(ballPos[1]) - parseInt(ballRadius)) >= parseInt(this.leftY) &&
      (parseInt(ballPos[1]) + parseInt(ballRadius)) <= (parseInt(this.leftY) + parseInt(this.height))
    );
    // console.log(result);
    return result;
  }
}

export default Wall;
