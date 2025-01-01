import * as THREE from "three";
import * as lil from "lil-gui";

export default class DebugUI {
  constructor() {
    this.active = window.location.hash === "#debug";

    if (this.active) {
      this.ui = new lil.GUI();
    }
  }
}
