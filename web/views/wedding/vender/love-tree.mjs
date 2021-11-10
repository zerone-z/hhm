function Vector(x, y) {
  this.x = x || 0;
  this.y = y || 0;
};
Vector.prototype = {
  add: function (v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  },
  length: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },
  rotate: function (theta) {
    var x = this.x;
    var y = this.y;
    this.x = Math.cos(theta) * this.x - Math.sin(theta) * this.y;
    this.y = Math.sin(theta) * this.x + Math.cos(theta) * this.y;
    //this.x = Math.cos(theta) * x - Math.sin(theta) * y;
    //this.y = Math.sin(theta) * x + Math.cos(theta) * y;
    return this;
  },
  mult: function (f) {
    this.x *= f;
    this.y *= f;
    return this;
  }
};
function Leaf(p, r, c, ctx) {
  this.p = p || null;
  this.r = r || 0;
  this.c = c || 'rgba(255,255,255,1.0)';
  this.ctx = ctx;
}
Leaf.prototype = {
  render: function () {
    var that = this;
    var ctx = this.ctx;
    var f = Branch.random(1, 2)
    for (var i = 0; i < 5; i++) {
      (function (r) {
        setTimeout(function () {
          ctx.beginPath();
          ctx.fillStyle = that.color;
          ctx.moveTo(that.p.x, that.p.y);
          ctx.arc(that.p.x, that.p.y, r, 0, Branch.circle, true);
          ctx.fill();
        }, r * 60);
      })(i);
    }
  }
}
function Branch(p, v, r, c, t) {
  this.p = p || null;
  this.v = v || null;
  this.r = r || 0;
  this.length = 0;
  this.generation = 1;
  this.tree = t || null;
  this.color = c || 'rgba(255,255,255,1.0)';
  this.register();
};
Branch.prototype = {
  register: function () {
    this.tree.addBranch(this);
  },
  draw: function () {
    var ctx = this.tree.ctx;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.moveTo(this.p.x, this.p.y);
    ctx.arc(this.p.x, this.p.y, this.r, 0, Branch.circle, true);
    ctx.fill();
  },
  modify: function () {
    var angle = 0.18 - (0.10 / this.generation);
    this.p.add(this.v);
    this.length += this.v.length();
    this.r *= 0.99;
    this.v.rotate(Branch.random(-angle, angle)); //.mult(0.996);
    if (this.r < 0.8 || this.generation > 10) {
      this.tree.removeBranch(this);
      var l = new Leaf(this.p, 10, this.color, this.tree.ctx);
      l.render();
    }
  },
  grow: function () {
    this.draw();
    this.modify();
    this.fork();
  },
  fork: function () {
    var p = this.length - Branch.random(this.tree.minForkLength,
			this.tree.maxForkLength); // + (this.generation * 10);
    if (p > 0) {
      var n = Math.round(Branch.random(1, 3));
      this.tree.stat.fork += n - 1;
      for (var i = 0; i < n; i++) {
        Branch.clone(this);
      }
      this.tree.removeBranch(this);
    }
  }
};
Branch.circle = 2 * Math.PI;
Branch.random = function (min, max) {
  return Math.random() * (max - min) + min;
};
Branch.clone = function (b) {
  var r = new Branch(new Vector(b.p.x, b.p.y), new Vector(b.v.x, b.v.y), b.r, b.color, b.tree);
  r.generation = b.generation + 1;
  return r;
};
Branch.rgba = function (r, g, b, a) {
  return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
};
Branch.randomrgba = function (min, max, a) {
  return Branch.rgba(Math.round(Branch.random(min, max)), Math.round(Branch.random(min, max)), Math.round(Branch.random(min, max)), a);
};
function Tree(element, forkCount) {
  if (!element) {
    return;
  }
  this.element = element;
  this.ctx = element.getContext("2d");
  this.ctx.globalCompositeOperation = "lighter";
  this.forkCount = forkCount || 5;

  this.minForkLength = 100;
  this.maxForkLength = 200;
  var branches = [];
  var timer;
  this.stat = {
    fork: 0,
    length: 0
  };
  this.addBranch = function (b) {
    branches.push(b);
  };
  this.removeBranch = function (b) {
    for (var i = 0; i < branches.length; i++) {
      if (branches[i] === b) {
        branches.splice(i, 1);
        return;
      }
    }
  };
  this.render = function (fn) {
    if (!this.ctx) {
      return;
    }
    let backingStore = this.ctx.backingStorePixelRatio ||
        this.ctx.webkitBackingStorePixelRatio ||
        this.ctx.mozBackingStorePixelRatio ||
        this.ctx.msBackingStorePixelRatio ||
        this.ctx.oBackingStorePixelRatio ||
        this.ctx.backingStorePixelRatio || 1;
    let ratio = (window.devicePixelRatio || 1) / backingStore;
    this.ctx.scale(ratio, ratio);
    this.element.width = this.element.clientWidth * ratio;
    this.element.height = this.element.clientHeight * ratio;

    let avgForkLength = Math.max(this.element.width, this.element.height) / 2 / this.forkCount;
    this.minForkLength = avgForkLength / 2;
		this.maxForkLength = this.minForkLength * 3;

		let r = this.element.width / 40;
		let y_speed = r / this.forkCount;

    // tree
    for (let i = 0; i < 3; i++) {
      new Branch(new Vector(this.element.width / 2, this.element.height), new Vector(Math.random(-1, 1), -y_speed), r, Branch.randomrgba(0, 255, 0.3), this);
    }
    
    let that = this;
    timer = setInterval(function () {
      fn && fn.apply(that, arguments);
      if (branches.length > 0) {
        for (let i = 0; i < branches.length; i++) {
          branches[i].grow();
        }
      }
      else {
        clearInterval(timer);
      }
    }, 1000 / 30);
  };
  this.init = function (ctx) {
    this.ctx = ctx;
  };
  this.abort = function () {
    branches = [];
    this.stat = {
      fork: 0,
      length: 0
    }
  };
};
export default Tree;
