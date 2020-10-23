// 定义顶点着色器
var VSHADER_SOURCE = 
  [
    'attribute vec4 a_position;',
    'attribute vec4 a_vertex_color;',
    'uniform mat4 u_matrix;',
    'varying vec4 vColor;',
    'void main(){',
    '  gl_Position = u_matrix * a_position;',
    '  vColor = a_vertex_color;',
    '}',
  ].join('\n');

// 定义片元着色器
var FSHADER_SOURCE =
  [
    'precision mediump float;',
    'varying vec4 vColor;',
    'void main(){',
    '  gl_FragColor = vColor;',
    '}',
  ].join('\n');

function main(){
  var canvas = document.getElementById('webgl');

  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Fail to get the rendering context fro WebGl.');
    return;
  }

  // 初始化着色器
  if (!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)) {
    console.log('Fail to initialize shaders.');
    return;
  }

  // 点位置
  var a_position = gl.getAttribLocation(gl.program, 'a_position');
  // 点颜色
  var a_vertex_color = gl.getAttribLocation(gl.program, 'a_vertex_color');
  // MVP矩阵
  var matrix = new Float32Array([
    1.5, 0, 0, 0,
    0, 1.5, 0, 0,
    0, 0, 1.5, 0,
    0, 0, 0, 1,
  ])
  var matrixLocation = gl.getUniformLocation(gl.program, 'u_matrix');

  if (a_position < 0) {
    console.log('Failed to get the storage location of a_position');
    return;
  }
  if (a_vertex_color < 0) {
    console.log('Failed to get the storage location of a_vertex_color');
    return;
  }

  // 把数据塞进一个变量，然后放进buffer
  var arrVtx = new Float32Array([
    // x, y, r, g, b
    -0.5, 0.5, 1.0, 0.0, 1.0, 1.0,  // 红色
    0.5, 0.5, 0.0, 1.0, 0.0, 1.0,   // 绿色
    -0.5, -0.5, 0.0, 0.0, 1.0, 1.0  // 蓝色
  ])

  // uniform
  gl.uniformMatrix4fv(matrixLocation, false, matrix);

  // 创建buffer
  var vBuffer = gl.createBuffer();
  if (!vBuffer) {
    console.log('Failed to create buffer');
  }
  // 将缓冲区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  // 想缓冲区对象写入数据
  gl.bufferData(gl.ARRAY_BUFFER, arrVtx, gl.STATIC_DRAW);
  // 将缓冲区对象分配给a_position变量和a_vertex_color
  var size = arrVtx.BYTES_PER_ELEMENT;
  gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, size * 6, 0);
  gl.vertexAttribPointer(a_vertex_color, 3, gl.FLOAT, false, size * 6, size * 2);
  // 连接a_position, a_vertex_color变量和分配给它的缓冲区对象
  gl.enableVertexAttribArray(a_position);
  gl.enableVertexAttribArray(a_vertex_color);
  
  // 制定清空canvas的颜色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // 清空canvas
  // gl.COLOR_BUFFER_BIT颜色缓存，默认清空色rgba(0.0, 0.0, 0.0, 0.0) 透明黑色，通过gl.clearColor指定
  // gl.DEPTH_BUFFER_BIT深度缓存，默认深度1.0，通过gl.clearDepth指定
  // gl.STENCIL_BUFFER_BIT模板缓存，默认值0，通过gl.clearStencil()指定
  gl.clear(gl.COLOR_BUFFER_BIT);
  // 绘制三角形
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}
