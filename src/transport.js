
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

function dataImport() {

  var str = input();

  // if no data or window.prompt has been cancelled
  if( (str == null) || (str == "") ) {
    return;
  }

  var importedCells = [];

  for(var i = 0; i < str.length; i++) {

    var code = str.charCodeAt(i);

    // remove non dot charactors
    if( (code < d8.data.dotZero) || (d8.data.dotFull < code) ) {
      continue;
    }

    // change an input string charactor to a dot and store
    importedCells.push( convertCharToBitPattern(str[i]) );

  }

  // update dots
  for(var i = 0; i < d8.data.cells.length; i++) {

    var cell = d8.data.cells[i];
    var dots = importedCells[i];
    cell.updateDots(dots);

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

