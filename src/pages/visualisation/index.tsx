import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import VietnamMap from "./components/map/VietnamMap";
import ProvinceDataTable from "./components/ProvinceDataTable";
import TopCitiesTable from "./components/TopCitiesTable";
// import PollutionBarChart from "./components/PollutionBarChart";
import { getTopProvincesByPollutionLevel } from "../../utils/map";
import mockData from "../../data/mockData.json";

const Visualisation = () => {
  const top10MostPollutedProvinces = getTopProvincesByPollutionLevel({
    data: mockData,
    pageSize: 10,
    ascending: false,
  });
  const top10LeastPollutedProvinces = getTopProvincesByPollutionLevel({
    data: mockData,
    pageSize: 10,
    ascending: true,
  });

  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{
          position: [0, 59, 36],
          fov: 45,
        }}
        dpr={[1, 1.5]}
        shadows
      >
        <Suspense fallback={null}>
          <VietnamMap />
        </Suspense>
      </Canvas>
      <div
        className="absolute left-5 top-5 z-[1000]"
        data-aos="fade-right"
        data-aos-easing="ease-out-back"
        data-aos-duration="1000"
      >
        <ProvinceDataTable />
      </div>
      <div className="absolute -right-[220px] top-1/2 translate-y-[-50%] z-[1000] uppercase">
        <div
          data-aos="fade-left"
          data-aos-easing="ease-out-back"
          data-aos-duration="1000"
        >
          <TopCitiesTable
            data={top10MostPollutedProvinces}
            title="with highest pollution level	"
            type="most"
          />
          <TopCitiesTable
            data={top10LeastPollutedProvinces}
            title="with lowest pollution level"
            type="least"
          />
        </div>
      </div>
    </div>
  );
};

export default Visualisation;
