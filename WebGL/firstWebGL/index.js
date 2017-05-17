/// <reference path="../../typings/index.d.ts" />

var gl; // webGL全局变量

function start() {
  var canvas = document.getElementById('glcanvas');

  // 初始化 WebGL 上下文
  gl = initWebGL(canvas);

  // 只有WebGL可用的时候才继续

  if (gl) {
    // 设置清除颜色为黑色，不透明
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // 开启“深度测试”， Z-缓存
    gl.enable(gl.DEPTH_TEST);
    // 设置深度测试，近的物体遮挡远的物体
    gl.depthFunc(gl.LEQUAL);
    // 清除颜色和深度缓存
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    // 设置上下文尺寸
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
}

function initWebGL(canvas) {
  // 创建全局变量
  window.gl = null;

  try {
    // 尝试获取标准上下文，如果失败，回退到试验性上下文
    gl = canvas.getContext('webgl') || canvas.getContext('experiment-webgl');
  } catch (error) {}

  // 如果没有GL上下文，马上放弃
  if (!gl) {
    alert('WebGL初始化失败，可能是因为您的浏览器不支持。');
    gl = null;
  }
  return gl;
}

function initShaders() {
  // 片元着色器
  var fragmentShader = getShader(gl, "shader-fs");
  // 顶点着色器
  var vertexShader = getShader(gl,'shader-vs');

  // 创建着色器

  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, fragmentShader);
  gl.attachShader(shaderProgram, vertexShader);
  gl.linkProgram(shaderProgram);

  // 如果创建着色器失败

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initalize the shader program.');
  }

  gl.useProgram(shaderProgram);

  vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
  gl.enableVertexAttribArray(vertexPositionAttribute);

}
