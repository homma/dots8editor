
/* config.js */

////// Parameters that can be changed by users

//// the container of all the global variables
var d8 = {};

//// configurations
d8.config = {};

//// dot

d8.config.dot = {};

// size of each dot
d8.config.dot.width = 3;

//// colors

d8.config.color = {};

// darkgray, gray, gainsboro, silver, lightgray, ghostwhite, whitesmoke
d8.config.color.on = 'black';
d8.config.color.off = 'lightgray';
d8.config.color.guide = 'silver';

//// cell

d8.config.cell = {};

//// canvas

d8.config.canvas = {};

// horizontal and vertical number of cells
d8.config.canvas.horizontalCells = 80;
d8.config.canvas.verticalCells = 24;

d8.config.canvas.cursor = "default";

d8.config.canvas.id = "dots8canvas"

//// drawing guide

d8.config.guide = {};

d8.config.guide.use = true;

// how many dots are there until next guids
d8.config.guide.interval = 4;

