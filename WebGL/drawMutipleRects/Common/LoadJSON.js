/* 
 * Utility routine to load a JSON file, given its URL, and return the parsed
 * object.
 * 
 */

/*
 * Load JSON file
 * 
 * Some code reused from initShaders.js (supplied with COMP3801 textbook)
 * 
 * @param fileURL - string containing the URL of the JSON file
 * @returns object from JSON file, null if error
 */
function LoadJSON(fileURL) {
  var jObj = null;  // return object

  // Create request object
  var xhr = new XMLHttpRequest();
  var okStatus = document.location.protocol === "file:" ? 0 : 200;
  
  // Open the URL.  The 3rd param = false indicates synchronous request
  // (wait until request completes). Synchronous requests are deprecated in
  // general because of potential slow response time for the user, but we
  // use a synchronous request here for simplicity.
  try {
    xhr.open('GET', fileURL, false);
    xhr.send(null);
  
    // Check for success
    if (xhr.status === okStatus) {
        jObj = JSON.parse(xhr.responseText);
    }
  }
  catch(err) {
      alert('ERROR: cannot load JSON file "' + fileURL + '": ' + err.message);
  }
  
  return jObj;
};

