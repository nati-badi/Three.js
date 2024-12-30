import * as THREE from "three";
import Experience from "../Experience";
import Environment from "./Environment";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Test Mesh
    const Mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    this.scene.add(Mesh);

    // Wait for resources to load
    this.resources.on("ready", () => {
      // Setup
      this.environment = new Environment();
    });
  }
}
