# [Ingest][live_link]
[live_link]: http://www.rushabhs.com/ingest/

## Background

Ingest is a browser based game inspired by agar.io.

![game](./docs/game.png)


## Goal

The goal is to move around ingesting cells that are smaller while avoiding larger cells. Use the keyboard Use ↑↓→← or WASD keys to control your cell.

## Logic behind ingesting cells
Collision between two cells is checked by measuring the distance between them. If the player's cell collides with a cell larger than itself then the player looses. If the collided cell is small than the player's cell then the radius of the smaller cell is added to the player's cell and the smaller cell is removed from the game.

```javascript
/// game.js
eatEvil(){
  this.evils.forEach((evil, idx) => {
    if ( evil.isCollidedWith(this.ball) ) {
      if (evil.radius <= this.ball.radius){
        this.remove(evil);
        this.ball.radius += evil.radius;
      } else {
        this.gameOver = true;
      }
    }
  });
}

/// moving_object.js

isCollidedWith(otherObject){
  return Dist(this.pos, otherObject.pos) <= (parseInt(this.radius) + parseInt(otherObject.radius));
}
```
