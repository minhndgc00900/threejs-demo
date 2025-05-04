// PM25BarChart.tsx
import { Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { isEmpty } from "lodash";
import { useRef, useState } from "react";
import * as THREE from "three";
import { History } from "../../types";
import { formatDate, getColorByPollution } from "../../utils/common";

const Bar = ({
  height,
  x,
  date,
  prevDate,
  value,
}: {
  height: number;
  x: number;
  date: Date;
  prevDate?: Date;
  value: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const initialHeight = 0.1;
  const targetHeight = height;
  const animationDuration = 1000;
  const startTime = useRef<number | null>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    if (startTime.current === null) {
      startTime.current = state.clock.elapsedTime * 1000;
    }

    const elapsed = state.clock.elapsedTime * 1000 - startTime.current;
    const progress = Math.min(elapsed / animationDuration, 1);
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
    const currentHeight =
      initialHeight + (targetHeight - initialHeight) * easeOutCubic;
    meshRef.current.scale.y = currentHeight / targetHeight;
  });

  return (
    <group position={[x, height / 2, 0]}>
      <mesh 
        ref={meshRef}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <boxGeometry args={[0.3, height, 0.8]} />
        <meshStandardMaterial 
          color={isHovered ? getColorByPollution(height * 30, true) : getColorByPollution(height * 30, true)} 
          opacity={isHovered ? 0.8 : 1}
          transparent={true}
        />
      </mesh>
      {/* Add wireframe for border */}
      <mesh>
        <boxGeometry args={[0.3, height, 0.8]} />
        <meshStandardMaterial
          color="#000000"
          wireframe={true}
          transparent={true}
          opacity={0.3}
        />
      </mesh>
      {/* Date label (below) */}
      <Html position={[0, -height / 2 - 0.6, 0]} center>
        <div style={{ color: "#666", fontSize: "12px", whiteSpace: "nowrap" }}>
          {formatDate(date, prevDate)}
        </div>
      </Html>
      {/* Value tooltip */}
      {isHovered && (
        <Html position={[0, height + 0.5, 0]} center>
          <div className="bg-white px-2 py-1 rounded shadow text-sm">
            {value.toFixed(1)} µg/m³
          </div>
        </Html>
      )}
    </group>
  );
};

const BarChart = ({ history }: { history: History[] }) => {
  const totalBars = history.length;
  const spacing = 0.3; // Reduced from 2 to 1.5
  const totalWidth = totalBars * spacing;
  const centerOffset = -totalWidth / 2 + spacing / 2;

  return (
    <div className="flex flex-col gap-4 relative">
      <h2 className="text-lg font-semibold text-gray-700 text-center absolute !left-[50%] translate-x-[-50%] translate-y-[100%]">Current Past 2 Days</h2>
      <Canvas
        camera={{ position: [0, 0, 21], fov: 40 }}
        className="!h-[400px] !absolute"
      >
        <ambientLight />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        {!isEmpty(history) &&
          history.map((entry, i) => (
            <Bar
              key={i}
              height={entry.value / 30}
              x={i * spacing + centerOffset}
              date={entry.date}
              prevDate={history[i - 1]?.date}
              value={entry.value}
            />
          ))}
      </Canvas>
    </div>
  );
};

export default BarChart;
