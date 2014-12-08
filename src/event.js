
/* event.js */

// keyboad event handler
function keyHandler(e) {

  var charE = "E".charCodeAt(0);
  var charI = "I".charCodeAt(0);
  var charM = "M".charCodeAt(0);

  switch(e.keyCode) {

    // export
    case charE:

      dataExport();
      break;

    // import
    case charI:

      dataImport();
      break;

    // change mode
    case charM:

      break;

  }

}

