import { useParams } from "react-router";
import { Factory3DMap } from "./components/Factory3DMap";
import { factories } from "../dashboard/constants";
import { Factory } from "../dashboard/dashboard.type";
import FactoryStatus from "./components/FactoryStatus";

const Details = () => {
  const { id } = useParams();

  const factory: Factory | undefined = factories.find(
    (factory) => factory.id === id
  );

  return (
    <div className="flex gap-6 justify-center mt-2">
      {factory && (
        <>
          <FactoryStatus factory={factory} />
          <Factory3DMap factory={factory} />
        </>
      )}
    </div>
  );
};

export default Details;
