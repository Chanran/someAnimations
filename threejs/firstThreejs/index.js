// 创建3D场景
var scene = new THREE.Scene();  
// 创建照相机
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// 创建渲染器
var renderer = new THREE.WebGLRenderer(); 
//设置渲染器的尺寸
renderer.setSize(window.innerWidth, window.innerHeight); 
// 将渲染器挂载到dom上
document.body.appendChild(renderer.domElement);

// 几何图形
var geometry = new THREE.BoxGeometry(1, 1, 1);
// 创建网格材质并设置材质的颜色
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// 创建立方体
var cube = new THREE.Mesh(geometry, material);
// 在场景中添加立方体
scene.add(cube);

camera.position.z = 5;

var render = function() {
  requestAnimationFrame(render);

  cube.rotation.x += 0.1;
  cube.rotation.y += 0.1;

  renderer.render(scene, camera);
};

render();