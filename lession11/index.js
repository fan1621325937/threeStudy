import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// let scene, camera, renderer

//1. 创建场景
let scene = new THREE.Scene();
//2. 创建几何体
// let boxGeometry = new THREE.BoxGeometry(10, 10, 10);

const boxGeometry = new THREE.SphereGeometry( 15, 32, 16 );
//3.创建材质
let material = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  shininess: 20, //光泽度
  specular: 0xffffff, //材质的高光颜色
  });
//4. 根据几何体和材质创建物体 =>网格
let mesh = new THREE.Mesh(boxGeometry, material);
mesh.position.set(0, 0, 0);
// 5. 将几何体添加到场景
scene.add(mesh);


//6. 创建一个相机
//设置相机的四个参数
// fieldOfView 视野角度
// aspect 长宽比
// near 近裁剪面距离相机的距离
// far 远裁剪面距离相机的距离
let width = window.innerWidth;
let height = window.innerHeight;
let camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 3000);
//7. 设置相机的位置
camera.position.set(100, 100, 100);
//8. 相机观察目标点
camera.lookAt(0, 0, 0); //观察固定点
// camera.lookAt(mesh.position); //观察物体

//9. 创建渲染器
let render = new THREE.WebGLRenderer();

//10. 设置渲染器的尺寸
render.setSize(width, height);

//11. 把渲染器添加到页面

document.body.appendChild(render.domElement);

//12. 添加坐标轴辅助器
let axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);


//13.平行光
let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.intensity = 20;

directionalLight.position.set(200, 300, 202);
scene.add(directionalLight);

// 14.可视化点光源
let pointLightHelper = new THREE.PointLightHelper(directionalLight, 100);
scene.add(pointLightHelper);

//15.Stats 性能检测
let stats = new Stats();
document.body.appendChild(stats.dom);

//添加轨道控制器
let controls = new OrbitControls(camera, render.domElement);
controls.target.set(0, 0, 0);
controls.update();

let clock = new THREE.Clock(); //时间
function animate() {
  // let time = clock.getElapsedTime(); //获取当前时间
  let time = clock.getDelta() * 1000; //获取时间差
  console.log(time);

  // mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  requestAnimationFrame(animate);
  render.render(scene, camera);
  stats.update();
}
animate();

//监听窗口变化
window.addEventListener("resize", function () {
  width = window.innerWidth;
  height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  render.setSize(width, height);
});
