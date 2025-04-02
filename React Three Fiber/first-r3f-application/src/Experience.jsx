import { useFrame, extend, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

extend({ OrbitControls });

export default function Experience() {
  const cubeRef = useRef();
  const { camera, gl } = useThree();

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += 0.01;
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />

      <group ref={cubeRef}>
        <mesh scale={1.5} position-x={2} rotation-y={Math.PI * 0.25}>
          <boxGeometry scale={1.5} />
          <meshBasicMaterial color="mediumpurple" />
        </mesh>

        <mesh scale={1.5} position-x={-2} rotation-y={Math.PI * 0.25}>
          <boxGeometry scale={1.5} />
          <meshBasicMaterial color="orange" />
        </mesh>
      </group>

      <mesh rotation-x={-Math.PI / 2} scale={20} position={[0, -1, 0]}>
        <planeGeometry />
        <meshBasicMaterial color="green" />
      </mesh>
    </>
  );
}
