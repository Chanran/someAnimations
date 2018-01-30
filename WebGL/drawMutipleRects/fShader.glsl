// Fragment shader

precision mediump float;   // required precision declaration

varying vec4 fColor;       // input color for fragment

void main() {
  gl_FragColor = vec4(fColor);
}
