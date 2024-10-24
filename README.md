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



