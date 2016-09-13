# Ingest

## Background

Ingest is a game inspired by agar.io where the player attempts to navigate a ball attempting to ingest balls smaller in size and avoiding balls larger in size. The game is over if the ball collides with a ball larger than itself.


## Functionality & MVP

During the gameplay, players will be able to:
* Start and reset the game
* Use arrow or wasd keys to control the ball

In addition, the project will include:
* An About modal describing the background and rules of the game
* A production README


Wireframes

This app will consist of a single screen with a game board, game controls, links to Github, my LinkedIn, and the About modal. Game controls will include Start, Stop, and Reset buttons.


![wireframe](./docs/wireframe.png)



### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript with `jQuery` and `HTML5 Canvas` for overall structure, game logic, DOM manipulation and rendering
-`keymaster.js` for handling keyboard events
- Webpack to bundle and serve the various scripts

In addition to the Webpack entry file, there will be several scripts involved in this project, including:

`game.js`: this script will handle the logic for creating and updating the necessary elements and rendering them to the DOM.

`maze.js`: this script will handle the logic behind the maze which will check for collisions.

`ball.js`: this lightweight script will house the constructor and update functions for the `Ball` object.

`wall.js`: this script will store each wall and will be responsible for rendering walls on the DOM.

### Implementation Timeline
**Day 1**:
Setup skeleton of all files and the entry file for Webpack. Work on board script. Goals for the day:
* Setup Webpack
* Get a basic board and game to render on the canvas

**Day 2**
Create `ball` and place it on the board. Setup keyboard listeners to move ball. Goal of the day:
* Render `ball`
* Handle collisions of balls

**Day 3**
Write `game` to handle overall game logic


**Day 4**
Add controls to start and reset the game. Style the canvas.



### Bonus features

Some anticipated updates are:

* Add controls to adjust difficulty
* Add score leaderboard
* Add multiplayer options
