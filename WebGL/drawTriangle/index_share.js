// 定义顶点着色器
var VSHADER_SOURCE = 
`
  attribute vec4 a_position;
  attribute vec4 a_vertex_color;
  uniform mat4 u_matrix;
  varying vec4 vColor;
  void main(){
    gl_Position = u_matrix * a_position;
    vColor = a_vertex_color;
  }
`

// 定义片元着色器
var FSHADER_SOURCE =
`
  precision mediump float;
  varying vec4 vColor;
  void main(){
    gl_FragColor = vColor;
  }
`

function main(){
  var canvas = document.getElementById('webgl');
  var gl = getWebGLContext(canvas);

  // 初始化着色器
  initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)

  /* 准备数据 */

  // 准备顶点、颜色数据：通常由3D框架封装好的几何和材质的出来的
  var arrVtx = new Float32Array([
    // x, y, r, g, b
    -0.5, 0.5, 1.0, 0.0, 0.0,  // 红色
    0.5, 0.5, 0.0, 1.0, 0.0,   // 绿色
    -0.5, -0.5, 0.0, 0.0, 1.0  // 蓝色
  ])

  // MVP矩阵：通常由3D框架封装好的平移、旋转、缩放的操作计算出来的
  var matrix = new Float32Array([
    1.5, 0, 0, 0, // scale x 1.5
    0, 1.5, 0, 0, // scale y 1.5
    0, 0, 1.5, 0, // scale z 1.5
    0, 0, 0, 1,
  ])
  
  /* gl操作：上传数据到GPU，触发绘制 */
  
  // 绑定顶点shader a_position变量
  var a_position = gl.getAttribLocation(gl.program, 'a_position');
  // 绑定顶点shader a_vertex_color变量
  var a_vertex_color = gl.getAttribLocation(gl.program, 'a_vertex_color');
  var matrixLocation = gl.getUniformLocation(gl.program, 'u_matrix');
  
  // uniform MVP矩阵
  gl.uniformMatrix4fv(matrixLocation, false, matrix);
  // 创建buffer
  var vBuffer = gl.createBuffer();
  // 将缓冲区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  // 想缓冲区对象写入数据
  gl.bufferData(gl.ARRAY_BUFFER, arrVtx, gl.STATIC_DRAW);
  // 将缓冲区对象分配给a_position变量和a_vertex_color
  var size = arrVtx.BYTES_PER_ELEMENT;
  gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, size * 5, 0);
  gl.vertexAttribPointer(a_vertex_color, 3, gl.FLOAT, false, size * 5, size * 2);
  // 连接a_position, a_vertex_color变量和分配给它的缓冲区对象
  gl.enableVertexAttribArray(a_position);
  gl.enableVertexAttribArray(a_vertex_color);
  
  // 制定清空canvas的颜色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // 清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT);
  // 绘制三角形
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}
