/* global WebGLUtils */

/**
 * Lab 2 - COMP3801 Winter 2017
 *   Basic WebGL shaders, mouse events and coordinates
 *   
 *   Sample Solution
 * 
 * @author Mike Goss (mikegoss@cs.du.edu)
 */

"use strict";

// Constructor
//
// @param canvasID - string containing name of canvas to render.
//          Buttons and sliders should be prefixed with this string.
//
function Lab2(canvasID /* name of canvas to render */) {
  this.canvasID = canvasID;
  this.canvas = document.getElementById(canvasID);
  if (!this.canvas) {
    alert("Canvas ID '" + canvasID + "' not found.");
  }
  this.gl = WebGLUtils.setupWebGL(this.canvas);
  if (!this.gl) {
    alert("WebGL isn't available in this browser");
    return;
  }

  this.init();
}

// Define prototype values common to all Lab2 objects
Lab2.prototype.gl = null;

Lab2.prototype.toString = function () {
  return JSON.stringify(this);
};

Lab2.prototype.init = function () {
  var canvas = this.canvas;
  var gl = this.gl;
  var t = this;  // make available to event handlers

  // WebGL setup

  gl.viewport(0, 0, canvas.width, canvas.height);

  // enable alpha
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  // Compile and link shaders
  this.shaderProgram = initShaders(gl, "vShader.glsl", "fShader.glsl");
  if (this.shaderProgram === null)
    return;
  gl.useProgram(this.shaderProgram);

  
  // rectangle vertex coordinates
  this.rectangleCoords = [
    // vec3(0.0, 0.0, 0.0),
    // vec3(0.5, 0.0, 0.0),
    // vec3(0.0, 0.5, 0.0),
    // vec3(0.5, 0.5, 0.0),
  ]
  this.rectangleColors = [
    // vec4(0.5,0.5,0.5,1.0),
    // vec4(0.5,0.5,0.5,1.0),
    // vec4(0.5,0.5,0.5,1.0),
    // vec4(0.5,0.5,0.5,1.0),
  ]
  this.rectangleIndexs = [
    // 0, 1, 2,
    // 1, 2, 3,
  ]
  
  this.rectangleCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.rectangleCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(this.rectangleCoords), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  
  this.rectangleColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.rectangleColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(this.rectangleColors), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  
  this.rectangleIndexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.rectangleIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.rectangleIndexs), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  
  

  // Array of initial vertex coordinates
  this.vertexCoords = [
    vec3(0.0, 0.0, 0.0),
    vec3(0.5, 0.5, 0.0),
    vec3(-0.5, 0.5, 0.0),
    vec3(-0.5, -0.5, 0.0),
    vec3(0.5, -0.5, 0.0)
  ];

  // Load vertex coordinates into WebGL buffer
  this.vertexCoordBuffer = gl.createBuffer();  // get unique buffer ID number
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(this.vertexCoords), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // Array of vertex colors corresponding to vertex coordinates
  this.vertexColors = [
    vec4(1.0, 1.0, 1.0, 1.0),
    vec4(1.0, 0.0, 0.0, 1.0),
    vec4(0.0, 1.0, 0.0, 1.0),
    vec4(0.0, 0.0, 1.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0)
  ];
  
  // Load vertex colors into WebGL buffer
  this.vertexColorBuffer = gl.createBuffer();  // get unique buffer ID number
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(this.vertexColors), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
    
    
  // Set up HTML user interface
  
  this.colors = ["r", "g", "b", "a"];
  var rgbaSliders = [];         // array of slider HTML elements
  var rgbaSliderValues = [];    // array of slider value HTML elements
    
    // Set up an object with sliders for the three colors. The sliders are
  // accessed using "indices" of "r", "g", and "b".
  for (var i in this.colors) {
    var color = this.colors[i];
    var sliderID = this.canvasID + "-" + color + "-slider";
    rgbaSliders[color] = document.getElementById(sliderID);
    if (rgbaSliders[color] === null) {
      alert("Slider ID not found: " + sliderID);
      return;
    }
    var valueID = this.canvasID + "-" + color + "-value";
    rgbaSliderValues[color] = document.getElementById(valueID);
    if (rgbaSliders[color] === null) {
      alert("Slider value ID not found: " + sliderID);
      return;
    }
    rgbaSliders[color].valueDisplay = rgbaSliderValues[color];  // attach to slider

    // Callback for change of slider value
    var sliderCallback = function (e) {
      // Update text display for slider
      var color = e.target.value;
      e.target.valueDisplay.textContent = color;

      // Re-render canvas
      requestAnimationFrame(render);
    };
    // The "input" and "change" events work differently on IE from Chrome and
    // Firefox. We set up both types of events.
    rgbaSliders[color].addEventListener("input", sliderCallback);
    rgbaSliders[color].addEventListener("change", sliderCallback);
  }
  this.rgbaSliders = rgbaSliders;

  var resetButton = document.getElementById(this.canvasID + "-reset-button");
  if (resetButton === null) {
    alert("Reset button ID not found: " + this.canvasID + "-reset-button");
    return;
  }

  // Set up callback to render a frame
  var render = function () {
    t.Render();
  };

  // Set up the callback for the reset button
  resetButton.addEventListener("click", function () {
    for (var i in rgbaSliders) {
      rgbaSliders[i].value = rgbaSliders[i].max / 2;
      rgbaSliders[i].valueDisplay.textContent =
              rgbaSliders[i].value / rgbaSliders[i].max;
    }
    
    // Clear vertex coords and colors (we don't need to rewrite buffers,
    // since redraw only draw number of points in vertexCoords)
    t.vertexCoords.length = 0;
    t.vertexColors.length = 0;
    requestAnimationFrame(render);
  });

  // Set up mouse tracking
  this.mouseDown = false;  // track mouse button state
  this.drawingRectangle = false; // track drawing rectangle
  this.rectangleVertexIndex = 0;
  this.wMouseX = 0.0;
  this.wMouseY = 0.0;
  this.wColor = vec4(0.0, 0.0, 0.0, 1.0)
  var mouseX = document.getElementById(this.canvasID + "-mousex");
  var mouseY = document.getElementById(this.canvasID + "-mousey");
  var mouseButton = document.getElementById(this.canvasID + "-mousebutton");
  var glMouseX = document.getElementById(this.canvasID + "-gl-mousex");
  var glMouseY = document.getElementById(this.canvasID + "-gl-mousey");
  if (mouseX === null || mouseY === null || mouseButton === null ||
          glMouseX == null || glMouseY == null) {
    alert("Mouse output HTML IDs not found");
    return;
  }

  // Add mouse event handlers
  // canvas.addEventListener("mousedown", function (e) {
  //   // IE handles button ID different from everyone else. We'll just assume
  //   // that any button press is the left button.
  //   t.mouseDown = true;
  //   mouseButton.textContent = "down";
  // });

  // Add mouse event handlers
  canvas.addEventListener("click", function(e) {
    var cx = e.pageX - e.target.offsetLeft;   // canvas X
    var cy = e.pageY - e.target.offsetTop;    // canvas Y
    mouseX.textContent = cx;
    mouseY.textContent = cy;
    var wx = (2.0 * cx / (canvas.width - 1)) - 1.0;
    var wy = 1.0 - (2.0 * cy / (canvas.height - 1));
    
    if (t.drawingRectangle) {
      t.drawingRectangle = false;
      t.drawRectangle(t.wMouseX, t.wMouseY, t.wColor, wx, wy, t.getSliderColor());
    } else {
      t.drawingRectangle = true;
      t.wMouseX = wx;
      t.wMouseY = wy;
      t.wColor = t.getSliderColor()
    }
    t.AddPoint(e);
    requestAnimationFrame(render);
  })
  // canvas.addEventListener("mouseup", function (e) {
  //   // IE handles button ID different from everyone else. We'll just assume
  //   // that any button press is the left button.
  //   t.mouseDown = false;
  //   mouseButton.textContent = "up";
    
  //   t.AddPoint(e);
    
  //   // requestAnimationFrame(render);    // redraw
  // });
  canvas.addEventListener("mousemove", function (e) {
    // Calculate mouse position relative to canvas. This unfortunately works
    // differently in different browsers. This method appears to work in Chrome,
    // Firefox, and IE 11.
    var cx = e.pageX - e.target.offsetLeft;   // canvas X
    var cy = e.pageY - e.target.offsetTop;    // canvas Y
    mouseX.textContent = cx;
    mouseY.textContent = cy;
    var wx = (2.0 * cx / (canvas.width - 1)) - 1.0;
    var wy = 1.0 - (2.0 * cy / (canvas.height - 1));
    glMouseX.textContent = wx.toFixed(3);
    glMouseY.textContent = wy.toFixed(3);

    if (t.mouseDown) {
      requestAnimationFrame(render);  // redraw
    }
  });

  // Kick things off with an initial rendering
  requestAnimationFrame(render);
};

