import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// let scene, camera, renderer

//1. 创建场景
let scene = new THREE.Scene();
//2. 创建几何体
let boxGeometry = new THREE.BoxGeometry(100, 100, 100);
//修改

//3.创建材质
let material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
//4. 根据几何体和材质创建物体 =>网格
let mesh = new THREE.Mesh(boxGeometry, material);
mesh.position.set(0, 0, 0);
//5. 将几何体添加到场景
scene.add(mesh);

//6. 创建一个相机
//设置相机的四个参数
// fieldOfView 视野角度
// aspect 长宽比
// near 近裁剪面距离相机的距离
// far 远裁剪面距离相机的距离
let width = 1000;
let height = 1000;
let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 3000);
//7. 设置相机的位置
camera.position.set(600, 600, 600);
//8. 相机观察目标点
camera.lookAt(0, 0, 0); //观察固定点
// camera.lookAt(mesh.position); //观察物体

//9. 创建渲染器
let render = new THREE.WebGLRenderer();

//10. 设置渲染器的尺寸
render.setSize(width, height);

//11. 将webgl渲染的canvas内容添加到body
document.body.appendChild(render.domElement);

//12. 添加坐标轴辅助器
let axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

//13.添加光源

// const light = new THREE.PointLight(0xffffff);
// light.position.set(-200, 200, -202);
// light.distance = 0;
// light.decay = 1.5;
// light.intensity = 1000;
// scene.add(light);

// 14.环境光

// const ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(ambientLight);

//15.平行光
let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-200, 300, -202);
scene.add(directionalLight);


//16.可视化点光源
let pointLightHelper = new THREE.PointLightHelper(directionalLight, 100);
scene.add(pointLightHelper);
render.render(scene, camera);
//添加轨道控制器
let controls = new OrbitControls(camera, render.domElement);
controls.addEventListener("change", function () {
  render.render(scene, camera);
});
