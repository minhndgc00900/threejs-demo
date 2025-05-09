import { Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { isEmpty } from "lodash";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Factory } from "@pages/dashboard/dashboard.type";

function getExplodeOffset(
  startAngle: number,
  endAngle: number,
  distance: number
) {
  const midAngle = (startAngle + endAngle) / 2;
  return [Math.cos(midAngle) * distance, Math.sin(midAngle) * distance];
}

function PieSlice({
  startAngle,
  endAngle,
  color,
  percentage,
  type,
  explode = 0.2,
}: {
  startAngle: number;
  endAngle: number;
  color: string;
  percentage: number;
  type: string;
  explode?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState(0);

  // Create a shape for the pie slice
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.absarc(0, 0, 2, startAngle, endAngle, false);
    s.lineTo(0, 0);
    return s;
  }, [startAngle, endAngle]);

  // Extrude settings for 3D effect - thick and beveled
  const extrudeSettings = {
    depth: 0.5,
    bevelEnabled: true,
    bevelThickness: 0.15,
    bevelSize: 0.1,
    bevelSegments: 4,
  };

  // Explode offset
  const [offsetX = 0, offsetY = 0] = getExplodeOffset(startAngle, endAngle, explode);

  // Animation
  useFrame(() => {
    if (!meshRef.current) return;
    // Initial animation
    if (rotation < 1) {
      const newRotation = Math.min(rotation + 0.03, 1);
      setRotation(newRotation);
      meshRef.current.scale.setScalar(newRotation);
    }
    // Hover effect
    if (isHovered) {
      meshRef.current.position.z = THREE.MathUtils.lerp(
        meshRef.current.position.z,
        0.4,
        0.1
      );
    } else {
      meshRef.current.position.z = THREE.MathUtils.lerp(
        meshRef.current.position.z,
        0,
        0.1
      );
    }
  });

  // Center label position (on top of slice)
  const midAngle = (startAngle + endAngle) / 2;
  const labelRadius = 0.8;
  const labelX = Math.cos(midAngle) * labelRadius + offsetX;
  const labelY = Math.sin(midAngle) * labelRadius + offsetY - 1.5;

  return (
    <group position={[offsetX, offsetY, 0]}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.2} />
      </mesh>
      {/* Percentage label */}
      <Html
        position={[labelX, labelY, 2.1]}
        center
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 28,
            textShadow: "2px 2px 8px #222, 0 0 2px #000",
            WebkitTextStroke: "1px #222",
            letterSpacing: 1,
            userSelect: "none",
          }}
        >
          {percentage}%
        </div>
      </Html>
      {/* Tooltip on hover */}
      {isHovered && (
        <Html position={[0, 0, 1.5]} center>
          <div
            style={{
              background: "white",
              color: "#222",
              padding: "8px 16px",
              borderRadius: 8,
              boxShadow: "0 2px 12px #0003",
              fontWeight: 600,
              fontSize: 16,
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
          >
            {type} <b>{percentage}%</b>
          </div>
        </Html>
      )}
    </group>
  );
}

function Legend({ factory }: { factory: Factory }) {
  return (
    <Html position={[3.5, 0, 0]} style={{ pointerEvents: "none" }}>
      <div className="shadow-[0_2px_12px_rgba(0,0,0,0.1)] min-w-[200px] p-[16px] rounded-[8px] -mt-8">
        <h3 className="text-[#333] mt-0 mb-3 mx-0">Pollution Types</h3>
        {!isEmpty(factory.pollutionStatistics) && factory.pollutionStatistics.map((item) => (
          <div
            key={item.type}
            className="flex items-center mb-2"
          >
            <div
              className="w-[16px] h-[16px] bg-[#333] rounded-[4px] mr-2"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[#333]">
              {item.type}
            </span>
          </div>
        ))}
      </div>
    </Html>
  );
}

const Piechart = ({ factory }: { factory: Factory }) => {
  // Calculate start and end angles for each slice
  let currentAngle = 0;
  const slices = factory.pollutionStatistics.map((item) => {
    const startAngle = currentAngle;
    const angle = (item.percentage / 100) * Math.PI * 2;
    const endAngle = startAngle + angle;
    currentAngle = endAngle;
    return { ...item, startAngle, endAngle };
  });

  return (
    <Canvas camera={{ position: [0, -7, 7], fov: 35 }} shadows dpr={[1, 2]}>
      <Html><h2 className="text-lg font-semibold text-gray-700 text-center absolute !left-[50%] translate-x-[-50%] -top-[12rem] min-w-[255px] w-[600px]">Pollution types in {factory.name}</h2></Html>
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[5, 10, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-5, -10, -5]} intensity={0.5} />
      {/* Pie slices */}
      {slices.map((slice) => (
        <PieSlice
          key={slice.type}
          startAngle={slice.startAngle}
          endAngle={slice.endAngle}
          color={slice.color}
          percentage={slice.percentage}
          type={slice.type}
          explode={0.22}
        />
      ))}
      {/* Floor shadow */}
      <mesh receiveShadow position={[0, 0, -1.01]}>
        <cylinderGeometry args={[2.7, 2.7, 0.1, 64]} />
        <shadowMaterial opacity={0.25} />
      </mesh>
      {/* Legend */}
      <Legend factory={factory} />
    </Canvas>
  );
};

export default Piechart;
