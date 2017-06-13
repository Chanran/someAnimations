var renderer; // 渲染器
var canvasDiv = document.getElementById('canvas');
function initThree() {
  width = canvasDiv.clientWidth;
  height = canvasDiv.clientHeight;
  renderer = new THREE.WebGLRenderer({
    antialias: true
  }); // 初始化渲染器
  renderer.setSize(width,height); // 设置渲染器的宽高为canvas元素的宽高
  canvasDiv.appendChild(renderer.domElement);
  renderer.setClearColor(0xFFFFFF, 1.0) // 设置渲染器背景颜色
}

var camera; // 照相机
function initCamera() {
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.x = 0;
  camera.position.y = 1000;
  camera.position.z = 0;
  camera.up.x = 0;
  camera.up.y = 0;
  camera.up.z = 1;
  camera.lookAt({
    x: 0,
    y: 0,
    z: 0
  });
}

var scene; // 场景
function initScene() {
  scene = new THREE.Scene();
}

var light; // 光照
function initLight() {
  light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
  light.position.set(100, 100, 200);
  scene.add(light);
}

var cube; // 立方体
function initObject() {
  var geometry = new THREE.Geometry();
  var material = new THREE.LineBasicMaterial({
    vertexColors: true
  });
  var color1 = new THREE.Color( 0x444444 );
  var color2 = new THREE.Color( 0xFF0000 );
  // 线的材质可以由两点的颜色决定
  var p1 = new THREE.Vector3( -100, 0, 100 );
  var p2 = new THREE.Vector3( 100, 0, -100);
  geometry.vertices.push(p1);
  geometry.vertices.push(p2);
  geometry.colors.push(color1, color2);

  var line = new THREE.Line(geometry, material, THREE.LinePieces);
  scene.add(line);
}

function threeStart() {
  initThree();
  initCamera();
  initScene();
  initLight();
  initObject();
  renderer.clear();
  renderer.render(scene, camera);
}