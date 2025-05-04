// PM25BarChart.tsx
import { Html, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { isEmpty } from "lodash";
import { Color } from "../../../../utils/colors";
import { formatDate } from "../../../../utils/common";
import { History } from "../../../dashboard/dashboard.type";


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
        <meshStandardMaterial color={Color.GOOD} />
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

const PM25BarChart = ({ history }: { history: History[] }) => {
  const totalBars = history.length;
  const spacing = 0.3; // Reduced from 2 to 1.5
  const totalWidth = totalBars * spacing;
  const centerOffset = -totalWidth / 2 + spacing/2;

  return (
    <Canvas camera={{ position: [0, 0, 21], fov: 40 }}>
      <ambientLight />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <OrbitControls enableZoom enablePan />

      {!isEmpty(history) && history.map((entry, i) => (
        <Bar
          key={i}
          height={entry.value / 20}
          x={i * spacing + centerOffset}
          date={entry.date}
          prevDate={history[i - 1]?.date}
        />
      ))}
    </Canvas>
  )
};

export default PM25BarChart;
