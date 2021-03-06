const kCanvasBaseWidth = 670;   // Canvas画板基准宽度
const kCanvasBaseHeight = 625;  // Canvas画板基准高度
function getHeartPoint(angle) { // 蛋糕坐标系
  var t = angle / Math.PI;
	var x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
	var y = - 20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
	return new Array(kCanvasBaseWidth / 2 + x, kCanvasBaseHeight / 2 - 55 + y);
}
function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.prototype = {
  rotate: function (theta) {
    var x = this.x;
    var y = this.y;
    this.x = Math.cos(theta) * x - Math.sin(theta) * y;
    this.y = Math.sin(theta) * x + Math.cos(theta) * y;
    return this;
  },
  mult: function (f) {
    this.x *= f;
    this.y *= f;
    return this;
  },
  clone: function () {
    return new Vector(this.x, this.y);
  },
  length: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },
  subtract: function (v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  },
  set: function (x, y) {
    this.x = x;
    this.y = y;
    return this;
  },
};

function Petal(stretchA, stretchB, startAngle, angle, growFactor, bloom) {
  this.stretchA = stretchA;
  this.stretchB = stretchB;
  this.startAngle = startAngle;
  this.angle = angle;
  this.bloom = bloom;
  this.growFactor = growFactor;
  this.r = 1;
  this.isfinished = false;
  //this.tanAngleA = Garden.random(-Garden.degrad(Garden.options.tanAngle), Garden.degrad(Garden.options.tanAngle));
  //this.tanAngleB = Garden.random(-Garden.degrad(Garden.options.tanAngle), Garden.degrad(Garden.options.tanAngle));
}
Petal.prototype = {
  draw: function () {
    var ctx = this.bloom.garden.ctx;
    var v1, v2, v3, v4;
    v1 = new Vector(0, this.r).rotate(Garden.degrad(this.startAngle));
    v2 = v1.clone().rotate(Garden.degrad(this.angle));
    v3 = v1.clone().mult(this.stretchA); //.rotate(this.tanAngleA);
    v4 = v2.clone().mult(this.stretchB); //.rotate(this.tanAngleB);
    ctx.strokeStyle = this.bloom.c;
    ctx.beginPath();
    ctx.moveTo(v1.x, v1.y);
    ctx.bezierCurveTo(v3.x, v3.y, v4.x, v4.y, v2.x, v2.y);
    ctx.stroke();
  },
  render: function () {
    if (this.r <= this.bloom.r) {
      this.r += this.growFactor; // / 10;
      this.draw();
    } else {
      this.isfinished = true;
    }
  },
};

function Bloom(p, r, c, pc, garden) {
  this.p = p;
  this.r = r;
  this.c = c;
  this.pc = pc;
  this.petals = [];
  this.garden = garden;
  this.init();
  this.garden.addBloom(this);
}
Bloom.prototype = {
  draw: function () {
    var p,
      isfinished = true;
    this.garden.ctx.save();
    this.garden.ctx.translate(this.p.x, this.p.y);
    for (var i = 0; i < this.petals.length; i++) {
      p = this.petals[i];
      p.render();
      isfinished *= p.isfinished;
    }
    this.garden.ctx.restore();
    if (isfinished == true) {
      this.garden.removeBloom(this);
    }
  },
  init: function () {
    var angle = 360 / this.pc;
    var startAngle = Garden.randomInt(0, 90);
    for (var i = 0; i < this.pc; i++) {
      this.petals.push(
        new Petal(
          Garden.random(
            Garden.options.petalStretch.min,
            Garden.options.petalStretch.max
          ),
          Garden.random(
            Garden.options.petalStretch.min,
            Garden.options.petalStretch.max
          ),
          startAngle + i * angle,
          angle,
          Garden.random(
            Garden.options.growFactor.min,
            Garden.options.growFactor.max
          ),
          this
        )
      );
    }
  },
};

