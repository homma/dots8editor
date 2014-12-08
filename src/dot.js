
/* dots.js */

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

