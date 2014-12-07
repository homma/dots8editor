
/* data.js */

//// global data that is altered from everywhere in the program

d8.data = {};

// circle element template for cloneNode

if(d8.config.mode.useElementCache) {

  d8.data.circleTemplate = false;

}

// data store for cell

d8.data.cells = [];

// character code of dot zero

d8.data.dotZero = parseInt("2800", 16);
d8.data.dotFull = parseInt("28ff", 16);

