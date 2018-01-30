// Vertex shader

attribute vec3 vPosition;  // position of vertex (x, y, z)
attribute vec4 vColor;     // color of vertex (r, g, b, a)

varying vec4 fColor;       // output color to send to fragment shader

void main() {
  gl_Position = vec4(vPosition, 1); // set vertex position (x, y, z, w)
  gl_PointSize = 10.0;              // set size of points drawn
  fColor = vColor;                  // output color to fragment shader
}
