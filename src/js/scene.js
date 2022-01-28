import * as THREE from "three";
import camera from "./camera";
import { size, textureLoader } from "./config";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DonutGroup } from "./donuts";

const scene = new THREE.Scene();
scene.add(camera);

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// const geometry = new THREE.TorusGeometry(1.0, 0.5, 64, 64);
// const material = new THREE.MeshStandardMaterial();

// const dirtMap = textureLoader.load("./textures/GroundDirtRocky006_2k/REGULAR/2K/GroundDirtRocky006_COL_2K.jpg");
// const dirtNormalMap = textureLoader.load("./textures/GroundDirtRocky006_2k/REGULAR/2K/GroundDirtRocky006_NRM_2K.jpg");
// const dirtDispMap = textureLoader.load("./textures/GroundDirtRocky006_2k/REGULAR/2K/GroundDirtRocky006_DISP_2K.jpg");
// material.map = dirtMap;
// material.normalMap = dirtNormalMap;
// material.displacementMap = dirtDispMap;
// material.displacementScale = 0.2;

// const donut = new THREE.Mesh(geometry, material);
// scene.add(donut);

const donuts = new DonutGroup();
scene.add(donuts);

// scene.add(donut);
const gltfLoader = new GLTFLoader();
let adobeLogo;
gltfLoader.load("./models/adobe_logo/adobe_logo.gltf", (gltf) => {
  adobeLogo = gltf.scene;
  adobeLogo.scale.setScalar(200.0);
  adobeLogo.children[0].geometry.center();
  // adobeLogo.rotation.x = Math.PI / 2;

  const material = adobeLogo.children[0].material;
  material.metalness = 0.5;
  material.roughness = 1.0;
  // scene.add(adobeLogo);
});


// lighting
const light = new THREE.AmbientLight("#404040"); // soft white light
scene.add(light);

const sunlight = new THREE.DirectionalLight("#ffffff", 1.0);
sunlight.position.set(0, 10, 10);
sunlight.target = donuts;
// scene.add(sunlight);
const pointLight = new THREE.PointLight("#ffffff", 2.0, 30.0);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// mouse
const mouse = new THREE.Vector2();
window.addEventListener("mousemove", (event) => {
  mouse.x = (event.x / size.width) * 2.0 - 1.0;
  mouse.y = -(event.y / size.height) * 2.0 + 1.0;
});

const clock = new THREE.Clock();
// this must be called inside the render loop
export const animateScene = () => {
  const elapsedTime = clock.getElapsedTime();
  // if (adobeLogo) {
  //   adobeLogo.rotation.x = Math.PI / 2 - mouse.y * 0.3
  //   adobeLogo.rotation.y = -mouse.x * 0.3;
  // }
  donuts.tick(elapsedTime);
};

export default scene;
