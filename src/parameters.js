
/* parameters.js */

////// Fixed Calculated Parameters (non changeable by users)

//// cell

d8.config.cell.width = d8.config.dot.width * 4;
d8.config.cell.height = d8.config.dot.width * 9;

d8.config.cell.horizontalDots = 4;
d8.config.cell.verticalDots = 2;

//// canvas

d8.config.canvas.width = d8.config.canvas.horizontalCells * d8.config.cell.width;
d8.config.canvas.height = d8.config.canvas.verticalCells * d8.config.cell.height;

//// guids

d8.config.guide.intervalCells = Math.floor( d8.config.guide.interval / d8.config.cell.verticalDots );

//// execution modes

d8.config.mode = {};

// update while display = none
// become faster on chrome
// become slower on safari

if(window.chrome) {

  d8.config.mode.offlineUpdate = true;

} else {

  d8.config.mode.offlineUpdate = false;

}

// use document.createDocumentFragment
// it seems not useful

d8.config.mode.useFragment = false;

// use element cache and cloneNode()
// it seems not useful

d8.config.mode.useElementCache = false;