/**
 * AddPoint - add a point to the display from the specified event
 * 
 * @param {event} e mouse event
 */
Lab2.prototype.AddPoint = function (e) {
  var gl = this.gl;
  var cx = e.pageX - e.target.offsetLeft;   // canvas X
  var cy = e.pageY - e.target.offsetTop;    // canvas Y
  var wx = (2.0 * cx / (this.canvas.width - 1)) - 1.0;  // gl X
  var wy = 1.0 - (2.0 * cy / (this.canvas.height - 1)); // gl Y

  // Add new coords
  this.vertexCoords.push(vec3(wx, wy, 0.0));
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(this.vertexCoords), gl.STATIC_DRAW);
  
  // Add new color
  this.vertexColors.push(this.getSliderColor());
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(this.vertexColors), gl.STATIC_DRAW);
};

/**
 * draw rectangle
 * 
 * @param {event} e mouse event
 */
Lab2.prototype.drawRectangle = function (wx1, wy1, color1, wx2, wy2, color2) {
  var gl = this.gl;
  
  // Add new coords
  this.rectangleCoords.push(vec3(wx1, wy1, 0.0));
  this.rectangleCoords.push(vec3(wx1, wy2, 0.0));
  this.rectangleCoords.push(vec3(wx2, wy1, 0.0));
  this.rectangleCoords.push(vec3(wx2, wy2, 0.0));
  gl.bindBuffer(gl.ARRAY_BUFFER, this.rectangleCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(this.rectangleCoords), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  
  // Add new color
  var averageColor = this.colorAverage(color1, color2);
  this.rectangleColors.push(color1);
  this.rectangleColors.push(averageColor);
  this.rectangleColors.push(averageColor);
  this.rectangleColors.push(color2);
  gl.bindBuffer(gl.ARRAY_BUFFER, this.rectangleColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(this.rectangleColors), gl.STATIC_DRAW);
  

  var tmp = this.rectangleIndexs
  var length = tmp.length
  if (length <= 0) {
    this.rectangleIndexs.push(0)
    this.rectangleIndexs.push(1)
    this.rectangleIndexs.push(2)
    this.rectangleIndexs.push(1)
    this.rectangleIndexs.push(2)
    this.rectangleIndexs.push(3)
  } else {
    this.rectangleIndexs.push(tmp[length-6] + 4)
    this.rectangleIndexs.push(tmp[length-5] + 4)
    this.rectangleIndexs.push(tmp[length-4] + 4)
    this.rectangleIndexs.push(tmp[length-3] + 4)
    this.rectangleIndexs.push(tmp[length-2] + 4)
    this.rectangleIndexs.push(tmp[length-1] + 4)
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.rectangleIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.rectangleIndexs), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}

Lab2.prototype.colorAverage = function (color1, color2) {
  return vec4(
    (parseFloat(color1[0]) + parseFloat(color2[0])) / 2,
    (parseFloat(color1[1]) + parseFloat(color2[1])) / 2,
    (parseFloat(color1[2]) + parseFloat(color2[2])) / 2,
    (parseFloat(color1[3]) + parseFloat(color2[3])) / 2,
  )
}

/**
 * GetSliderColors - get the current rgba color represented by the sliders
 *   as a vec3.
 *   
 * @returns {vec3} current slider color
 */
Lab2.prototype.getSliderColor = function () {
  // Build an array of color values based on the current slider colors
  var colorValues = [];
  for (var i in this.colors) {
    var color = this.colors[i];
    var colorValue = this.rgbaSliders[color].value;
    colorValues[i] = colorValue;
  }
  
  return vec4(colorValues);
};

/**
 * Render - draw the frame
 *
 */
Lab2.prototype.Render = function () {
  var gl = this.gl;
  gl.clearColor(0, 0, 0, 1);
  gl.enable(gl.DEPTH_TEST);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexCoordBuffer);
  this.vPosition = gl.getAttribLocation(this.shaderProgram, "vPosition");
  gl.enableVertexAttribArray(this.vPosition);
  gl.vertexAttribPointer(this.vPosition, 3, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
  this.vColor = gl.getAttribLocation(this.shaderProgram, "vColor");
  gl.enableVertexAttribArray(this.vColor);
  gl.vertexAttribPointer(this.vColor, 4, gl.FLOAT, false, 0, 0);
  
  gl.drawArrays(gl.POINTS, 0, this.vertexCoords.length);
  
  console.log(this.drawingRectangle);
  if (this.rectangleCoords.length > 0) {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.rectangleCoordBuffer);
    this.vPosition = gl.getAttribLocation(this.shaderProgram, "vPosition");
    gl.enableVertexAttribArray(this.vPosition);
    gl.vertexAttribPointer(this.vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.rectangleColorBuffer);
    this.vColor = gl.getAttribLocation(this.shaderProgram, "vColor");
    gl.enableVertexAttribArray(this.vColor);
    gl.vertexAttribPointer(this.vColor, 4, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.rectangleIndexBuffer);
    
    console.log(this.rectangleCoords);
    console.log(this.rectangleColors);
    console.log(this.rectangleIndexs);
    gl.drawElements(gl.TRIANGLES, this.rectangleIndexs.length, gl.UNSIGNED_SHORT, 0);
  }
};
  