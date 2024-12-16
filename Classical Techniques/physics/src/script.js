import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as lil from "lil-gui";
import * as CANNON from "cannon-es";

/**
 * Debug
 */
const gui = new lil.GUI();
const debugObject = {};
// sphere
debugObject.createSphere = () => {
  createSphere(Math.random() * 0.5, {
    x: (Math.random() - 0.5) * 3,
    y: 3,
    z: (Math.random() - 0.5) * 3,
  });
};
gui.add(debugObject, "createSphere");

// cube
debugObject.createCube = () => {
  createCube(Math.random() * 0.5, Math.random() * 0.5, Math.random() * 0.5, {
    x: (Math.random() - 0.5) * 3,
    y: 3,
    z: (Math.random() - 0.5) * 3,
  });
};
gui.add(debugObject, "createCube");

debugObject.reset = () => {
  objectsToUpdate.forEach((obj) => {
    // Remove from physics
    world.removeBody(obj.body);
    obj.body.removeEventListener("collide", playHitSound);

    // Remove from Three.js
    scene.remove(obj.mesh);

    objectsToUpdate.splice(0, objectsToUpdate.length);
  });
  objectsToUpdate.length = 0;
};
gui.add(debugObject, "reset");

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Sounds
 */
const hitSound = new Audio("/sounds/hit.mp3");

const playHitSound = (cubeBody) => {
  // Calculate the size of the mesh based on its dimensions
  const size = Math.max(cubeBody.height, cubeBody.width, cubeBody.depth); // Use the largest dimension

  // Assign volume based on size
  if (size > 2) {
    hitSound.volume = 1.0; // Loud for large objects
  } else if (size > 1) {
    hitSound.volume = 0.7; // Medium-loud for moderately large objects
  } else if (size > 0.5) {
    hitSound.volume = 0.4; // Medium volume for smaller objects
  } else {
    hitSound.volume = 0.1; // Quiet for very small objects
  }

  // Reset and play the sound
  hitSound.currentTime = 0;
  hitSound.play();
};

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

const environmentMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/0/px.png",
  "/textures/environmentMaps/0/nx.png",
  "/textures/environmentMaps/0/py.png",
  "/textures/environmentMaps/0/ny.png",
  "/textures/environmentMaps/0/pz.png",
  "/textures/environmentMaps/0/nz.png",
]);

/**
 * Physics
 */
const world = new CANNON.World();
world.broadphase = new CANNON.SAPBroadphase(world);
world.allowSleep = true;
world.gravity.set(0, -9.82, 0);

// Materials
// const concreteMaterial = new CANNON.Material("concrete");
// const plasticMaterial = new CANNON.Material("plastic");
const defaultMaterial = new CANNON.Material("default");
const defaultContactMaterial = new CANNON.ContactMaterial(
  defaultMaterial,
  defaultMaterial,
  {
    friction: 0.1,
    restitution: 0.7,
  }
);
world.addContactMaterial(defaultContactMaterial);
world.defaultContactMaterial = defaultContactMaterial;

// Create a ground plane
const groundShape = new CANNON.Plane();
const groundBody = new CANNON.Body({
  mass: 0,
});
groundBody.addShape(groundShape);
groundBody.quaternion.setFromAxisAngle(
  new CANNON.Vec3(-1, 0, 0),
  Math.PI * 0.5
);
world.addBody(groundBody);

/**
 * Floor
 */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: "#777777",
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture,
    envMapIntensity: 0.5,
  })
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

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
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(-3, 3, 3);
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
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Utils
 */
// Three.js body
const objectsToUpdate = [];

const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const Material = new THREE.MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
  envMap: environmentMapTexture,
});

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

// Create sphere
const createSphere = (radius, position) => {
  // Three.js object
  const sphere = new THREE.Mesh(sphereGeometry, Material);
  sphere.castShadow = true;
  sphere.position.copy(position);
  sphere.scale.set(radius, radius, radius);
  scene.add(sphere);

  // Cannon.js body
  const sphereShape = new CANNON.Sphere(radius);
  const sphereBody = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 3, 0),
    shape: sphereShape,
    material: defaultMaterial,
  });
  sphereBody.position.copy(position);
  sphereBody.addEventListener("collide", playHitSound);
  world.addBody(sphereBody);

  // Save in object to update
  objectsToUpdate.push({
    mesh: sphere,
    body: sphereBody,
  });
};

// Create cube
const createCube = (width, height, depth, position) => {
  // Three.js object
  const cube = new THREE.Mesh(cubeGeometry, Material);
  cube.castShadow = true;
  cube.position.copy(position);
  cube.scale.set(width, height, depth);
  scene.add(cube);

  // Cannon.js body
  const cubeShape = new CANNON.Box(
    new CANNON.Vec3(width / 2, height / 2, depth / 2)
  );
  const cubeBody = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 3, 0),
    shape: cubeShape,
    material: defaultMaterial,
  });
  cubeBody.position.copy(position);
  cubeBody.addEventListener("collide", playHitSound);
  world.addBody(cubeBody);

  // Save in object to update
  objectsToUpdate.push({
    mesh: cube,
    body: cubeBody,
  });
};

createSphere(0.5, { x: 0, y: 3, z: 0 });
/**
 * Animate
 */
const clock = new THREE.Clock();
let oldElapsedTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;

  // Update physics
  world.step(1 / 60, deltaTime, 3);

  for (const obj of objectsToUpdate) {
    obj.mesh.position.copy(obj.body.position);
    obj.mesh.quaternion.copy(obj.body.quaternion);
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
