
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

function updateCell(cell, dots) {

  for(var i = 0; i < 8; i++) {

    var dot = cell.dots[i];
    var on = dots[i];
    dot.change(on);

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

function output(str) {

  window.prompt("resulting string: ", str);

}

function dataExport() {

  var str = "";

  for(var i = 0; i < d8.data.cells.length; i++) {

    if(i == d8.config.canvas.horizontalCells) {

      str += "\n";

    }

    str += d8.data.cells[i].toString();

  }

  output(str);

}

