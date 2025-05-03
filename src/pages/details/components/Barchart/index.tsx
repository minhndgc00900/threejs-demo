// PM25BarChart.tsx
import { Html, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
// pmData.ts
const pm25Data = [
  { date: "2025-04-29", value: 10 },
  { date: "2025-04-30", value: 12 },
  { date: "2025-04-30", value: 7 },
];

const Bar = ({
  height,
  x,
  date,
}: {
  height: number;
  x: number;
  date: string;
}) => (
  <group position={[x, height / 2, 0]}>
    <mesh>
      <boxGeometry args={[0.8, height, 0.8]} />
      <meshStandardMaterial color={height > 50 ? "red" : "green"} />
    </mesh>
    {/* Date label (below) */}
    <Html position={[0, -height / 2 - 0.6, 0]} center>
      <div style={{ color: "#666", fontSize: "12px", whiteSpace: "nowrap" }}>
        {date}
      </div>
    </Html>
  </group>
);

const PM25BarChart = () => (
  <Canvas camera={{ position: [0, 10, 10], fov: 50 }}>
    <ambientLight />
    <directionalLight position={[5, 10, 5]} intensity={1} />
    <OrbitControls enableZoom enablePan />
    {pm25Data.map((entry, i) => (
      <Bar
        key={entry.date}
        height={entry.value / 2}
        x={i * 2}
        date={entry.date}
      />
    ))}
  </Canvas>
);

export default PM25BarChart;
