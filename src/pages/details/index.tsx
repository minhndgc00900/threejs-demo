import { useParams } from "react-router";
import { Factory3DMap } from "./components/Factory3DMap";
import { factories } from "@utils/factory";
import { Factory } from "@pages/dashboard/dashboard.type";
import FactoryStatus from "./components/FactoryStatus";
import Piechart from "@components/Piechart";

const Details = () => {
  const { id } = useParams();

  const factory: Factory | undefined = factories.find(
    (factory) => factory.id === id
  );

  return (
    <div className="flex flex-col xl:flex-row gap-6 justify-center mt-2 flex-wrap">
      {factory && (
        <>
          <FactoryStatus factory={factory} />
          <Factory3DMap factory={factory} />
          <div className="section-container !w-full">
            <Piechart factory={factory} />
          </div>
        </>
      )}
    </div>
  );
};

export default Details;
