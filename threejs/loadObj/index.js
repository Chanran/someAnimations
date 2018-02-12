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

camera.position.z = 0;
camera.position.y = 5;
camera.rotation.x -= 90;

var loader = new THREE.OBJLoader();

// load a resource
loader.load(
	// resource URL
	'ship.obj',
	// called when resource is loaded
	function ( object ) {

		scene.add( object );

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

var render = function() {
  requestAnimationFrame(render);

  renderer.render(scene, camera);
};

render();