import { textureLoader, gui } from "../config";
import * as THREE from "three";
import gsap from "gsap";

class SimpleBoxScene {
  constructor(scene) {
    this.scene = scene;
    this._createBox();
    this._createLights();
    this.slideAnimation();
  }

  _createBox() {
    const normalTexture = textureLoader.load("/textures/normal.png");
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      metalness: 0.7,
      roughness: 0.2,
      color: 0xff0000,
      normalMap: normalTexture,
    });
    this.box = new THREE.Mesh(geometry, material);
    this.scene.add(this.box);
  }

  _createLights() {
    const pointLight = new THREE.PointLight(0xff0000, 2);
    pointLight.position.set(1.6, 1, 1.6);
    pointLight.intensity = 10;
    this.scene.add(pointLight);

    const folder = gui.addFolder("Light");
    folder.add(pointLight.position, "x").min(-6).max(6).step(0.01);
    folder.add(pointLight.position, "y").min(-3).max(3).step(0.01);
    folder.add(pointLight.position, "z").min(-3).max(3).step(0.01);
    folder.add(pointLight, "intensity").min(0).max(10).step(0.01);
  }

  slideAnimation() {
    gsap.to(this.box.position, { duration: 1, delay: 1, x: 2 });
    gsap.to(this.box.position, { duration: 1, delay: 2, x: 0 });
  }

  rotateAnimation(elapsedTime) {
    this.box.rotation.x = elapsedTime;
    this.box.rotation.y = elapsedTime;
  }
}

export default SimpleBoxScene;
