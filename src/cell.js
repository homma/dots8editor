
/* cell.js */

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

cell.prototype.updateDots = function(dots) {

  for(var i = 0; i < 8; i++) {

    var dot = this.dots[i];
    var on = dots[i];

    dot.change(on);

  }

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

