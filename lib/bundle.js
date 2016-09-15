/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _game_view = __webpack_require__(1);
	
	var _game_view2 = _interopRequireDefault(_game_view);
	
	var _utils = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var gameView = void 0,
	    ctx = void 0,
	    resetButton = void 0,
	    pauseButton = void 0;
	document.addEventListener('DOMContentLoaded', function () {
	  resetButton = $('.reset-game');
	  pauseButton = $('.pause-game');
	  var canvas = document.getElementById('canvas');
	  canvas.height = _utils.GameDims.height;
	  canvas.width = _utils.GameDims.width;
	  ctx = canvas.getContext('2d');
	  var maxLevel = 3;
	
	  $('body').keydown(function (e) {
	    if (!gameView && e.keyCode === 13) {
	      (0, _utils.hideIntroModal)();
	      setTimeout(function () {
	        gameView = new _game_view2.default(ctx);
	        gameView.start();
	        gameControls();
	      }, 1000);
	    }
	    if (gameView && e.keyCode === 13) {
	      if (!gameView.inPlay) {
	        (0, _utils.hideModal)();
	        gameView = new _game_view2.default(ctx);
	        gameView.start();
	      }
	
	      if (gameView.inPlay && gameView.game.gameWon) {
	        (0, _utils.hideLevelModal)();
	        var newLevel = gameView.level + 1;
	        newLevel = newLevel > maxLevel ? maxLevel : newLevel;
	        gameView = new _game_view2.default(ctx, newLevel);
	        gameView.start();
	      }
	    }
	  });
	});
	
	var gameControls = function gameControls() {
	  $('.game-controls').addClass('visible');
	  $('.footer-content').addClass('visible');
	  resetButton.click(function (e) {
	    gameView.paused = true; //stops current game from running code in background
	    (0, _utils.hideModal)();
	    (0, _utils.hideLevelModal)();
	    gameView = new _game_view2.default(ctx);
	    gameView.start();
	  });
	
	  pauseButton.click(function (e) {
	
	    if (gameView.paused) {
	      e.target.innerText = 'Pause Game';
	      gameView.resume();
	    } else {
	      e.target.innerText = 'Resume Game';
	      gameView.pause();
	    }
	  });
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _game = __webpack_require__(2);
	
	var _game2 = _interopRequireDefault(_game);
	
	var _utils = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var dt = void 0;
	var maxLevel = 3;
	
	var GameView = function () {
	  function GameView(ctx) {
	    var level = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
	
	    _classCallCheck(this, GameView);
	
	    this.level = level;
	    this.ctx = ctx;
	    this.lastTime = 0;
	    this.inPlay = false;
	    this.paused = false;
	    this.frameId = null;
	  }
	
	  _createClass(GameView, [{
	    key: 'start',
	    value: function start() {
	      this.inPlay = true;
	      this.game = new _game2.default(this.ctx, this.level);
	      this.game.bindKeyHandlers();
	      this.animate(0);
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      this.paused = true;
	      window.cancelAnimationFrame(this.frameId);
	    }
	  }, {
	    key: 'resume',
	    value: function resume() {
	      this.paused = false;
	      this.animate(dt + this.lastTime);
	    }
	  }, {
	    key: 'animate',
	    value: function animate(time) {
	      var _this = this;
	
	      if (!this.paused) {
	        if (!this.game.gameWon && !this.game.gameOver) {
	          (function () {
	            dt = (time - _this.lastTime) / 20;
	            dt = dt > 1 ? 1 : dt;
	            _this.lastTime = time;
	            _this.game.moveBall(dt);
	            _this.game.moveEvils(dt);
	            _this.game.render();
	            var that = _this;
	            _this.frameId = window.requestAnimationFrame(function (dTime) {
	              that.animate(dTime);
	            });
	          })();
	        } else if (this.game.gameOver) {
	          this.inPlay = false;
	          (0, _utils.showModal)();
	        } else if (this.game.gameWon) {
	          (0, _utils.showLevelModal)();
	        }
	      }
	    }
	  }]);
	
	  return GameView;
	}();
	
	exports.default = GameView;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ball = __webpack_require__(3);
	
	var _ball2 = _interopRequireDefault(_ball);
	
	var _utils = __webpack_require__(5);
	
	var _evil = __webpack_require__(6);
	
	var _evil2 = _interopRequireDefault(_evil);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var randomVel = function randomVel() {
	  var speeds = [-0.5, -0.25, -0.10, 0.10, 0.25, 0.5];
	  var randomSpeed = speeds[Math.floor(Math.random() * speeds.length)];
	  return (0, _utils.randomVector)(randomSpeed);
	};
	
	var randomPos = function randomPos() {
	  var x = Math.floor(Math.random() * (_utils.GameDims.x + _utils.GameDims.width));
	  var y = Math.floor(Math.random() * (_utils.GameDims.y + _utils.GameDims.height));
	  return [x, y];
	};
	
	var Game = function () {
	  function Game(ctx) {
	    var level = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
	
	    _classCallCheck(this, Game);
	
	    this.level = level;
	    this.ctx = ctx;
	    this.ball = new _ball2.default({ position: [].concat(_toConsumableArray(_utils.BallPos[1])) });
	    this.evils = [];
	    this.setupEvil();
	    this.gameWon = false;
	    this.gameOver = false;
	  }
	
	  _createClass(Game, [{
	    key: 'render',
	    value: function render() {
	      var _this = this;
	
	      this.ctx.fillStyle = '#cdcdcd';
	      this.ctx.fillRect(_utils.GameDims.x, _utils.GameDims.y, _utils.GameDims.width, _utils.GameDims.height);
	      this.ball.draw(this.ctx);
	      this.evils.forEach(function (evil) {
	        return evil.draw(_this.ctx);
	      });
	      this.eatEvil();
	      this.checkWin();
	    }
	  }, {
	    key: 'checkWin',
	    value: function checkWin() {
	      if (!this.evils.length) {
	        this.gameWon = true;
	      }
	    }
	  }, {
	    key: 'eatEvil',
	    value: function eatEvil() {
	      var _this2 = this;
	
	      this.evils.forEach(function (evil, idx) {
	
	        if (evil.isCollidedWith(_this2.ball)) {
	          // this.remove(evil);
	          // this.ball.radius += evil.radius;
	          if (evil.radius <= _this2.ball.radius) {
	            _this2.remove(evil);
	            _this2.ball.radius += evil.radius;
	          } else {
	            _this2.gameOver = true;
	          }
	        }
	      });
	    }
	  }, {
	    key: 'setupEvil',
	    value: function setupEvil() {
	      console.log(' setup for level: ' + this.level);
	      var numBalls = {
	        1: [20, 5, 5, 3, 2],
	        2: [10, 15, 20, 6, 4],
	        3: [10, 10, 25, 10, 8]
	      };
	      // const numBalls = {
	      //   1: [3, 0, 0, 0, 0 ],
	      //   2: [6, 0, 0, 0, 0],
	      //   3: [9, 0, 0, 0, 0]
	      // };
	
	      var ballsToCreate = numBalls[this.level];
	      var i = 0;
	      while (i < ballsToCreate[0]) {
	        this.evils.push(new _evil2.default({ position: [].concat(_toConsumableArray(randomPos())), radius: 1.5, vel: [].concat(_toConsumableArray(randomVel())) }));
	        i++;
	      }
	
	      i = 0;
	      while (i < ballsToCreate[1]) {
	        this.evils.push(new _evil2.default({ position: [].concat(_toConsumableArray(randomPos())), radius: 2.5, vel: [].concat(_toConsumableArray(randomVel())) }));
	        i++;
	      }
	      i = 0;
	      while (i < ballsToCreate[2]) {
	        this.evils.push(new _evil2.default({ position: [].concat(_toConsumableArray(randomPos())), radius: 10, vel: [].concat(_toConsumableArray(randomVel())) }));
	        i++;
	      }
	
	      i = 0;
	      while (i < ballsToCreate[3]) {
	        this.evils.push(new _evil2.default({ position: [].concat(_toConsumableArray(randomPos())), radius: 20, vel: [].concat(_toConsumableArray(randomVel())) }));
	        i++;
	      }
	      i = 0;
	      while (i < ballsToCreate[4]) {
	        this.evils.push(new _evil2.default({ position: [].concat(_toConsumableArray(randomPos())), radius: 30, vel: [].concat(_toConsumableArray(randomVel())) }));
	        i++;
	      }
	    }
	  }, {
	    key: 'moveBall',
	    value: function moveBall(dt) {
	      this.ball.move(dt);
	    }
	  }, {
	    key: 'moveEvils',
	    value: function moveEvils(dt) {
	      this.evils.forEach(function (evil) {
	        evil.move(dt);
	      });
	    }
	  }, {
	    key: 'remove',
	    value: function remove(obj) {
	      var idx = this.evils.indexOf(obj);
	      var left = this.evils.slice(0, idx);
	      var right = this.evils.slice(idx + 1);
	      this.evils = [].concat(_toConsumableArray(left), _toConsumableArray(right));
	    }
	  }, {
	    key: 'bindKeyHandlers',
	    value: function bindKeyHandlers() {
	      var _this3 = this;
	
	      key('up', function () {
	        _this3.ball.power([0, -1]);
	      });
	
	      key('w', function () {
	        _this3.ball.power([0, -1]);
	      });
	
	      key('left', function () {
	        _this3.ball.power([-1, 0]);
	      });
	      key('a', function () {
	        _this3.ball.power([-1, 0]);
	      });
	      key('down', function () {
	        _this3.ball.power([0, 1]);
	      });
	      key('s', function () {
	        _this3.ball.power([0, 1]);
	      });
	
	      key('right', function () {
	        _this3.ball.power([1, 0]);
	      });
	      key('d', function () {
	        _this3.ball.power([1, 0]);
	      });
	    }
	  }]);
	
	  return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _moving_object = __webpack_require__(4);
	
	var _moving_object2 = _interopRequireDefault(_moving_object);
	
	var _utils = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var COLOR = 'white';
	var RADIUS = 5;
	var vel = [0, 0];
	var MaxSpeed = 200;
	
	var Ball = function (_MovingObject) {
	  _inherits(Ball, _MovingObject);
	
	  function Ball(options) {
	    _classCallCheck(this, Ball);
	
	    var _this = _possibleConstructorReturn(this, (Ball.__proto__ || Object.getPrototypeOf(Ball)).call(this, { pos: [].concat(_toConsumableArray(options.position)), color: COLOR, radius: RADIUS, vel: [].concat(vel) }));
	
	    _this.COLOR = COLOR;
	    _this.RADIUS = RADIUS;
	    _this.vel = [].concat(vel);
	    return _this;
	  }
	
	  _createClass(Ball, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      var x1 = this.pos[0] - this.radius,
	          x2 = this.pos[0] + this.radius,
	          y1 = this.pos[1] - this.radius,
	          y2 = this.pos[1] + this.radius;
	
	      var lingrad = ctx.createLinearGradient(x1, y1, x2, y1);
	      lingrad.addColorStop(0, 'gray');
	      lingrad.addColorStop(0.5, '#3c09fa');
	      lingrad.addColorStop(1, 'gray');
	      ctx.fillStyle = 'red';
	      ctx.beginPath();
	      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
	
	      ctx.fill();
	    }
	  }, {
	    key: 'move',
	    value: function move(dt) {
	      _moving_object2.default.prototype.move.call(this, dt);
	      this.vel[0] *= 0.96;
	      this.vel[1] *= 0.96;
	    }
	  }, {
	    key: 'power',
	    value: function power(impulse) {
	      var velX = this.vel[0] + impulse[0];
	      var velY = this.vel[1] + impulse[0];
	      var speed = (0, _utils.Norm)([velX, velY]);
	      // if ( speed < MaxSpeed){
	      this.vel[0] += impulse[0];
	      this.vel[1] += impulse[1];
	      // }
	    }
	  }]);
	
	  return Ball;
	}(_moving_object2.default);
	
	exports.default = Ball;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MovingObject = function () {
	  function MovingObject(options) {
	    _classCallCheck(this, MovingObject);
	
	    this.pos = options.pos;
	    this.vel = options.vel;
	    this.radius = options.radius;
	    this.color = options.color;
	  }
	
	  _createClass(MovingObject, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.fillStyle = this.color;
	      ctx.beginPath();
	      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
	
	      ctx.fill();
	    }
	  }, {
	    key: 'move',
	    value: function move(dt) {
	      this.pos[0] += this.vel[0] * dt;
	      this.pos[1] += this.vel[1] * dt;
	
	      if (this.pos[0] > _utils.GameDims.x + _utils.GameDims.width) {
	        this.pos[0] = 0;
	      }
	      if (this.pos[0] < _utils.GameDims.x) {
	        this.pos[0] = _utils.GameDims.x + _utils.GameDims.width;
	      }
	
	      if (this.pos[1] > _utils.GameDims.y + _utils.GameDims.height) {
	        this.pos[1] = 0;
	      }
	      if (this.pos[1] < _utils.GameDims.y) {
	        this.pos[1] = _utils.GameDims.y + _utils.GameDims.height;
	      }
	    }
	  }, {
	    key: 'isCollidedWith',
	    value: function isCollidedWith(otherObject) {
	      return (0, _utils.Dist)(this.pos, otherObject.pos) <= parseInt(this.radius) + parseInt(otherObject.radius);
	    }
	  }]);
	
	  return MovingObject;
	}();
	
	exports.default = MovingObject;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var windowH = exports.windowH = window.innerHeight - 100;
	var windowW = exports.windowW = window.innerWidth;
	// export const windowH = 700;
	// export const windowW = 900;
	
	var Dist = exports.Dist = function Dist(pos1, pos2) {
	  var xDiff = parseInt(pos1[0]) - parseInt(pos2[0]);
	  var yDiff = parseInt(pos1[1]) - parseInt(pos2[1]);
	  return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
	};
	
	var Norm = exports.Norm = function Norm(_ref) {
	  var _ref2 = _slicedToArray(_ref, 2);
	
	  var x1 = _ref2[0];
	  var y1 = _ref2[1];
	
	  return Dist([0, 0], [x1, y1]);
	};
	
	var GameDims = exports.GameDims = {
	  x: 0,
	  y: 0,
	  width: 1 * windowW,
	  height: 1 * windowH
	};
	
	var BallPos = exports.BallPos = {
	  1: [GameDims.width / 2, GameDims.height / 2]
	};
	
	var randomVector = exports.randomVector = function randomVector(length) {
	  var x = Math.random() * length;
	  var y = Math.sqrt(length * length - x * x);
	  return [x, y];
	};
	
	var showModal = exports.showModal = function showModal() {
	  $("#game-over-modal").removeClass("is-closed");
	  $("#game-over-modal").addClass("is-active");
	};
	var hideModal = exports.hideModal = function hideModal() {
	  $("#game-over-modal").addClass("is-closed");
	  setTimeout(function () {
	    $("#game-over-modal").removeClass("is-active");
	  }, 1001);
	};
	
	var hideIntroModal = exports.hideIntroModal = function hideIntroModal() {
	  $("#intro-modal").addClass("is-closed");
	  setTimeout(function () {
	    $("#intro-modal").removeClass("is-active");
	  }, 1001);
	};
	
	var showLevelModal = exports.showLevelModal = function showLevelModal() {
	  $("#new-level-modal").removeClass("is-closed");
	  $("#new-level-modal").addClass("is-active");
	};
	var hideLevelModal = exports.hideLevelModal = function hideLevelModal() {
	  $("#new-level-modal").addClass("is-closed");
	  setTimeout(function () {
	    $("#new-level-modal").removeClass("is-active");
	  }, 1001);
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _moving_object = __webpack_require__(4);
	
	var _moving_object2 = _interopRequireDefault(_moving_object);
	
	var _utils = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var COLOR = 'black';
	
	var Evil = function (_MovingObject) {
	  _inherits(Evil, _MovingObject);
	
	  function Evil(options) {
	    _classCallCheck(this, Evil);
	
	    return _possibleConstructorReturn(this, (Evil.__proto__ || Object.getPrototypeOf(Evil)).call(this, { pos: [].concat(_toConsumableArray(options.position)), color: COLOR, radius: options.radius, vel: [].concat(_toConsumableArray(options.vel)) }));
	  }
	
	  return Evil;
	}(_moving_object2.default);
	
	exports.default = Evil;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map