function Garden(element) {
  element.width = kCanvasBaseWidth;
  element.height = kCanvasBaseHeight;
  let ctx = element.getContext("2d");
  ctx.globalCompositeOperation = "lighter";
  this.blooms = [];
  this.element = element;
  this.ctx = ctx;
  this.runState = -1; // 运行状态 -1 ： 未运行； 1 ： 运行中 ； 0 ： 运行结束；
}
Garden.prototype = {
  render: function () {
    for (var i = 0; i < this.blooms.length; i++) {
      this.blooms[i].draw();
    }
  },
  addBloom: function (b) {
    this.blooms.push(b);
  },
  removeBloom: function (b) {
    var bloom;
    for (var i = 0; i < this.blooms.length; i++) {
      bloom = this.blooms[i];
      if (bloom === b) {
        this.blooms.splice(i, 1);
        return this;
      }
    }
  },
  createRandomBloom: function (x, y) {
    this.createBloom(
      x,
      y,
      Garden.randomInt(
        Garden.options.bloomRadius.min,
        Garden.options.bloomRadius.max
      ),
      Garden.randomrgba(
        Garden.options.color.rmin,
        Garden.options.color.rmax,
        Garden.options.color.gmin,
        Garden.options.color.gmax,
        Garden.options.color.bmin,
        Garden.options.color.bmax,
        Garden.options.color.opacity
      ),
      Garden.randomInt(
        Garden.options.petalCount.min,
        Garden.options.petalCount.max
      )
    );
  },
  createBloom: function (x, y, r, c, pc) {
    new Bloom(new Vector(x, y), r, c, pc, this);
  },
  clear: function () {
    this.blooms = [];
    this.ctx.clearRect(0, 0, this.element.width, this.element.height);
  },
  startDrawing: function() {
    // 运行中
    if (this.runState == 1) {
      return;
    }
    // 停止运行
    if (this.runState == 0) {
      this.blooms = [];
      this.ctx.clearRect(0, 0, this.element.width, this.element.height);
    }

    this._renderInterval = setInterval(() => {
      this.render();
      if (this.runState == 0) {
        clearInterval(this._renderInterval);
      }
    }, Garden.options.growSpeed);
    let interval = 50;
    let angle = 10;
    let heart = new Array();
    this._animationInterval = setInterval(() => {
      let bloom = getHeartPoint(angle);
      let draw = true;
      for (var i = 0; i < heart.length; i++) {
        var p = heart[i];
        var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
        if (distance < Garden.options.bloomRadius.max * 1.3) {
          draw = false;
          break;
        }
      }
      if (draw) {
        heart.push(bloom);
        this.createRandomBloom(bloom[0], bloom[1]);
      }
      
      if (angle >= 30) {
        this.runState = 0;
        clearInterval(this._animationInterval);
      } else {
        angle += 0.2;
      }
    }, interval);
    this.runState = 1;
  },
  stopDrawn: function() {
    if (this.runState != 1) {
      return;
    }
    clearInterval(this._renderInterval);
    clearInterval(this._animationInterval);
  }
};

Garden.options = {
  petalCount: {
    min: 8,
    max: 15,
  },
  petalStretch: {
    min: 0.1,
    max: 3,
  },
  growFactor: {
    min: 0.1,
    max: 1,
  },
  bloomRadius: {
    min: 4,
    max: 7,
  },
  density: 10,
  growSpeed: 1500 / 60,
  color: {
    rmin: 128,
    rmax: 255,
    gmin: 0,
    gmax: 128,
    bmin: 0,
    bmax: 128,
    opacity: 0.1,
  },
  tanAngle: 60,
};
Garden.random = function (min, max) {
  return Math.random() * (max - min) + min;
};
Garden.randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
Garden.circle = 2 * Math.PI;
Garden.degrad = function (angle) {
  return (Garden.circle / 360) * angle;
};
Garden.raddeg = function (angle) {
  return (angle / Garden.circle) * 360;
};
Garden.rgba = function (r, g, b, a) {
  return "rgba(" + r + "," + g + "," + b + "," + a + ")";
};
Garden.randomrgba = function (rmin, rmax, gmin, gmax, bmin, bmax, a) {
  var r = Math.round(Garden.random(rmin, rmax));
  var g = Math.round(Garden.random(gmin, gmax));
  var b = Math.round(Garden.random(bmin, bmax));
  var limit = 5;
  if (
    Math.abs(r - g) <= limit &&
    Math.abs(g - b) <= limit &&
    Math.abs(b - r) <= limit
  ) {
    return Garden.rgba(rmin, rmax, gmin, gmax, bmin, bmax, a);
  } else {
    return Garden.rgba(r, g, b, a);
  }
};
export default Garden;
