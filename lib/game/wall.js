import {GameDims} from './utils.js';

class Wall{
  constructor(leftX, leftY, width, height){
    this.leftX = (GameDims.x + leftX);
    this.leftY = (GameDims.y + leftY);
    this.width = width;
    this.height = height;

    this.draw = this.draw.bind(this);
    this.ballInWall = this.ballInWall.bind(this);
  }

  draw(ctx){
    ctx.fillStyle = 'green';
    ctx.fillRect(this.leftX, this.leftY, this.width, this.height);
  }

  ballInWall(ballPos, ballRadius){
    return (
      (ballPos[0] - ballRadius) > this.leftX &&
      (ballPos[0] + ballRadius) < (this.leftX + this.width) &&
      (ballPos[1] - ballRadius) > this.leftY &&
      (ballPos[1] + ballRadius) < (this.leftY + this.height)
    );
  }
}

export default Wall;
