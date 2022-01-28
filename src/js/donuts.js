import * as THREE from "three";
import { textureLoader } from "./config";

const geometry = new THREE.TorusGeometry(1.0, 0.5, 64, 64);
const material = new THREE.MeshStandardMaterial();

const dirtMap = textureLoader.load("./textures/GroundDirtRocky006_2k/REGULAR/2K/GroundDirtRocky006_COL_2K.jpg");
const dirtNormalMap = textureLoader.load("./textures/GroundDirtRocky006_2k/REGULAR/2K/GroundDirtRocky006_NRM_2K.jpg");
const dirtDispMap = textureLoader.load("./textures/GroundDirtRocky006_2k/REGULAR/2K/GroundDirtRocky006_DISP_2K.jpg");
material.map = dirtMap;
material.normalMap = dirtNormalMap;
material.displacementMap = dirtDispMap;
material.displacementScale = 0.2;

const randomInBox = (size) => {
  const offset = size / 2;
  const x = (Math.random() - 0.5) * offset;
  const y = (Math.random() - 0.5) * offset;
  const z = (Math.random() - 0.5) * offset;
  return new THREE.Vector3(x, y, z);
}

export class DonutGroup extends THREE.Group {

  constructor() {
    super();
    this.init(200);
  }

  init(n) {
    this.donutsData = [];
    for (let i = 0; i < n; ++i) {
      const donut = new THREE.Mesh(geometry, material);
      const scale = 0.1 + Math.random() * 0.2;
      donut.scale.setScalar(scale);

      const size = 20;
      const x = (Math.random() - 0.5) * size;
      const y = (Math.random() - 0.5) * size;
      const z = (Math.random() - 0.5) * size;
      donut.position.set(x, y, z);

      const rx = Math.random();
      const ry = Math.random() * 2;
      donut.rotation.x = rx;
      donut.rotation.y = ry;

      this.add(donut);
      this.donutsData.push({
        id: i,
        pos: new THREE.Vector3(x, y, z),
        rot: new THREE.Vector2(rx, ry),
        mesh: donut,
      })
    }
  }

  tick(t) {
    const sr = Math.cos(t * 0.5);
    this.donutsData.forEach(item => {
      const { x, y, z } = item.pos;
      item.mesh.position.set(sr * x, sr * y, sr * z);
      const rx = item.rot.x;
      const ry = item.rot.y;
      const sRot = Math.sin(t * (item.id / 20));
      item.mesh.rotation.x = rx * sRot;
      item.mesh.rotation.y = ry * sRot;
    });
  }
}
