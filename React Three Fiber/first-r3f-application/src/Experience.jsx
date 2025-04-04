import { useFrame, extend, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import CustomObjects from "./CustomObjects";

extend({ OrbitControls });

export default function Experience() {
  const cubeRef = useRef();
  const { camera, gl } = useThree();

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += 0.01;

    // const angle = state.clock.elapsedTime * 0.4;
    // state.camera.position.x = Math.sin(angle) * 8;
    // state.camera.position.z = Math.cos(angle) * 8;
    // state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <group ref={cubeRef}>
        <mesh scale={1.5} position-x={2} rotation-y={Math.PI * 0.25}>
          <boxGeometry scale={1.5} />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh scale={1.5} position-x={-2} rotation-y={Math.PI * 0.25}>
          <boxGeometry scale={1.5} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </group>

      <mesh rotation-x={-Math.PI / 2} scale={20} position={[0, -1, 0]}>
        <planeGeometry />
        <meshStandardMaterial color="green" />
      </mesh>

      <CustomObjects />
    </>
  );
}
