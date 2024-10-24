import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";

// let scene, camera, renderer

//1. 创建场景
let scene = new THREE.Scene();
//2. 创建几何体
let boxGeometry = new THREE.BoxGeometry(1, 1, 1);
//3.创建材质
let material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
});
//4. 根据几何体和材质创建物体 =>网格
let mesh = new THREE.Mesh(boxGeometry, material);
//5. 将几何体添加到场景
scene.add(mesh);

//6. 创建一个相机
//设置相机的四个参数
// fieldOfView 视野角度
// aspect 长宽比
// near 近裁剪面距离相机的距离
// far 远裁剪面距离相机的距离
let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
//7. 设置相机的位置
camera.position.set(100, 100, 100);
//8. 相机观察目标点
// camera.lookAt(0, 0, 0); //观察固定点
camera.lookAt(mesh.position); //观察物体
