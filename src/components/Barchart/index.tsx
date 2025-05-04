// PM25BarChart.tsx
import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { isEmpty } from "lodash";
import { History } from "../../types";
import { formatDate, getColorByPollution } from "../../utils/common";


const Bar = ({
  height,
  x,
  date,
  prevDate,
}: {
  height: number;
  x: number;
  date: Date;
  prevDate?: Date;
}) => { 
  
  return (
    <group position={[x, height / 2, 0]}>
      <mesh>
        <boxGeometry args={[0.3, height, 0.8]} />
        <meshStandardMaterial color={getColorByPollution(height*30, true)} />
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
    </group>
  )
};

const BarChart = ({ history }: { history: History[] }) => {
  const totalBars = history.length;
  const spacing = 0.3; // Reduced from 2 to 1.5
  const totalWidth = totalBars * spacing;
  const centerOffset = -totalWidth / 2 + spacing/2;

  return (
    <Canvas camera={{ position: [0, 0, 21], fov: 40 }}>
      <ambientLight />
      <directionalLight position={[5, 10, 5]} intensity={1} />

      {!isEmpty(history) && history.map((entry, i) => (
        <Bar
          key={i}
          height={entry.value / 30}
          x={i * spacing + centerOffset}
          date={entry.date}
          prevDate={history[i - 1]?.date}
        />
      ))}
    </Canvas>
  )
};

export default BarChart;
