import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { ProvinceData } from "../../../../utils/common";

interface TooltipProps {
  position: THREE.Vector3;
  data: ProvinceData;
  visible: boolean;
}

const Tooltip = ({ position, data, visible }: TooltipProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        visible ? 0.13 : 0,
        0.08
      );
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef} position={position}>
      {/* Background */}
      <mesh position={[0, 0, -0.001]}>
        <planeGeometry args={[0.16, 0.12]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Border */}
      <mesh position={[0, 0, -0.002]}>
        <planeGeometry args={[0.16, 0.12]} />
        <meshBasicMaterial 
          color="#000000" 
          transparent 
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Content */}
      <Text
        position={[-0, 0, 0]}
        fontSize={0.015}
        font="/fonts/Roboto-MediumItalic.ttf"
        color="#111"
        material-toneMapped={false}
      >
        {`Factory: ${data.numberOfFactory.toLocaleString()}

Pollution: ${data.pollutionLevel.toFixed(1)} µg/m³

Sector: ${data.mainSector}`}
      </Text>
    </group>
  );
};

export default Tooltip; 