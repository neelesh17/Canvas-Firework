/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};
var isMouseDown = false; // Event Listeners

addEventListener('mousemove', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  initialize();
});
addEventListener('mousedown', function () {
  isMouseDown = true;
});
addEventListener('mouseup', function () {
  isMouseDown = false;
});
canvas.addEventListener('touchstart', function () {
  isMouseDown = true;
});
canvas.addEventListener('touchmove', function (event) {
  event.preventDefault();
  mouse.x = event.touches[0].pageX;
  mouse.y = event.touches[0].pageY;
});
canvas.addEventListener('touchend', function () {
  isMouseDown = false;
}); // Objects

var Cannon = /*#__PURE__*/function () {
  function Cannon(x, y, width, height, color) {
    _classCallCheck(this, Cannon);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = 0;
    this.color = color;
  }

  _createClass(Cannon, [{
    key: "update",
    value: function update() {
      desiredAngle = Math.atan2(mouse.y - this.y, mouse.x - this.x);
      this.angle = desiredAngle;
      this.draw();
    }
  }, {
    key: "draw",
    value: function draw() {
      c.save();
      c.translate(this.x, this.y);
      c.rotate(this.angle);
      c.beginPath();
      c.fillStyle = this.color;
      c.shadowColor = this.color;
      c.shadowBlur = 3;
      c.shadowOffsetX = 0;
      c.shadowOffsetY = 0;
      c.fillRect(0, -this.height / 2, this.width, this.height);
      c.closePath();
      c.restore();
    }
  }]);

  return Cannon;
}();

var Cannonball = /*#__PURE__*/function () {
  function Cannonball(x, y, dx, dy, radius, color, cannon, particleColors) {
    _classCallCheck(this, Cannonball);

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = dx;
    this.dy = -dy;
    this.particleColors = particleColors;
    this.source = cannon;
    this.timeToLife = canvas.height / (canvas.height + 800);
    this.init();
  }

  _createClass(Cannonball, [{
    key: "init",
    value: function init() {
      // Initialize the cannonballs start coordinates (from muzzle of cannon)
      this.x = Math.cos(this.source.angle) * this.source.width;
      this.y = Math.sin(this.source.angle) * this.source.width; // Translate relative to canvas positioning

      this.x = this.x + canvas.width / 2;
      this.y = this.y + canvas.height; // Determine whether the cannonball should be 
      // fired to the left or right of the cannon

      if (mouse.x - canvas.width / 2 < 0) {
        this.dx = -this.dx;
      }

      this.dy = Math.sin(this.source.angle) * 8;
      this.dx = Math.cos(this.source.angle) * 8;
    }
  }, {
    key: "draw",
    value: function draw() {
      c.save();
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.shadowColor = this.color;
      c.shadowBlur = 5;
      c.shadowOffsetX = 0;
      c.shadowOffsetY = 0;
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
      c.restore();
    }
  }, {
    key: "update",
    value: function update() {
      if (this.y + this.radius + this.dy > canvas.height) {
        this.dy = -this.dy;
      } else {
        this.dy -= gravity;
      }

      this.y += this.dy;
      this.x += this.dx;
      this.draw();
      this.timeToLife -= 0.01;
    }
  }]);

  return Cannonball;
}();

var Particle = /*#__PURE__*/function () {
  function Particle(x, y, dx, dy, radius, color) {
    _classCallCheck(this, Particle);

    this.x = x;
    this.y = y;
    this.radius = 5;
    this.color = color;
    this.dx = dx;
    this.dy = -dy;
    this.timeToLive = 1;
  }

  _createClass(Particle, [{
    key: "draw",
    value: function draw() {
      c.save();
      c.beginPath();
      c.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
      c.shadowColor = this.color;
      c.shadowBlur = 10;
      c.shadowOffsetX = 0;
      c.shadowOffsetY = 0;
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
      c.restore();
    }
  }, {
    key: "update",
    value: function update() {
      if (this.y + this.radius + this.dy > canvas.height) {
        this.dy = -this.dy;
      }

      if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius + this.dx < 0) {
        this.dx = -this.dx;
      }

      this.y += this.dy;
      this.x += this.dx;
      this.draw();
      this.timeToLive -= 0.01;
    }
  }]);

  return Particle;
}();

var Explosion = /*#__PURE__*/function () {
  function Explosion(cannonball) {
    _classCallCheck(this, Explosion);

    this.particles = [];
    this.rings = [];
    this.source = cannonball;
    this.init();
  }

  _createClass(Explosion, [{
    key: "init",
    value: function init() {
      for (var index = 0; index < 10; index++) {
        var dx = Math.random() * 6 - 3;
        var dy = Math.random() * 6 - 3;
        var randomParticleColor = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomColor(this.source.particleColors);
        this.particles.push(new Particle(this.source.x, this.source.y, dx, dy, 1, randomParticleColor));
      }
    }
  }, {
    key: "update",
    value: function update() {
      var _this = this;

      this.particles.forEach(function (particle, i) {
        particle.update();

        if (particle.timeToLive < 0) {
          _this.particles.splice(i, 1);
        }
      });
      this.rings.forEach(function (ring, i) {
        ring.update();

        if (ring.timeToLife < 0) {
          _this.rings.splice(i, 1);
        }
      });
    }
  }]);

  return Explosion;
}(); // Implementation


var gravity = 0.08;
var desiredAngle = 0;
var cannon, cannonballs, explosions, colors;

function initialize() {
  cannon = new Cannon(canvas.width / 2, canvas.height, 20, 10, "white");
  cannonballs = [];
  explosions = [];
  colors = [{
    cannonballColor: "#fff",
    particleColors: ["#ff4747", "#00ceed", "#fff"]
  }];
}

initialize();
var timer = 0;
var isIntroComplete = false;
var introTimer = 0; // Animation Loop

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(18, 18, 18, 0.2)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  cannon.update();

  if (isIntroComplete === false) {
    introTimer += 1;

    if (introTimer % 3 === 0) {
      var color = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomColor(colors);
      cannonballs.push(new Cannonball(canvas.width / 2, canvas.height / 2, 2, 2, 4, color.cannonballColor, cannon, color.particleColors));
    }

    if (introTimer > 30) {
      isIntroComplete = true;
    }
  }

  cannonballs.forEach(function (cannonball, i) {
    cannonball.update();

    if (cannonball.timeToLife <= 0) {
      explosions.push(new Explosion(cannonball));
      cannonballs.splice(i, 1);
    }
  });
  explosions.forEach(function (explosion, index) {
    explosion.update();

    if (explosion.particles.length <= 0) {
      explosions.splice(index, 1);
    }
  });

  if (isMouseDown === true) {
    timer += 1;

    if (timer % 3 === 0) {
      var randomColors = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomColor(colors);
      cannonballs.push(new Cannonball(mouse.x, mouse.y, 2, 2, 4, randomColors.cannonballColor, cannon, randomColors.particleColors));
    }
  }
}

animate();

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

module.exports = {
  randomIntFromRange: randomIntFromRange,
  randomColor: randomColor,
  distance: distance
};

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map