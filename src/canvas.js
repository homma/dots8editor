
/* canvas.js */

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

