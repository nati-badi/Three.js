import * as THREE from "three";
import Experience from "../Experience";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    // Test Mesh
    const Mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
    );
    this.scene.add(Mesh);
  }
}
