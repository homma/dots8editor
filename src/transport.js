
/* transport.js */

//// import / export

//// Importer

function convertCharToBitPattern(ch) {

  // bit pattern
  var pattern = [];

  var code = ch.charCodeAt(0);

  // remove offset
  code -= d8.data.dotZero;

  // binary format
  //
  // 76543210
  //
  // bit pattern
  //
  // 0 3
  // 1 4
  // 2 5
  // 6 7
  //

  var arr = [0, 3, 1, 4, 2, 5, 6, 7];

  arr.forEach(function(i) {

    var shift = 1 << i;
    var bit = code & shift;

    if(bit == 0) {

      pattern.push(false);

    } else {

      pattern.push(true);

    }

  });

  return pattern;

}

function input() {

  return window.prompt("data to be imported:");

}

function updateDot(dot, on) {

  dot.on = on;

  if(on) {
    dot.dot.setAttribute("fill", d8.config.color.on);
  } else {
    dot.dot.setAttribute("fill", d8.config.color.off);
  }

}

function updateCell(cell, dots) {

  for(var i = 0; i < 8; i++) {

    var dot = cell[i];
    var on = dots[i];
    updateDot(dot, on);

  }

}

function dataImport() {

  var str = input();

  var importedCells = [];

  for(var i = 0; i < str.length; i++) {

    var code = str.charCodeAt[i];

    // remove new line charactors
    // this is necessary
    if( str[i] == "\n") {
      continue;
    }

    // remove non dot charactors
    if( (code < d8.config.dotZero) || (d8.config.dotFull < code) ) {
      continue;
    }

    importedCells.push( convertCharToBitPattern(str[i]) );

  }

  // change dot attributes
  for(var i = 0; i < d8.data.cells.length; i++) {

    var cell = d8.data.cells[i];
    var dots = importedCells[i];
    updateCell(cell, dots);

  }

}

//// Exporter

function convertCellToChar(cell) {

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

  arr.forEach(function(i) {

    n = n << 1;

    if(cell[i].on) {

      n += 1;

    } else {

      n += 0;

    }

  });

  // add offset
  n += d8.data.dotZero;

  // convert to a string
  var ret = String.fromCharCode(n);

  return ret;

}

function output(str) {

//  console.log(str);
//  window.alert(str);
  window.prompt("resulting string: ", str);

}

function dataExport() {

  var str = "";

  for(var i = 0; i < d8.data.cells.length; i++) {

    if(i == d8.config.canvas.horizontalCells) {

      str += "\n";

    }

    str += convertCellToChar(d8.data.cells[i]);

  }

  output(str);

}

