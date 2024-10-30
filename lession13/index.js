import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// let scene, camera, renderer

//1. 创建场景
let scene = new THREE.Scene();
//2. 创建几何体
// let boxGeometry = new THREE.BoxGeometry(10, 10, 10);
let GeometryInfo = {
  x: 10,
  y: 10,
  h: 10,
};

const boxGeometry = new THREE.BoxGeometry(
  GeometryInfo.x,
  GeometryInfo.y,
  GeometryInfo.h
);
//3.创建材质
let material = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  shininess: 20, //光泽度
  specular: 0xffffff, //材质的高光颜色
  transparent: true,
  opacity: 0.5,
});

let colorInfo = {
  color: 0xff0000,
};

let isbool = {
  rotate: true,
};

const gui = new GUI();
let folder = gui.addFolder("图形属性").close();
folder.add(GeometryInfo, "x", 0, 200, 1).onChange(updateGeometry);
folder.add(GeometryInfo, "y", 0, 200, 1).onChange(updateGeometry);
gui
  .add(GeometryInfo, "h", [10, 20, 30, 40, 50, 60])
  .onChange(updateGeometry)
  .step(10)
  .name("高度");
gui.addColor(colorInfo, "color").onChange((value) => {
  material.color.set(value);
});
gui.add(isbool, "rotate").name("旋转");




function updateGeometry() {
  //摧毁当前的几何体
  if (mesh) {
    scene.remove(mesh);
  }
  // 创建新的几何体
  const newGeometry = new THREE.BoxGeometry(
    GeometryInfo.x,
    GeometryInfo.y,
    GeometryInfo.h
  );
  // 使用相同材质创建新的 mesh
  mesh = new THREE.Mesh(newGeometry, material);
  // 设置新的 mesh 的位置
  mesh.position.set(0, 0, 0);
  // 将新的 mesh 添加到场景
  scene.add(mesh);
}

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
let render = new THREE.WebGLRenderer({
  antialias: true, //开启反锯齿
});

//10. 设置渲染器的尺寸
render.setSize(width, height);

//11. 把渲染器添加到页面

render.setPixelRatio(window.devicePixelRatio); //设置设备像素比
render.setClearColor(0x00ff00, 1);
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

//添加轨道控制器
let controls = new OrbitControls(camera, render.domElement);
controls.target.set(0, 0, 0);
controls.update();

function animate() {
  if (isbool.rotate) {
    mesh.rotation.y += 0.01;
  }
  requestAnimationFrame(animate);
  render.render(scene, camera);
  // stats.update();
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

//打印屏幕像素比
console.log(window.devicePixelRatio, "devicePixelRatio");
