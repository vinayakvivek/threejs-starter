import * as dat from "dat.gui";
import { TextureLoader } from "three";

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const gui = new dat.GUI({
  width: 400,
  closed: true,
});

const textureLoader = new TextureLoader();

export { size, gui, textureLoader };
