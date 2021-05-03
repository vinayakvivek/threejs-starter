import * as THREE from "three";

// * ShadowScene [WIP]
class ShadowScene {
  constructor(scene) {
    this.scene = scene;
  }

  _createLight() {
    const directionalLight = new THREE.DirectionalLight("#ffffff", 3);
    directionalLight.position.set(0.25, 3, -2.25);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.setScalar(1024);
    directionalLight.shadow.normalBias = 0.05;

    const shadowCameraSize = 2;
    directionalLight.shadow.camera.far = 10;
    directionalLight.shadow.camera.top = -shadowCameraSize;
    directionalLight.shadow.camera.bottom = shadowCameraSize;
    directionalLight.shadow.camera.left = -shadowCameraSize;
    directionalLight.shadow.camera.right = shadowCameraSize;
    this.scene.add(directionalLight);

    // shadow camera helper
    this.scene.add(new THREE.CameraHelper(directionalLight.shadow.camera));
  }
}

export default ShadowScene;
