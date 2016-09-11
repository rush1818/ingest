# Maze Runner

## Background

Maze Runner is a game where the player attempts to navigate a ball through a maze. The maze has obstacles along the course which the player must avoid. If the player collides with an obstacle, the size of the ball gets bigger. The player can continue to play until the ball grows bigger than the width of the maze wall.


## Functionality & MVP

During the gameplay, players will be able to:
* Start and reset the game
* Play different levels

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
Setup skeleton of all files and the entry file for Webpack. Work on Maze script. Goals for the day:
* Setup Webpack
* Get a basic maze and game to render on the canvas

**Day 2**
Improve Maze to handle collisions. Create `ball` and place it in maze. Setup keyboard listeners to move ball in maze. Goal of the day:
* Complete `maze`
* Render `ball` in maze

**Day 3**
Write `game` to handle overall game logic. Add obstacles along the maze.


**Day 4**
Add controls to start and reset the game. Style the canvas.



### Bonus features

Some anticipated updates are:

* Have the obstacles move around to increase difficulty
* Add multiplayer options
* Add score leaderboard
