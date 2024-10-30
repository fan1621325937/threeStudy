lession1:

1. 创建场景 new THREE.scene()
2. 创建几何体 new THREE.BoxGeometry()
3. 创建材质 new THREE.MeshBasicMaterial({})
4. 根据几何体和材质创建物体 =>网格 new THREE.Mesh(
   '几何体','材质')
5. 将几何体添加到场景 scene.add(mesh)

lession2:创建一个虚拟的相机对象 fieldOfView 视野角度,aspect 长宽比 ,near 近裁剪面距离相机的距离 , far 远裁剪面距离相机的距离
new THREE.PerspectiveCamera(fieldOfView,aspect,near,far)

lession3:渲染器
new THREE.WebGLRenderer('长','宽').render(scene,Camera),

lession4:光源
new THREE.PointLight()

<!-- color -（可选）一个表示颜色的 Color 的实例、字符串或数字，默认为一个白色（0xffffff）的 Color 对象。
intensity -（可选）光照强度。默认值为 1。
distance - 光源照射的最大距离。默认值为 0（无限远）。
decay - 沿着光照距离的衰退量。默认值为 2。 -->

lession5:轨道控制器
new OrbitControls(camera, render.domElement);

lession5:可视化点光源
let pointLightHelper = new THREE.PointLightHelper(directionalLight, 100);

lession6:环境光与平行光
new THREE.DirectionalLight(0xffffff, 1):平行光
new THREE.AmbientLight(0xffffff); //环境光

lession7:动画渲染循环
requestAnimationFrame()//动画帧

<!-- mesh.rotation动画 -->

lession8:canvas 画布动态变化
window.addEventListener("resize", function () {
width = window.innerWidth;
height = window.innerHeight;
camera.aspect = width / height;
camera.updateProjectionMatrix();
render.setSize(width, height);
});

lession9:stats 性能检测
let stats = new Stats();
document.body.appendChild(stats.dom);
设置相机观察点
controls.target.set(0, 0, 0);
controls.update();

lession10:几何 Geometry
side: THREE.DoubleSide, // 双面渲染

lession11:高光材质 MeshPhongMaterial
shininess: 20, //光泽度
specular: 0xffffff, //材质的高光颜色

lession12:WebGL 渲染器
setPixelRatio 设置设备像素比。通常用于避免 HiDPI 设备上绘图模糊
antialias //开启反锯齿

lession13:gui 界面
let obj={bool:false}
const gui = new GUI();
gui.add(material, "shininess",[1,2,3]);//下拉框
gui.add(obj, "bool");//单选
gui.add(material, "shininess", 0, 100, 1);
gui.add(material, "specular", 0, 0xffffff, 1);
gui.addColor(material, "color").onChange;
.onChange=>gui 回调
.step=>步长
.addColor=>设置颜色
.name=>设置名字
//分组
 let folder = gui.addFolder("图形属性");

 folder.add()
 .close()默认关闭
 .open()默认打开


 