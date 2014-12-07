
/* init.js */

function createCanvas(id) {

  canvas = document.getElementById(id);

  // set size
  canvas.style.width = d8.config.canvas.width;
  canvas.style.height = d8.config.canvas.height;

  // set cursor
  canvas.style.cursor = d8.config.canvas.cursor;

  createCells(canvas);

  if(d8.config.guide.use) {
    setGuide();
  }

}

function createElement(canvas, tagName) {

  var ns = 'http://www.w3.org/2000/svg';
  var el = document.createElementNS(ns, tagName);
  canvas.appendChild(el);

  return el;

}

function createCircle(canvas, x, y, r) {

  var el;

  if(d8.config.mode.useElementCache) {

    if(d8.data.circleTemplate) {

      el = d8.data.circleTemplate.cloneNode(false);

    } else {

      el = createElement(canvas, 'circle');
      d8.data.circleTemplate = el;

      canvas.appendChild(el);

    }

  } else {

    el = createElement(canvas, 'circle');

  }

  el.setAttribute("cx", x);
  el.setAttribute("cy", y);
  el.setAttribute("r", r);

  return el;

}

function createSquare(canvas, x, y, w) {

  var el = createElement(canvas, 'rect');

  el.setAttribute("x", x);
  el.setAttribute("y", y);
  el.setAttribute("width", w);
  el.setAttribute("height", w);

  return el;

}

function dot(x, y) {

  var r      = d8.config.dot.width / 2;
  var rect_w = d8.config.dot.width * 2;

  // position of dot
  var cx = x + d8.config.dot.width;
  var cy = y + d8.config.dot.width;

  // create dot
  this.circle = createCircle(canvas, cx, cy, r);

  // create rect (for hit test)
  this.rect = createSquare(canvas, x, y, rect_w);

  this.on = false;

  // set color to disabled color
  this.disable();

  // this is not a guide point
  this.guide = false;

  // set rect transparent
  this.rect.setAttribute("opacity", 0.0);

  // add event
  var self = this;
  this.rect.onclick = function() { self.switch(); };

}

dot.prototype.color = function(color) {

  this.circle.setAttribute("fill", color);

}

dot.prototype.enable = function() {

  this.on = true;

  this.color(d8.config.color.on);

}

dot.prototype.disable = function() {

  this.on = false;

  if(d8.config.guide.use && this.guide) {

    this.color(d8.config.color.guide);

  } else {

    this.color(d8.config.color.off);

  }

}

dot.prototype.setGuide = function() {

  this.guide = true;

  if(this.on) {
    this.enable();
  } else {
    this.disable();
  }

}

dot.prototype.change = function(flag) {

  if(flag) {
    this.enable();
  } else {
    this.disable();
  }

}

dot.prototype.switch = function() {

  if(this.on) {
    this.disable()
  } else {
    this.enable()
  }

}

function cell(canvas, x, y) {

  // calculate positions of dots
  var positions = [];

  var rect_w = d8.config.dot.width * 2;
  for(var i = 0; i < 4; i++) {

    positions.push({ x: x         , y: y + i * rect_w})
    positions.push({ x: x + rect_w, y: y + i * rect_w})

  }  

  // create dots and record them
  this.dots = [];

  for(var i = 0; i < positions.length; i++) {

    // position of up left corner of hit rect
    var x = positions[i].x;
    var y = positions[i].y;

    // create and record
    this.dots.push( new dot(x, y) );

  }

}

cell.prototype.setGuide = function() {

  this.dots[0].setGuide();
  this.dots[2].setGuide();
  this.dots[4].setGuide();
  this.dots[6].setGuide();

}

cell.prototype.toString = function() {

  // character code
  var n = 0;

  // cell format
  //
  // 0 1
  // 2 3
  // 4 5
  // 6 7
  //
  // binary format
  //
  // 76531420
  //

  var arr = [7, 6, 5, 3, 1, 4, 2, 0];

  for(var i = 0; i < arr.length; i++) {

    if(n != 0) {
      n = n << 1;
    }

    var p = arr[i];
    if(this.dots[p].on) {

      n += 1;

    } else {

      n += 0;

    }

  }

  // add offset
  n += d8.data.dotZero;

  // convert to a string
  var ret = String.fromCharCode(n);

  return ret;

}

function createCells(canvas) {

  if(d8.config.mode.offlineUpdate) {
    var display = canvas.style.display;
    canvas.style.display = "none";
  }

  if(d8.config.mode.useFragment) {
    var fragment = document.createDocumentFragment();
  }

  var width = d8.config.canvas.horizontalCells;
  var height = d8.config.canvas.verticalCells;

  for(var i = 0; i < height; i++) {

    var y = i * d8.config.cell.height;

    for(var j = 0; j < width; j++) {

      var x = j * d8.config.cell.width;

      if(d8.config.mode.useFragment) {
        var c = new cell(fragment, x, y);
      } else {
        var c = new cell(canvas, x, y);
      }

      d8.data.cells.push(c);

    }

  }

  if(d8.config.mode.useFragment) {
    canvas.appendChild(fragment);
  }

  if(d8.config.mode.offlineUpdate) {
    setTimeout( function(){ canvas.style.display = display; }, 0 )
  }

}

function setGuide() {

  var ival = d8.config.guide.intervalCells;
  var cells = d8.data.cells;

  for(var i = 0; i < cells.length; i += ival) {

    cells[i].setGuide();

  }

}


