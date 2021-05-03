import * as THREE from "three";
import camera from "./camera";
import SimpleBoxScene from "./samples/simple-box-scene";

const scene = new THREE.Scene();
scene.add(camera);

const simpleBoxScene = new SimpleBoxScene(scene);

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

const clock = new THREE.Clock();

// this must be called inside the render loop
export const animateScene = () => {
  const elapsedTime = clock.getElapsedTime();
  simpleBoxScene.rotateAnimation(elapsedTime);
};

export default scene;
