import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Light
const AmbientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(AmbientLight);

/**
 * Objects
 */
const object1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);
object1.position.x = -2;

const object2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);

const object3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);
object3.position.x = 2;

scene.add(object1, object2, object3);

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster();

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Mouse
 */
const mouse = new THREE.Vector2();

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;
});

window.addEventListener("click", (event) => {
  if (curentIntersect) {
    switch (curentIntersect.object) {
      case object1:
        console.log("object 1 is clicked");
        break;
      case object2:
        console.log("object 2 is clicked");
        break;
      case object3:
        console.log("object 3 is clicked");
        break;
    }
  }
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Models
 */
const glTFloader = new GLTFLoader();

// Duck
let Duck = null;

glTFloader.load("/models/Duck/glTF-Binary/Duck.glb", (gltf) => {
  Duck = gltf.scene;
  scene.add(Duck);
  Duck.position.z = -3;
});

/**
 * Animate
 */
const clock = new THREE.Clock();

// witness
let curentIntersect = null;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Animate objects
  object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5;
  object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5;
  object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5;

  // Cast a ray
  const intersects = raycaster.intersectObjects([object1, object2, object3]);
  if (Duck) {
    const DuckIntersects = raycaster.intersectObject(Duck);

    // Increase the size of the duck if hovered over
    if (DuckIntersects.length) {
      Duck.scale.set(1.5, 1.5, 1.5);
    } else {
      Duck.scale.set(1, 1, 1);
    }
  }

  raycaster.setFromCamera(mouse, camera);

  for (const object of [object1, object2, object3]) {
    object.material.color.set(0xff0000);

    if (intersects.find((intersect) => intersect.object === object)) {
      object.material.color.set(0x00ff00);
    }
  }

  // Update mouse enter and leave events
  if (intersects.length) {
    if (curentIntersect == null) {
      console.log("enter");
    }
    curentIntersect = intersects[0];
  } else {
    if (curentIntersect) {
      console.log("leave");
    }
    curentIntersect = null;
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
