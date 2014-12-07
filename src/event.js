
/* event.js */

// keyboad event handler
function keyHandler(e) {

  var charE = "E".charCodeAt(0);
  var charI = "I".charCodeAt(0);

  // export
  if(e.keyCode == charE) {

    dataExport();

  }

  // import
  if(e.keyCode == charI) {

    dataImport();

  }

}

/*
// clicked on a dot

function clicked(dot) {

  if(dot.on) {

    dot.dot.setAttribute("fill", d8.config.color.off );
    dot.on = false;

  } else {

    dot.dot.setAttribute("fill", d8.config.color.on );
    dot.on = true;

  }

}
*/
