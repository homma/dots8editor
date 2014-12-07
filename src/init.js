
/* init.js */

function createCanvas(id) {

  canvas = document.getElementById(id);

  // set size
  canvas.style.width = d8.config.canvas.width;
  canvas.style.height = d8.config.canvas.height;

  // set cursor
  canvas.style.cursor = d8.config.canvas.cursor;

  createCells(canvas);

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

function createDot(x, y) {

  var r      = d8.config.dot.width / 2;
  var rect_w = d8.config.dot.width * 2;

  // position of dot
  var cx = x + d8.config.dot.width;
  var cy = y + d8.config.dot.width;

  // create dot
  var circle = createCircle(canvas, cx, cy, r);
  circle.setAttribute("fill", d8.config.color.off);

  // create rect (for hit test)
  var rect = createSquare(canvas, x, y, rect_w);
  rect.setAttribute("opacity", 0.0);

  // dot object
  var dot = { dot: circle, rect: rect, on: false };

  // add event
  rect.onclick = function(e) { clicked(dot) };

  return dot;

}

function createCell(canvas, x, y) {

  // calculate positions of dots
  var positions = [];

  var rect_w = d8.config.dot.width * 2;
  for(var i = 0; i < 4; i++) {

    positions.push({ x: x         , y: y + i * rect_w})
    positions.push({ x: x + rect_w, y: y + i * rect_w})

  }  

  // create dots and record them
  var cell = [];

  for(var i = 0; i < positions.length; i++) {

    // position of up left corner of hit rect
    var x = positions[i].x;
    var y = positions[i].y;

    // create and record
    cell.push( createDot(x, y) );

  }

  d8.data.cells.push(cell);

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
        createCell(fragment, x, y);
      } else {
        createCell(canvas, x, y);
      }

    }

  }

  if(d8.config.mode.useFragment) {
    canvas.appendChild(fragment);
  }

  if(d8.config.mode.offlineUpdate) {
    setTimeout( function(){ canvas.style.display = display; }, 0 )
  }

}

