import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import VietnamMap from "./components/map/VietnamMap";
import ProvinceDataTable from "./components/ProvinceDataTable";
import TopCitiesTable from "./components/TopCitiesTable";
import Legend from "./components/Legend";
import { getTopProvincesByPollutionLevel } from "../../utils/map";
import mockData from "../../data/mockData.json";
import useMapStore from "../../stores/useMapStore";

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
	const { globalCameraPosition } = useMapStore();

  return (
    <div className="w-full h-screen">
      <Canvas
        camera={globalCameraPosition}
        dpr={[1, 1.5]}
        shadows
      >
        <Suspense fallback={null}>
          <VietnamMap />
        </Suspense>
      </Canvas>
      <div
        className="absolute left-5 top-[80px] z-[50]"
        data-aos="fade-right"
        data-aos-easing="ease-out-back"
        data-aos-duration="1000"
      >
        <ProvinceDataTable />
      </div>
      <div className="absolute left-1/2 translate-x-[-50%] top-[80px] z-[1000]">
        <Legend />
      </div>
      <div className="absolute -right-[170px] top-1/2 translate-y-[-50%] z-[1000] uppercase">
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
